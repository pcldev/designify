import type { IndexFiltersProps } from "@shopify/polaris";
import {
  Badge,
  BlockStack,
  ChoiceList,
  IndexTable,
  InlineStack,
  Link,
  Page,
  Text,
  useBreakpoints,
} from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import ListTable from "~/components/Listable";
import EmptyPage from "./components/EmptyPage";
import { useNavigate } from "@remix-run/react";
import { getDistanceToNow } from "~/bootstrap/fns/time";
import { uuid } from "~/utils/uuid";
import _ from "lodash";

export default withNavMenu(function Index(props: any) {
  const [refresh] = useState<any>();

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
      // tableRef = ref;

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
              <Badge tone={status === "active" ? "success" : undefined}>
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

  const duplicateTemplates = useCallback(() => {}, []);

  const toggleModalDelete = useCallback(() => {}, []);

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
      <ui-title-bar title={"Pages"}>
        <button variant="primary" onClick={() => navigate(`/pages/${uuid()}`)}>
          Create page
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
            condensed={useBreakpoints().smDown}
            promotedBulkActions={promotedBulkActions}
          />
        </Text>
      </BlockStack>
    </Page>
  );
});
