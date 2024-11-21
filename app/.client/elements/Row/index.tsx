import BackgroundImageInspector from "~/.client/modules/editor/components/Inspector/Styling/Background";
import BackgroundColorInspector from "~/.client/modules/editor/components/Inspector/Styling/Background/BackgroundColor";

function renderPlaceholder(store) {
  const { type } = store;
  return (
    <div
      style={{
        minHeight: "150px",
        minWidth: "50px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Row placeholder
    </div>
  );
}

function Row(props: any) {
  const {
    children,
    store,
    gutter,
    stretch,
    equals,
    cols,
    store: { mode },
  } = props;

  let { align } = props;

  align = align !== "lt" ? ` ds-c-${align}` : "";
  const stretchClass = stretch ? " ds-r-eh" : "";
  const className = `ds-r${align}${stretchClass}`;
  const style = {
    // ...styleVariableByDevices(getItemSpacing(gutter), "s"),
    padding: "15px 0",
  };

  const rowComponent = (
    <div className={className} style={style}>
      {children}
    </div>
  );

  //   if (mode === "view") {
  //     return rowComponent;
  //   }

  return children.length ? rowComponent : renderPlaceholder(store);
}

export default Row;

export const RowStyling = [BackgroundColorInspector, BackgroundImageInspector];
