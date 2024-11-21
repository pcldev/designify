import { useCallback, useEffect, useState } from "react";
import {
  CONTAINER_ELEMENTS,
  ROOT_TYPE,
  ROW_TYPE,
} from "~/.client/constants/element-configs";
import {
  createElementStore,
  getAllElementStore,
  getElementStoreById,
} from "~/.client/stores/element-store";
import { pageStore } from "~/.client/stores/page-store";
import { IElement } from "~/.client/types";
import { uuid } from "~/.client/utils/uuid";
import { replaceIdsOfCatalogElement } from "~/.client/utils/replace-ids-of-catalog-element";
import { ElementSelectedStore } from "~/.client/stores/element-selected-store";

export const globalDragData: { [key: string]: any } = {};

function useDragDrop(containerRef, highlightBoxRef) {
  const [draggedElement, setDraggedElement] = useState(null);
  const [droppedElementId, setDroppedElementId] = useState<string>("");

  const updateHighLightBox = useCallback((droppedElement?: HTMLElement) => {
    const highLightBox = highlightBoxRef.current;
    if (!droppedElement) {
      highLightBox.style.padding = 0;
      highLightBox.style.width = 0;
      highLightBox.style.height = 0;

      return;
    }

    const box = droppedElement.getBoundingClientRect();

    const gap = 0;
    highLightBox.style.width = box.width + gap;
    highLightBox.style.height = box.height + gap;
    highLightBox.style.top = box.top - gap;
    highLightBox.style.left = box.left - gap;
  }, []);

  useEffect(() => {
    if (!droppedElementId) return;

    setTimeout(() => {
      if (!containerRef.current) return;

      const droppedElement = containerRef.current.querySelector(
        `[data-ds-id="${droppedElementId}"]`,
      );

      if (!droppedElement) return;

      updateHighLightBox(droppedElement);

      setDroppedElementId("");
    }, 200);
  }, [droppedElementId, updateHighLightBox]);

  const handleDragStart = useCallback((event: any) => {
    const target = event.target;

    const elementId = target.getAttribute("data-ds-id");

    if (elementId) {
      setDraggedElement(elementId);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setDragImage(target, 0, 0);

      globalDragData.target = target;
    }
  }, []);

  const getDropPosition = (event, targetElement) => {
    const { top, left, right, bottom } = targetElement.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const offsetY = event.clientY - top;
    const width = right - left;
    const height = bottom - top;

    const edgeThreshold = 0.25; // Defines the boundary threshold as a percentage of the width/height
    const isTop = offsetY < height * edgeThreshold;
    const isBottom = offsetY > height * (1 - edgeThreshold);
    const isLeft = offsetX < width * edgeThreshold;
    const isRight = offsetX > width * (1 - edgeThreshold);

    if (isTop) return "top";
    if (isBottom) return "bottom";
    if (isLeft) return "left";
    if (isRight) return "right";
    return "inside"; // Default to dropping inside the target
  };

  const handleDragEnter = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  const handleDragOver = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const target = event.target as HTMLElement;

      globalDragData.dropTarget = target;

      updateHighLightBox(target);
    },
    [handleDragStart],
  );

  const handleDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      // Check if page is empty
      const isEmpty = insertElementWhenPageIsEmpty();

      if (isEmpty) {
        return;
      }

      const dropTarget = event.target as HTMLElement;
      const dropTargetId = dropTarget.getAttribute("data-ds-id");
      const dropTargetType = dropTarget.getAttribute("data-ds-type")!;

      // Prevent drop element inside element
      if (dropTarget === draggedElement) {
        return;
      }

      const dropPosition = getDropPosition(event, dropTarget);

      if (draggedElement && dropTargetId) {
        const currentItems = pageStore.getState().items || [];

        // Delete item at current position
        let _items = currentItems.map((item) => {
          // if (!CONTAINER_ELEMENTS.includes(dropTargetType)) return item;

          if (item.children.includes(draggedElement)) {
            const elementStore = getElementStoreById(item._id);

            const _children = item.children.filter(
              (child) => child !== draggedElement,
            );

            // Update element store
            elementStore.dispatch({
              type: "SET_STATE",
              payload: {
                state: {
                  children: _children,
                },
              },
            });

            return {
              ...item,
              // Delete item
              children: item.children.filter(
                (child) => child !== draggedElement,
              ),
            };
          }

          return item;
        });

        // Insert item into new place
        _items = _items.map((item) => {
          if (item._id === dropTargetId) {
            if (CONTAINER_ELEMENTS.includes(dropTargetType)) {
              const elementStore = getElementStoreById(item._id);

              const _children = [...item.children, draggedElement];

              // Update element store
              elementStore.dispatch({
                type: "SET_STATE",
                payload: {
                  state: {
                    children: _children,
                  },
                },
              });

              return {
                ...item,
                children: _children,
              };
            } else {
              // Is another element not container elements

              // Insert element at index of
              const parent =
                findParentElementIdById(dropTargetId, _items) ||
                getElementStoreById(
                  getParentElementClosest(dropTarget)?.getAttribute(
                    "data-ds-id",
                  ) || "",
                ).getState();

              if (!parent) return item;

              const elementStore = getElementStoreById(parent._id);

              const children = parent.children;
              const dropTargetIndexOf = children.indexOf(dropTargetId);

              let _children = [...children];

              // Reinsert delete child
              // _children.splice(dropTargetIndexOf, 0, item._id);
              if (dropPosition === "top") {
                const insertAt = Math.max(dropTargetIndexOf, 0);

                // Insert before
                _children.splice(insertAt, 0, draggedElement);
              } else {
                // Insert after
                _children.splice(
                  Math.max(dropTargetIndexOf + 1, 0),
                  0,
                  draggedElement,
                );
              }

              setTimeout(() => {
                // Update element store
                elementStore.dispatch({
                  type: "SET_STATE",
                  payload: {
                    state: {
                      children: _children,
                    },
                  },
                });
              }, 50);
            }

            return item;
          }

          return item;
        });

        pageStore.dispatch({
          type: "SET_STATE",
          payload: {
            state: { items: _items },
          },
        });

        setDroppedElementId(dropTargetId);

        setDraggedElement(null);
      } else if (globalDragData.catalogData && globalDragData.elementData) {
        // Create new element
        const { elementData, catalogData } = globalDragData;

        const newElementId = uuid();

        // const _elementData = replaceIdsOfCatalogElement({
        //   ...elementData,
        //   _id: newElementId,
        // });

        const _catalogData = replaceIdsOfCatalogElement({
          ...catalogData,
          _id: newElementId,
        });

        const items = _catalogData.items;

        items.map((item) => createElementStore(item));

        const currentItems = pageStore.getState().items || [];

        const _items = currentItems.map((item) => {
          if (item._id === dropTargetId) {
            let elementStore = getElementStoreById(item._id);

            // Instead of inserting item inside row, we need to insert this item inside parent of row element
            if (dropTargetType === ROW_TYPE) {
              const parentElement = getParentElementClosest(dropTarget);

              if (!parentElement) {
                console.error("Not found parent of row element");

                return item;
              }

              const parentElementId =
                parentElement.getAttribute("data-ds-id") || "";

              elementStore = getElementStoreById(parentElementId);

              let _children = [...elementStore.getState().children];
              // let _children = [...item.children];

              if (dropPosition === "top") {
                _children = [items[0]._id, ..._children];
              } else if (dropPosition === "bottom") {
                _children = [..._children, items[0]._id];
              }

              // Update element store
              elementStore.dispatch({
                type: "SET_STATE",
                payload: {
                  state: {
                    children: _children,
                  },
                },
              });

              return item;
            } else if (CONTAINER_ELEMENTS.includes(dropTargetType)) {
              const _children = [...item.children, items[0]._id];

              // Update element store
              elementStore.dispatch({
                type: "SET_STATE",
                payload: {
                  state: {
                    children: _children,
                  },
                },
              });

              return {
                ...item,
                children: _children,
              };
            }

            return item;
          }

          return item;
        });

        pageStore.dispatch({
          type: "SET_STATE",
          payload: {
            state: { items: [..._items, ...items] },
          },
        });

        globalDragData.elementData = null;
        globalDragData.catalogData = null;
      }

      updateHighLightBox();
    },
    [draggedElement],
  );

  const handleDragLeave = useCallback((event) => {}, []);

  // This is double click, should update accordingly
  const handleMouseDown = useCallback((event: any) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const elementId = target.getAttribute("data-ds-id") || "";
    ElementSelectedStore.dispatch({
      type: "SET_STATE",
      payload: {
        store: getElementStoreById(elementId),
      },
    });

    updateHighLightBox(target);
  }, []);

  const handleMouseOver = useCallback((event) => {
    if (draggedElement) return;

    const target = event.target as HTMLElement;

    updateHighLightBox(target);
  }, []);

  const handleMouseUp = useCallback(() => {}, []);

  const handleDragOverCapture = useCallback((event) => {
    handleDragOver(event);
  }, []);

  return {
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    handleDragLeave,
    handleDragOverCapture,
  };
}

