import {
  BlockStack,
  Box,
  Icon,
  LegacyCard,
  Tabs,
  Text,
} from "@shopify/polaris";
import { IconsIcon } from "@shopify/polaris-icons";
import { useStore } from "~/.client/libs/external-store";
import { ElementSelectedStore } from "~/.client/stores/element-selected-store";
import EmptyInspector from "./EmptyInspector";
import GeneralInspector from "./General";
import StylingInspector from "./Styling";
import { useCallback, useState } from "react";

function Inspector() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const elementSelectedStore = useStore(
    ElementSelectedStore,
    (state) => state.store,
  );

  const tabs = [
    {
      id: "general",
      content: "General",
      accessibilityLabel: "General",
      panelID: "general",
    },
    {
      id: "styling",
      content: "Styling",
      panelID: "styling",
    },
  ];

  return (
    <div className="inspector">
      {elementSelectedStore ? (
        <>
          <Box borderBlockEndWidth="025" borderColor="border">
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
          </Box>

          {selected === 0 ? (
            <GeneralInspector />
          ) : (
            <StylingInspector
              key={elementSelectedStore.getState()._id}
              elementStore={elementSelectedStore}
            />
          )}
        </>
      ) : (
        <EmptyInspector />
      )}
    </div>
  );
}

export default Inspector;
