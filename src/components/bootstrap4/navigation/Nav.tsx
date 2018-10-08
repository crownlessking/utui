

import * as React from 'react';
import 'src/css/Nav.css';
import Config from 'src/logic/Config';
import NavLink from './NavLink';

interface IProps {
  appName: string;
  config : Config;
}

interface IState {
  appName : string;
  links : Array<()=>Config>;
  linksRight : Array<()=>Config>;
}

class Nav extends React.Component<IProps, IState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      appName : this.props.appName,
      links : this.props.config.get('links'),
      linksRight : this.props.config.get('linksRight')
    }
  }

  public render() {
    return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light" id="navigation">
      <a className="navbar-brand" href="#">{this.state.appName}</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {this.linksRender(this.state.links)}
        </ul>
        <ul className="navbar-nav ml-auto">
          {this.linksRender(this.state.linksRight)}
        </ul>
      </div>
    </nav>
    );
  }

  /**
   * Render links
   *
   * @param {Array<()=>Config>} funcs array of functions
   *
   * @return {JSX.Element[]}
   */
  private linksRender (funcs :Array<()=>Config>): JSX.Element[] {
    const jsx :JSX.Element[] = [];
    for (let j = 0; j < funcs.length; j++) {
      const conf :Config = funcs[j]();
      jsx.push(<NavLink key={j} config={conf} />);
    }
    return jsx;
  }

}

export default Nav;