import type { IndexFiltersProps } from "@shopify/polaris";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import type { WithDataSourceChildProps } from "~/bootstrap/hoc/withDataSource";
import type {
  ComponentProps,
  ComponentState,
  ErrorInfo,
  ReactNode,
} from "react";
import type { BulkActionsProps } from "@shopify/polaris/build/ts/src/components/BulkActions";
import type { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import lodash from "lodash";
import withDataSource from "~/bootstrap/hoc/withDataSource";
import BlockLoading from "~/components/Loading";
import React, { PureComponent } from "react";
import { ITEM_LIST_LIMITATION } from "~/constants";
import { authenticatedFetch } from "~/shopify/fns.client";
import { ErrorBoundary } from "~/components/ErrorBoundary";
import {
  BlockStack,
  Box,
  Card,
  Divider,
  IndexFilters,
  IndexTable,
  InlineStack,
  Pagination,
} from "@shopify/polaris";

export type ListTableView = {
  name: string;
  filters: {
    queryValue: string;
    [key: string]: any;
  };
  actions?: any[];
  showTabAll?: boolean;
};

export type ListTableFilter = {
  key: string;
  label: string;
  shortcut: boolean;
  filter: ReactNode | any;
};

export type ListTableProps = WithDataSourceChildProps &
  ComponentProps<any> & {
    limit?: number;
    condensed?: boolean;
    selectable?: boolean;
    showBorder?: boolean;
    showFilter?: boolean;
    emptyState?: ReactNode;
    views?: ListTableView[];
    defaultFilterBy?: ListTableView;
    showPagination?: boolean;
    filters?: ListTableFilter[];
    bulkActions?: BulkActionsProps["actions"];
    headings: NonEmptyArray<IndexTableHeading>;
    sortOptions?: IndexFiltersProps["sortOptions"];
    promotedBulkActions?: BulkActionsProps["promotedActions"];
    renderRowMarkup: (item: any, idx: number) => ReactNode;
    renderFilterLabel?: (key: string, value: string | any[]) => string;
    resourceName?: {
      singular: string;
      plural: string;
    };
  };

export type ListTableState = ComponentState & {
  error?: Error;
  selected: number;
  views: ListTableView[];
};

export class ListTableComponent<P, S> extends PureComponent<
  P & ListTableProps,
  S & ListTableState
> {
  state: S & ListTableState = {
    views: [],
    selected: 0,
  };

  constructor(props: P & ListTableProps) {
    super(props);
    const defaultFilterBy = props.defaultFilterBy || {};
    const views = props.views || [];

    const selected = views.findIndex(
      (view: any) => view?.id === defaultFilterBy?.id,
    );
    if (selected >= 0) {
      this.state.selected = selected;
    }

    if (props.error) {
      this.state.error = props.error;
    }
  }

  render(): ReactNode {
    // Extract props
    const {
      total,
      loading,
      emptyState,
      filterValues,
      showBorder = true,
    } = this.props;

    // Extract current state
    const { error } = this.state;

    // Check if empty state should be shown
    const showEmptyState = !total && !loading && lodash.isEmpty(filterValues);

    return error ? (
      <ErrorBoundary error={error} />
    ) : (
      <>
        {showEmptyState && emptyState ? (
          emptyState
        ) : showBorder ? (
          <Card padding="0" roundedAbove="sm">
            {this.renderFilters()}
            {this.renderTable()}
          </Card>
        ) : (
          <BlockStack>
            {this.renderFilters()}
            {this.renderTable()}
          </BlockStack>
        )}
      </>
    );
  }

  renderFilters(): ReactNode {
    // Extract props
    const {
      sort,
      loading,
      setSort,
      firstLoad,
      sortOptions,
      showFilter = true,
      filterValues: { queryValue },
      useIndexResourceState: { mode, setMode },
    } = this.props;

    // Extract current state
    const { selected } = this.state;

    // Generate filters
    const filters = this.generateFilters();

    // Generate applied filters.
    const appliedFilters = this.generateAppliedFilters();

    return (
      <>
        {showFilter && !firstLoad && (
          <IndexFilters
            canCreateNewView
            mode={mode}
            tabs={[{ id: "all", content: "All" }]}
            onSort={setSort}
            filters={filters}
            loading={loading}
            setMode={setMode}
            selected={selected}
            sortSelected={sort}
            queryValue={queryValue}
            sortOptions={sortOptions}
            // primaryAction={primaryAction}
            appliedFilters={appliedFilters}
            onQueryClear={this.onQueryClear}
            onQueryChange={this.onQueryChange}
            onClearAll={this.clearAllAppliedFilters}
            queryPlaceholder={"Search in all"}
            cancelAction={{
              onAction: this.cancelFilters,
              disabled: false,
              loading: false,
            }}
          />
        )}
      </>
    );
  }

  renderTable(): ReactNode {
    // Extract props
    const {
      page,
      items,
      total,
      setPage,
      headings,
      condensed,
      firstLoad,
      selectable,
      bulkActions,
      resourceName,
      renderRowMarkup,
      promotedBulkActions,
      showPagination = true,
      limit = ITEM_LIST_LIMITATION,
      useSetIndexFiltersMode: {
        selectedResources,
        allResourcesSelected,
        handleSelectionChange,
      },
    } = this.props;

    // Generate empty state
    const emptyState = firstLoad ? <BlockLoading /> : undefined;

    return (
      <BlockStack>
        <IndexTable
          headings={headings}
          condensed={condensed}
          emptyState={emptyState}
          selectable={selectable}
          itemCount={items?.length}
          bulkActions={bulkActions}
          resourceName={resourceName}
          onSelectionChange={handleSelectionChange}
          promotedBulkActions={promotedBulkActions}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources?.length
          }
        >
          {items.map((item: any, index: number) => (
            <React.Fragment key={item._id || item.id || index}>
              {renderRowMarkup(item, index, selectedResources, this)}
            </React.Fragment>
          ))}
        </IndexTable>

        {showPagination && !firstLoad && total > 0 && (
          <>
            <Divider />

            <Box padding={"400"}>
              <InlineStack gap={"300"} blockAlign="center">
                <Pagination
                  hasNext={
                    (page - 1) * (limit || ITEM_LIST_LIMITATION) +
                      items?.length <
                    total
                  }
                  hasPrevious={page > 1}
                  onNext={() => setPage && setPage(page + 1)}
                  onPrevious={() => setPage && setPage(page - 1)}
                />

                {`Page ${page} of ${Math.ceil(total / limit)}`}
              </InlineStack>
            </Box>
          </>
        )}
      </BlockStack>
    );
  }

  getSelectedResources = () => {
    const {
      useSetIndexFiltersMode: { selectedResources },
    } = this.props;

    return selectedResources;
  };

  clearAllSelection = () => {
    const {
      useSetIndexFiltersMode: { handleSelectionChange },
    } = this.props;

    handleSelectionChange("page", false);
  };

  generateFilters(): ListTableFilter[] {
    const { filters, filterValues, setFilterValues } = this.props;

    return (
      filters?.map((def: ListTableFilter) => {
        const _def = { ...def };
        const { Component, props } = def.filter;

        if (Component && props) {
          _def.filter = (
            <Component
              {...props}
              {...(props.value ? { value: filterValues[def.key] } : {})}
              {...(props.choices
                ? { selected: filterValues[def.key] || [] }
                : {})}
              onChange={(value: any) =>
                setFilterValues({ ...filterValues, [def.key]: value })
              }
            />
          );

          return _def;
        }

        return def;
      }) || []
    );
  }

  generateAppliedFilters(): IndexFiltersProps["appliedFilters"] {
    const filters = this.generateFilters();
    const { queryKey, filterValues, renderFilterLabel } = this.props;

    // Generate applied filters from current filter values
    const appliedFilters: IndexFiltersProps["appliedFilters"] = [];

    for (const key in filterValues) {
      if (key !== queryKey && filterValues[key]?.length) {
        const filter = filters?.find(
          (filter: ListTableFilter) => filter.key === key,
        );

        if (filter) {
          appliedFilters.push({
            key,
            label: renderFilterLabel
              ? renderFilterLabel(key, this.state[key] || filterValues[key])
              : filter.label,
            onRemove: () => this.removeAppliedFilter(key),
          });
        }
      }
    }

    return appliedFilters;
  }

  onQueryChange = (queryValue: string) => {
    const { filterValues, setFilterValues } = this.props;

    setFilterValues({ ...filterValues, queryValue });
  };

  onQueryClear = () => this.onQueryChange("");

  removeAppliedFilter = (key: string): void => {
    const { filterValues, setFilterValues } = this.props;

    setFilterValues({ ...filterValues, [key]: undefined });
  };

  clearAllAppliedFilters = () => {
    const { setFilterValues } = this.props;

    setFilterValues({});
  };

  cancelFilters = () => {
    const { setFilterValues } = this.props;
    const { views, selected } = this.state;

    setFilterValues({ ...(views[selected]?.filters || {}) });
  };

  static getDerivedStateFromError(error: Error): any {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error(error, errorInfo);
  }

  componentDidMount(): void {
    const { views, showTabAll = true } = this.props;

    if (views === undefined) {
      // Fetch saved views
      authenticatedFetch(`/api/${location.pathname}`).then(({ items }) =>
        this.setState({
          views: showTabAll ? [{ name: "All" }, ...items] : [...items],
        }),
      );
    } else {
      this.setState({
        views: showTabAll ? [{ name: "All" }, ...views] : [...views],
      });
    }
  }
}

const ListTable = withDataSource(ListTableComponent);

export default ListTable;
