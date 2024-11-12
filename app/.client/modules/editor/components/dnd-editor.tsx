import { useCallback, useEffect, useState } from "react";
import { CONTAINER_ELEMENTS } from "~/.client/constants/element-configs";
import {
  createElementStore,
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

  const updateHighLightBox = useCallback((droppedElement: HTMLElement) => {
    const box = droppedElement.getBoundingClientRect();

    const highLightBox = highlightBoxRef.current;

    highLightBox.style.width = box.width;
    highLightBox.style.height = box.height;
    highLightBox.style.top = box.top;
    highLightBox.style.left = box.left;
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
    console.log("Drag entered");
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

      const dropTarget = event.target;
      const dropTargetId = dropTarget.getAttribute("data-ds-id");
      const dropTargetType = dropTarget.getAttribute("data-ds-type");

      // Prevent drop element inside element
      if (dropTarget === draggedElement) {
        return;
      }

      if (draggedElement && dropTargetId) {
        const dropPosition = getDropPosition(event, dropTarget);

        const currentItems = pageStore.getState().items || [];

        // Delete item at current position
        let _items = currentItems.map((item) => {
          if (!CONTAINER_ELEMENTS.includes(dropTargetType)) return item;

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

        console.log("elementData: ", elementData);
        console.log("catalogData: ", catalogData);
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
          console.log("dropTargetId: ", dropTargetId);
          if (item._id === dropTargetId) {
            if (CONTAINER_ELEMENTS.includes(dropTargetType)) {
              console.log("Update --------------");
              const elementStore = getElementStoreById(item._id);

              const _children = [...item.children, items[0]._id];

              console.log("_children: ", _children);
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
    },
    [draggedElement],
  );

  const handleDragLeave = useCallback((event) => {
    // console.log("Drag left");
  }, []);

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
  }, []);

  const handleMouseOver = useCallback(() => {
    // console.log("Mouse over");
  }, []);

  const handleMouseUp = useCallback(() => {
    // console.log("Mouse up");
  }, []);

  const handleDragOverCapture = useCallback((event) => {
    handleDragOver(event);

    // console.log("Drag over (capture phase)");
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
