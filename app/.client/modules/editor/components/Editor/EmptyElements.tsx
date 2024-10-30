import { EmptyState } from "@shopify/polaris";

function EmptyElements() {
  return (
    <EmptyState
      heading="Start building your page by adding elements"
      action={{
        content: "Add element",
        onAction: () => {},
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    />
  );
}

export default EmptyElements;
