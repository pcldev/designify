import { InlineStack } from "@shopify/polaris";
import Editor from "./Editor";
import HeaderBar from "./HeaderBar";
import Inspector from "./Inspector";
import Outline from "./Outline";
import PageOutlineDrawer from "./Outline/PageOutlineDrawer";

function PageEditor() {
  return (
    <div className="page-editor-container">
      <HeaderBar />

      <div className="page-editor">
        <div className="page-editor-layout">
          <Outline />

          <InlineStack>
            <PageOutlineDrawer />

            <Editor />
          </InlineStack>
          <Inspector />
        </div>
      </div>
    </div>
  );
}

export default PageEditor;
