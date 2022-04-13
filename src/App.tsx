import React from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {};
type State = {
  code: string;
  visible: boolean;
  list: Array<IApiSymbols>;
};
class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
