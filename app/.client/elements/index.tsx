import { FunctionComponent } from "react";
import { IDSElementProps } from "../types/index";
import Button from "./Button";
import Column from "./Column";
import Heading from "./Heading";
import Image from "./Image";
import Layout from "./Layout";
import Row from "./Row";
import Section from "./Section";
import Video from "./Video";
import Body from "./Body";

const elementComponents: {
  [type: string]: FunctionComponent<IDSElementProps>;
} = {
  Body,
  Layout,
  Section,
  Row,
  Column,
  Heading,
  Button,
  Image,
  Video,
};

export default elementComponents;
