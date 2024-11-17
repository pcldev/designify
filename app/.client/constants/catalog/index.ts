import { Button } from "./Button";
import { Heading } from "./Heading";
import { Image } from "./Image";
import { Layout } from "./Layout";
import { Video } from "./Video";

const catalogData = [Layout, Heading, Button, Image, Video];

export const groupedCatalogData: any = catalogData.reduce((acc, cur) => {
  const { type, group, element, variants } = cur;
  acc[type] = acc[type] || {};
  acc[type][group] = acc[type][group] || {};
  acc[type][group][element] = variants || [];
  return acc;
}, {});

export default catalogData;
