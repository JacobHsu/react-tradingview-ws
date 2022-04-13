import React from 'react';
import { apiGet } from "./api";
import './App.css';

type Props = {};
type State = {
  code: string;
  visible: boolean;
  list: Array<IApiSymbols>;
};
class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      code: "btcusdt",
      visible: false,
      list: [],
    };
  }

  public async fetchSymbolList() {
    const res = await apiGet<IApiSymbols[]>("common_symbols");
    if (!res || !res.data) {
      return;
    }
    const obj: IUtilsMap<IApiSymbols> = {};
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i];
      if (
        item.state === "online" &&
        item["quote-currency"] === "usdt" &&
        !/\d/.test(item["base-currency"])
      ) {
        obj[item["base-currency"]] = item;
      }
    }
    const arr = Object.keys(obj).sort();
    this.setState({ list: arr.map((k) => obj[k]) });
  }

  public componentDidMount() {

    this.fetchSymbolList().then(() => {

    });
  }

  public render() {
    const { code, list } = this.state;
    const symbol = list.find((e) => e.symbol === code);
    const title = symbol
      ? `${symbol["base-currency"].toLocaleUpperCase()}/${symbol[
          "quote-currency"
        ].toLocaleUpperCase()}`
      : "";
    console.log('list:', list)
    return (
      <div className="App">
        <header className="App-header">
          {code} {title}
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
