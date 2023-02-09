import * as React from "react";
import styles from "./D3Demo.module.scss";
import { ID3DemoProps } from "./ID3DemoProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import Line from "./Line";
import Bar from "./Bar";
import axios from "axios";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

const _APIBaseURL: string =
  "https://flocard.centralindia.cloudapp.azure.com/FloCardAPI.svc";
const _Domain: string = "366pitech.com";
export default class D3Demo extends React.Component<
  ID3DemoProps,
  { dataLoaded: boolean }
> {
  constructor(props: ID3DemoProps) {
    super(props);
    this.state = {
      dataLoaded: false,
    };
  }

  public render(): React.ReactElement<ID3DemoProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName,
    // } = this.props;
    if (!this.state.dataLoaded) return <Spinner size={SpinnerSize.large} />;

    return <Line />;
  }

  public async componentDidMount() {
    this._getContacts();
  }

  public _getContacts(): void {
    // var data = require("../css/test.json");
    // this.populateFetchedData(data);
    // console.log("waiting...");
    // setTimeout(() => {
    //   this.setState({ dataLoaded: true });
    //   console.log("data is loaded now");
    // }, 2000);
    axios
      .get(_APIBaseURL + "/getorgexchanges/" + _Domain)
      .then((resp) => {
        this.setState({ dataLoaded: true });
        console.log(resp.data);
      })
      .catch((er) => {
        alert(er);
        console.log(er);
      });
    // $.ajax({
    //   url: "https://flocard.centralindia.cloudapp.azure.com/FloCardAPI.svc/getorgexchanges/antwalk.com",
    //   type: "GET",
    //   crossDomain: true,
    //   success: (response) => {
    //     //console.log("Here:" + JSON.stringify(response));
    //     if (response.status == 1) {
    //       this.populateFetchedData(response);
    //       console.log(response);
    //     } else {
    //       alert("Error fetching data");
    //     }
    //   },
    //   error: (XMLHttpRequest, textStatus, errorThrown) => {
    //     alert("Error fetching data");
    //   },
    // });
  }
}
