import { FunctionComponent } from "react";
import { IDSElementProps } from "../types/index";
import Button, { ButtonGeneral, ButtonStyling } from "./Button";
import Column from "./Column";
import Heading, { HeadingGeneral, HeadingStyling } from "./Heading";
import Image, { ImageGeneral, ImageStyling } from "./Image";
import Layout from "./Layout";
import Row from "./Row";
import Section from "./Section";
import Video, { VideoGeneral, VideoStyling } from "./Video";
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

export const elementGenerals = {
  Heading: HeadingGeneral,
  Button: ButtonGeneral,
  Image: ImageGeneral,
  Video: VideoGeneral,
};

export const elementStylings = {
  Heading: HeadingStyling,
  Button: ButtonStyling,
  Image: ImageStyling,
  Video: VideoStyling,
};