export default useDragDrop;

function findParentElementIdById(_id: string, items: IElement[]) {
  return items.find((item) => item.children.includes(_id));
}

function insertElementWhenPageIsEmpty() {
  const elementStores = getAllElementStore();

  // If this page is empty
  const isEmptyPage = elementStores.length === 2;

  if (isEmptyPage) {
    // Insert drop element in layout element
    const layoutElementStore = elementStores.find(
      (elementStore) => elementStore.getState().type === "Layout",
    );

    if (!layoutElementStore) return;

    if (!globalDragData.catalogData || !globalDragData.elementData) return;

    // Create new element
    const { elementData, catalogData } = globalDragData;

    const newElementId = uuid();

    const _catalogData = replaceIdsOfCatalogElement({
      ...catalogData,
      _id: newElementId,
    });

    const items = _catalogData.items;

    // Create element store
    items.map((item: any) => createElementStore(item));

    const layoutState = layoutElementStore.getState();

    // Create section to store the drag element
    const sectionElement = createBasicSection(
      items[0]._id,
      CONTAINER_ELEMENTS.includes(items[0].type),
    );

    layoutElementStore.dispatch({
      type: "SET_STATE",
      payload: {
        state: {
          ...(layoutState ?? {}),
          // Insert main element
          children: [sectionElement.getState()._id],
        },
      },
    });

    pageStore.dispatch({
      type: "SET_STATE",
      payload: {
        state: {
          ...pageStore.getState(),
          items: [
            ...pageStore.getState().items,
            ...items.map((item) => getElementStoreById(item._id).getState()),
          ],
        },
      },
    });

    return true;
  }

  return false;
}

