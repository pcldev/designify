import {
  cloneElement,
  Fragment,
  FunctionComponent,
  memo,
  ReactElement,
} from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import elementComponents from "../../elements";
import { ROOT_TYPE } from "~/.client/constants/element-configs";
import { useStore } from "~/.client/libs/external-store";
import { IDSElementProps } from "~/.client/types";
import { getElementStoreById } from "../../stores/element-store";

function NullElement({ store }: IDSElementProps) {
  return <div>{store?.state.type || null}</div>;
}

export function enhanceComponent(c: FunctionComponent<any> = NullElement) {
  return function EnhancedComponent(props: any) {
    const realComponent = c(props) as ReactElement;

    // PASS 'view' on live view
    const mode = props.mode || "edit";

    const { store, data: cusAttr } = props;

    const elementState = store.getState();

    const { type, _id, id, ref, className } = elementState;

    const enhancedProps = {
      ...realComponent?.props,
      ref: ref,
      "data-ds-type": type,
      "data-ds-id": _id || id,
      draggable: type !== ROOT_TYPE,
      className,
    };

    // Remove attribute 'href' of elements contain <a></a> to prevent action default in editor
    if (mode === "edit" && enhancedProps["href"]) {
      delete enhancedProps["href"];
    }

    return realComponent ? (
      <Fragment>{cloneElement(realComponent, enhancedProps)}</Fragment>
    ) : null;
  };
}

export const RenderElement = memo((props: any) => {
  const { _id, data, mode = "edit" } = props;

  const elementStore = getElementStoreById(_id);

  const state = useStore(elementStore, (state) => state);

  const { type, children } = state;

  const Element = enhanceComponent(elementComponents[type]);

  const store = getElementStoreById(_id);

  return (
    <Element key={_id} _id={_id} mode={mode} {...data} store={store}>
      {renderChildren(children, mode)}
    </Element>
  );
});

function renderChildren(children: string[], mode = "edit") {
  if (Array.isArray(children)) {
    return children
      .map((childId) => {
        const childElSub = getElementStoreById(childId);

        if (childElSub) {
          return (
            <ErrorBoundary key={childId}>
              <RenderElement
                key={childId}
                _id={childId}
                mode={mode}
                elementSubscriber={childElSub}
              />
            </ErrorBoundary>
          );
        }

        console.warn("not found element store::", childId);
        return null;
      })
      .filter((e) => !!e);
  }

  return null;
}
