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
require("./Styles.css");

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
        {
          exchanges: 4,
          department: "IT",
          index: 1,
          users: [
            { name: "Risav", exchanges: 1, index: 1, prev: 0 },
            { name: "Billy", exchanges: 3, index: 2, prev: 0 },
          ],
        },
        {
          exchanges: 30,
          department: "HR",
          index: 2,
          users: [
            { name: "T1", exchanges: 15, index: 1, prev: 1 },
            { name: "T2", exchanges: 10, index: 2, prev: 1 },
            { name: "T3", exchanges: 3, index: 3, prev: 1 },
            { name: "T4", exchanges: 2, index: 4, prev: 1 },
          ],
        },
        {
          exchanges: 42,
          department: "Marketing",
          index: 3,
          users: [
            { name: "T1", exchanges: 15, index: 1, prev: 2 },
            { name: "T2", exchanges: 10, index: 2, prev: 2 },
            { name: "T3", exchanges: 7, index: 3, prev: 2 },
          ],
        },
        { exchanges: 15, department: "Operations", index: 4, users: [] },
        { exchanges: 10, department: "Electrical", index: 5, users: [] },
        { exchanges: 10, department: "Admin", index: 6, users: [] },
      ],
    };
  }

  public render(): React.ReactElement<ID3DemoProps> {
    // if (!this.state.dataLoaded) return <Spinner size={SpinnerSize.large} />;

    return (
      <div className="main">
        <div className={styles.main_overview}>
          {/* <div className={styles.overview_card}>Tile 1</div>
          <div className={styles.overview_card}>Tile 2</div>
          <div className={styles.overview_card}>
            <svg width={500} height={500}>
              <DrillDownPie pieData={this.state.pieData} x={250} y={250} />
            </svg>
          </div> */}
        </div>
      </div>
      // <svg width={500} height={500}>
      //   {/* <DrillDownPie pieData={this.state.pieData} x={250} y={250} /> */}
      // </svg>
    );
  }

  public async componentDidMount() {
    try {
      // const data = await this._getContacts();
      // const pieData = this._createPieData(data.users);
      
      // this.setState({ pieData });
      // console.log(pieData);
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
