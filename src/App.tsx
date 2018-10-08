import * as React from 'react';
import Nav from './components/bootstrap4/navigation/Nav';
import Tabulation from './components/bootstrap4/tabulation/Tabulation';
import navModel from './components/model/navigation/NavModel';
import './css/App.css';
import Config from './logic/Config';

class App extends React.Component {

  public constructor(props:any) {
    super(props);
  }

  public render() {
    const links :Config = this.navModel();
    const tabs :Config = this.tabModel();
    return [
      <div key="0" className="App">
        <Nav appName="U.T.U.I" config={links} />
        <Tabulation config={tabs} />
      </div>,
    ];
  }

  public navModel(): Config {
    const conf : Config = new Config();
    conf.set('links', navModel.links);
    conf.set('linksRight', navModel.linksRight);

    return conf;
  }

  public tabModel(): Config {
    const conf: Config = new Config();

    return conf;
  }

}

export default App;
