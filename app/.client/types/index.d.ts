import { ReactNode } from "react";

export interface IDSElementProps {
  children: ReactNode | Array<ReactNode> | any;
  store: any;

  [key: string]: any;
}
