import withNavMenu from "~/bootstrap/hoc/withNavMenu";
import PageEditor from "./components";
import pageEditorStyles from "./styles/index.css?url";

export const links = () => [{ rel: "stylesheet", href: pageEditorStyles }];

export default withNavMenu(function Index() {
  return <PageEditor />;
});
