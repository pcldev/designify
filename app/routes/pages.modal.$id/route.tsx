import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import PageEditor from "../../.client/modules/editor/components";
import pageEditorStyles from "./styles/index.css?url";
import imageSelectorStyles from "./styles/image-selector.css?url";
import { ClientOnly } from "remix-utils/client-only";

export const links = () => [
  { rel: "stylesheet", href: pageEditorStyles },
  { rel: "stylesheet", href: imageSelectorStyles },
];

export const HydrateFallback = () => {
  return null;
};

export default withNavMenu(function Index() {
  return <ClientOnly fallback={<div></div>}>{() => <PageEditor />}</ClientOnly>;
});
