import * as React from "react";
import styles from "./D3Demo.module.scss";
import { ID3DemoProps } from "./ID3DemoProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import Line from "./Line";
import Bar from "./Bar";
import axios from "axios";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import Demo from "./Demo";
import Smiley from "./Smiley";
import DrillDownPie from "./DrillDownPie";

const _APIBaseURL: string =
  "https://flocard.centralindia.cloudapp.azure.com/FloCardAPI.svc";
const _Domain: string = "366pitech.com";
export default class D3Demo extends React.Component<
  ID3DemoProps,
  { dataLoaded: boolean; pieData: any }
> {
  constructor(props: ID3DemoProps) {
    super(props);
    this.state = {
      dataLoaded: false,
      pieData: [
        { number: 4, name: "Locke", index: 1 },
        { number: 8, name: "Reyes", index: 2 },
        { number: 15, name: "Ford", index: 3 },
        { number: 16, name: "Jarrah", index: 4 },
        { number: 23, name: "Shephard", index: 5 },
        { number: 42, name: "Kwon", index: 6 },
      ],
    };
  }

  public render(): React.ReactElement<ID3DemoProps> {
    // if (!this.state.dataLoaded) return <Spinner size={SpinnerSize.large} />;

    return (
      <svg width={500} height={500}>
        <DrillDownPie pieData={this.state.pieData} x={250} y={250} />
      </svg>
    );
  }

  public async componentDidMount() {
    try {
      const data = await this._getContacts();
      const pieData = this._createPieData(data.users);
      console.log(pieData);
    } catch (ex) {
      console.log(ex);
      alert(ex);
    }
  }

  public _getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(_APIBaseURL + "/getorgexchanges/" + _Domain)
        .then((resp) => {
          this.setState({ dataLoaded: true }, () => {
            resolve(resp.data);
          });
          console.log(resp.data);
        })
        .catch((er) => {
          alert(er);
          console.log(er);
          reject(er);
        });
    });
  }

  private _createPieData = (data: any) => {
    const Grouped_Headline = data.map((el: any, index: number) => {
      return { headline: el.headline, name: el.name, data: el.data };
    });
    let result: any = {};
    for (const it of Grouped_Headline) {
      if (!result[it.headline]) {
        result[it.headline] = [];
      }
      result[it.headline].push({ name: it.name, data: it.data });
    }

    return result;
  };
}
