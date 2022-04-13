import React from 'react';
import { apiGet } from "./api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import './App.css';

const icon_url = "https://static.okex.com/cdn/oksupport/asset/currency/icon/";

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
          <List dense={true}>
            {list.map((e, i) => {
              return (
                <ListItem
                  key={e.symbol}
                  button={true}
                  selected={code === e.symbol}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${i + 1}`}
                      src={`${icon_url}${e["base-currency"]}.png?x-oss-process=image/format,webp`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{
                      color: code === e.symbol ? "red" : "inherit",
                    }}
                    primary={`${e["base-currency"].toLocaleUpperCase()}/${e[
                      "quote-currency"
                    ].toLocaleUpperCase()}`}
                    onClick={() => {}}
                  />
                </ListItem>
              );
            })}
          </List>
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