function createBasicSection(elementId?: string, isLayoutElement?: boolean) {
  const sectionElement = createSectionElement();

  if (isLayoutElement) {
    // Insert row into section
    sectionElement.dispatch({
      type: "SET_STATE",
      payload: {
        state: {
          ...sectionElement.getState(),
          children: [elementId],
        },
      },
    });

    pageStore.dispatch({
      type: "SET_STATE",
      payload: {
        state: {
          ...pageStore.getState(),
          items: [...pageStore.getState().items, sectionElement.getState()],
        },
      },
    });

    return sectionElement;
  }

  const rowElement = createRowElement();
  const columnElement = createColumElement();

  // Insert row into section
  sectionElement.dispatch({
    type: "SET_STATE",
    payload: {
      state: {
        ...sectionElement.getState(),
        children: [rowElement.getState()._id],
      },
    },
  });

  // Insert column into row element
  rowElement.dispatch({
    type: "SET_STATE",
    payload: {
      state: {
        ...rowElement.getState(),
        children: [columnElement.getState()._id],
      },
    },
  });

  if (elementId) {
    // Insert element into column element
    columnElement.dispatch({
      type: "SET_STATE",
      payload: {
        state: {
          ...columnElement.getState(),
          children: [elementId],
        },
      },
    });
  }

  pageStore.dispatch({
    type: "SET_STATE",
    payload: {
      state: {
        ...pageStore.getState(),
        items: [
          ...pageStore.getState().items,
          sectionElement.getState(),
          rowElement.getState(),
          columnElement.getState(),
        ],
      },
    },
  });

  return sectionElement;
}

function createSectionElement() {
  const sectionId = uuid();

  const sectionCatalog = {
    _id: sectionId,
    type: "Section",
    children: [],
    styleData: {
      all: {},
    },
  };

  return createElementStore(sectionCatalog);
}

function createRowElement() {
  const rowId = uuid();

  const rowCatalog = {
    _id: rowId,
    type: "Row",
    children: [],
    styleData: {
      all: {},
    },
  };

  return createElementStore(rowCatalog);
}

function createColumElement() {
  const columnId = uuid();

  const columnCatalog = {
    _id: columnId,
    type: "Column",
    children: [],
    styleData: {
      all: {},
    },
  };

  return createElementStore(columnCatalog);
}

function getParentElementClosest(element: HTMLElement) {
  let parentElement = element.parentElement;

  while (parentElement && !parentElement.hasAttribute("data-ds-id")) {
    parentElement = parentElement.parentElement;
  }

  return parentElement;
}
