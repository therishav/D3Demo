import * as React from "react";
import styles from "./D3Demo.module.scss";
import { ID3DemoProps } from "./ID3DemoProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import Line from "./Line";

export default class D3Demo extends React.Component<ID3DemoProps, {}> {
  public render(): React.ReactElement<ID3DemoProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName,
    // } = this.props;

    return <Line />;
  }
}
