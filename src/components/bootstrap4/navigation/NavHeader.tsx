import * as React from 'react';
import 'src/css/Nav.css';

export interface INavbarHeaderProps {
  appName: string;
}

class NavHeader extends React.Component<INavbarHeaderProps> {
  public render() {
    return (
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="javascript:">{this.props.appName}</a>
      </div>
    );
  }
}

export default NavHeader;