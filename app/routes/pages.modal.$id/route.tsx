import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import PageEditor from "../../.client/modules/editor/components";
import pageEditorStyles from "./styles/index.css?url";
import imageSelectorStyles from "./styles/image-selector.css?url";
import { ClientOnly } from "remix-utils/client-only";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPageByID } from "~/models/ShopifyPage.server";

export const links = () => [
  { rel: "stylesheet", href: pageEditorStyles },
  { rel: "stylesheet", href: imageSelectorStyles },
];

export const HydrateFallback = () => {
  return null;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) return json({ page: null });

  const page = await getPageByID(id);

  return json({ page });
}

export default withNavMenu(function Index() {
  return <ClientOnly fallback={<div></div>}>{() => <PageEditor />}</ClientOnly>;
});
