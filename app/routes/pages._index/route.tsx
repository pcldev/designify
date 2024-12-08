import { useNavigate } from "@remix-run/react";
import type { IndexFiltersProps, ModalProps } from "@shopify/polaris";
import {
  Badge,
  BlockStack,
  ChoiceList,
  IndexTable,
  InlineStack,
  Link,
  Modal,
  Page,
  Text,
  useBreakpoints,
} from "@shopify/polaris";
import _ from "lodash";
import { Fragment, useCallback, useMemo, useState } from "react";
import { getDistanceToNow } from "~/bootstrap/fns/time";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import type { ListTableComponent } from "~/components/Listable";
import ListTable from "~/components/Listable";
import { EActionType } from "~/constants/fetcher-keys";
import { authenticatedFetch } from "~/shopify/fns.client";
import { showToast } from "~/utils/showToast";
import { uuid } from "~/utils/uuid";
import CreatePageDrawer from "./components/CreatePageDrawer";
import EmptyPage from "./components/EmptyPage";

// Define a variable to hold a reference to the list table instance
let tableRef: ListTableComponent<any, any>;

export default withNavMenu(function Index(props: any) {
  const [creatingPageFromTemplate, setCreatingPageFromTemplate] =
    useState(false);

  const { mdDown } = useBreakpoints();

  const [refresh, setRefresh] = useState<any>();
  const [modalDeleteAction, setModalDeleteAction] = useState(false);

  // Define options for filtering pages
  const filters = useMemo(
    () => [
      {
        key: "status|string|eq",
        label: "Status",
        filter: {
          Component: ChoiceList,
          props: {
            titleHidden: true,
            title: "Status",
            choices: [
              { label: "Published", value: "published" },
              { label: "Unpublished", value: "unpublished" },
            ],
          },
        },
        shortcut: true,
      },
    ],
    [],
  );

  const headings = useMemo(
    () => [
      {
        id: "name",
        title: "Title",
      },
      {
        id: "status",
        title: "Status",
      },
      {
        id: "last-updated",
        title: "Last updated",
      },
    ],
    [],
  );

  // Define options for sorting templates
  const sortOptions: IndexFiltersProps["sortOptions"] = useMemo(
    () => [
      { label: "Title", value: "name asc", directionLabel: "A-Z" },
      {
        label: "Last updated",
        value: "updatedAt asc",
        directionLabel: "Oldest first",
      },
      { label: "Title", value: "name desc", directionLabel: "Z-A" },
      {
        label: "Last updated",
        value: "updatedAt desc",
        directionLabel: "Newest first",
      },
    ],
    [],
  );

  // Define resource name
  const resourceName = useMemo(
    () => ({
      singular: "pages",
      plural: "pages",
    }),
    [],
  );

  const navigate = useNavigate();

  // Define function to render row markup
  const renderRowMarkup = useCallback(
    (page: any, index: number, selectedResources?: string[], ref?: any) => {
      // Save a reference to the list table instance
      tableRef = ref;

      // Extract template data
      const { _id, title, status, updatedAt } = page;

      const openPage = () => navigate(`/pages/${_id}`);

      return (
        <IndexTable.Row
          id={_id}
          key={_id}
          position={index}
          onClick={() => {}}
          selected={selectedResources?.includes(_id)}
        >
          <IndexTable.Cell>
            <InlineStack gap="200" blockAlign="center">
              <Text truncate variant="bodyMd" as="span" fontWeight="bold">
                <Link monochrome removeUnderline onClick={openPage}>
                  {title}
                </Link>
              </Text>
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Link monochrome removeUnderline onClick={openPage}>
              <Badge tone={status === "published" ? "success" : undefined}>
                {_.capitalize(status)}
              </Badge>
            </Link>
          </IndexTable.Cell>

          <IndexTable.Cell>
            <Text variant="bodyMd" as="span">
              <Link monochrome removeUnderline onClick={openPage}>
                {getDistanceToNow(updatedAt)}
              </Link>
            </Text>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    },
    [navigate],
  );

  const duplicateTemplates = useCallback(async () => {
    // Verify the selected templates
    const selectedResources = tableRef?.getSelectedResources();

    if (!selectedResources?.length) {
      return;
    }

    showToast("Duplicating pages");

    const response = await authenticatedFetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({
        action: EActionType.DUPLICATE_PAGES,
        pages: selectedResources,
      }),
    });

    if (response.success) {
      showToast("Duplicate pages successfully");

      setRefresh({});

      tableRef?.clearAllSelection();
    } else {
      showToast("Duplicate pages unsuccessfully");
    }
  }, []);

  const toggleModalDelete = useCallback(() => {
    setModalDeleteAction((pre) => !pre);
  }, []);

  const onDeletePages = useCallback(async () => {
    // Verify the selected templates
    const selectedResources = tableRef?.getSelectedResources();

    if (!selectedResources?.length) {
      return;
    }

    const response = await authenticatedFetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({
        action: EActionType.DELETE_PAGES,
        pages: selectedResources,
      }),
    });

    if (response.success) {
      showToast("Delete pages successfully");

      setRefresh({});

      tableRef?.clearAllSelection();
    } else {
      showToast("Delete pages unsuccessfully");
    }

    // Toggle modal again
    toggleModalDelete();
  }, [toggleModalDelete]);

  // Define promoted bulk actions
  const promotedBulkActions = useMemo(
    () => [
      {
        content: "Duplicate",
        onAction: duplicateTemplates,
      },
      {
        content: (
          <Text tone="critical" as="span">
            Delete
          </Text>
        ),
        onAction: toggleModalDelete,
      },
    ],
    [duplicateTemplates, toggleModalDelete],
  );

  return (
    <Page>
      {!creatingPageFromTemplate ? (
        <Fragment>
          <ui-title-bar title={"Pages"}>
            <button
              variant="primary"
              onClick={() => navigate(`/pages/${uuid()}`)}
            >
              Create page
            </button>
            <button
              onClick={() => {
                setCreatingPageFromTemplate(true);
              }}
            >
              Create from template
            </button>
          </ui-title-bar>

          <BlockStack gap={"400"}>
            <Text as="p" variant="bodyMd">
              <ListTable
                queryKey="title"
                refresh={refresh}
                filters={filters}
                headings={headings}
                emptyState={<EmptyPage />}
                sort={["updatedAt desc"]}
                sortOptions={sortOptions}
                dataSource="/api/pages"
                resourceName={resourceName}
                renderRowMarkup={renderRowMarkup}
                condensed={mdDown}
                promotedBulkActions={promotedBulkActions}
              />
            </Text>
          </BlockStack>

          <ModalDeletePages
            open={modalDeleteAction}
            onClose={toggleModalDelete}
            toggleModalDelete={toggleModalDelete}
            onDelete={onDeletePages}
          />
        </Fragment>
      ) : (
        <CreatePageDrawer
          setCreatingPageFromTemplate={setCreatingPageFromTemplate}
        />
      )}
    </Page>
  );
});

function ModalDeletePages(
  props: Omit<ModalProps, "title"> & { toggleModalDelete: any; onDelete: any },
) {
  return (
    <Modal
      {...props}
      title="Delete pages"
      primaryAction={{
        content: "Delete",
        destructive: true,
        onAction: props.onDelete,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: props.toggleModalDelete,
        },
      ]}
    >
      <Modal.Section>
        <p>This action can't restored, are you sure to process?</p>
      </Modal.Section>
    </Modal>
  );
}
