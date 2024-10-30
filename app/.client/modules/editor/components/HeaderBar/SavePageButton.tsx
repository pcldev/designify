import { Button } from "@shopify/polaris";

function SavePageButton() {
  function onClickHandler() {}

  return (
    <div style={{ display: "none" }}>
      <Button
        id="btn--save-template"
        variant="primary"
        onClick={onClickHandler}
      >
        Save
      </Button>
    </div>
  );
}

export default SavePageButton;
