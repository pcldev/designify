import React, { useCallback, useEffect } from "react";
import { useStore } from "~/.client/libs/external-store";
import { ElementSelectedStore } from "../../stores/element-selected-store";
import {
  deleteElementStoreById,
  getAllElementStore,
} from "~/.client/stores/element-store";

function ShortcutEditor(props) {
  const elementSelectedId = useStore(
    ElementSelectedStore,
    (state) => state.store?.getState()?._id,
  );

  const handleDeleteElement = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        // Find parent to remove
        const elementStores = getAllElementStore();

        elementStores.forEach((elementStore) => {
          const elementState = elementStore.getState();

          if (elementState.children.includes(elementSelectedId)) {
            elementStore.dispatch({
              type: "SET_STATE",
              payload: {
                state: {
                  ...elementState,
                  children: elementState.children.filter(
                    (child) => child !== elementSelectedId,
                  ),
                },
              },
            });
          }
        });

        // Delete element store
        deleteElementStoreById(elementSelectedId);

        // Clear selected:
        ElementSelectedStore.dispatch({
          type: "RESET_STATE",
        });
      }
    },
    [elementSelectedId],
  );

  useEffect(() => {
    document
      .querySelector("iframe")
      ?.contentDocument?.addEventListener("keydown", handleDeleteElement);

    return () => {
      document
        .querySelector("iframe")
        ?.contentDocument?.removeEventListener("keydown", handleDeleteElement);
    };
  }, [handleDeleteElement]);

  return <div>{props.children}</div>;
}

export default ShortcutEditor;
