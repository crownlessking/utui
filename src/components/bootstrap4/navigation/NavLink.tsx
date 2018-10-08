import * as React from 'react';
import Icon from 'src/components/Icon';
import 'src/css/Nav.css';
import Config from 'src/logic/Config';
import { addClass, removeClass } from 'src/logic/Tools';
import Modal from '../modal/Modal';

interface IProps {
  config: any; // Array or Config object
}

interface ILink {
  callback : ()=>void,
  classes? : string, // optional
  dataTarget?: string, // optional
  dataToggle?: string, // optional
  href? : string, // optional
  icon? : string, // required if no "value"
  id? : string, // optional
  value? : string // required if no "icon"
}

export default class NavLink extends React.Component<IProps> {

  private nextKey :number;
  private isDropdown: boolean;

  public constructor(props: any) {
    super(props);
    this.nextKey = 0;
    this.isDropdown = Array.isArray(this.props.config); 
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  /**
   * Render method
   *
   * @return {void}
   */
  public render(): JSX.Element {

    if (this.isDropdown) {
      return this.dropdownRender();
    }
    return this.singleLinkRender();
  }

  /**
   * Will renders as a single link on the navigation bar.
   *
   * @return {void}
   */
  private singleLinkRender(): JSX.Element {
    const {
      classes, data_toggle, href, icon, id, modal_id, value
    } = this.props.config.keys;
    if (data_toggle === 'modal') {
      return (
        <li className={classes}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
        >
          <a href={'#'+modal_id}
            id={id}
            className="nav-link"
            data-toggle={data_toggle}
            data-target={'#'+modal_id}
          >
            <Icon className={icon} />
            { value }
          </a>
          <Modal config={this.props.config} />
        </li>
      );
    }
    return (
      <li className={classes}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
      >
        <a href={href || '#'} id={id} className="nav-link">
          <Icon className={icon} />
          { value }
        </a>
      </li>
    );
  }

  /**
   * Part of a navigation bar link click effect mechanism.
   *
   * @return {void}
   */
  private mouseDown(): void {
    const link: ILink = {
      callback: ()=>{return},
      classes: this.props.config.rGet('classes') || ''
    };
    if (link.classes) {
      const classes = addClass(link.classes, 'active');
      this.setState({ classes });
    }
  }

  /**
   * Part of the navigation bar link click effect mechanism.
   *
   * @return {void}
   */
  private mouseUp(): void {
    const blankCallback: ()=>void = ()=>{return};
    const link: ILink = {
      callback: this.props.config.rGet('callback') || blankCallback,
      classes: this.props.config.rGet('classes') || ''
    };
    if (link.classes) {
      const classes = removeClass(link.classes, ['active']);
      this.setState({ classes });
    }
    link.callback();
  }

  /**
   * Renders the dropdown links.
   */
  private dropdownRender() {
    const conf = this.props.config[0];
    const icon: string = conf.rGet('icon') || '';
    const value: string = conf.rGet('value') || '';
    const alignMenuClass: string  = conf.rGet('menu_align_right')
      ? 'dropdown-menu-right'
      : '';
    const linksJsx = this.dropdownLinks();
    const modalJsx = this.dropdownModals();
    return (
      <li className="nav-item dropdown">
        <a href={conf.get('href')}
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Icon className={icon} /> {value} <span className="caret" />
        </a>
        <div className={"dropdown-menu "+alignMenuClass}
          aria-labelledby="navbarDropdown"
        >
          {linksJsx}
        </div>
        {modalJsx}
      </li>
    );
  }

  /**
   * Gathers the dropdown links JSX.Elements into an array
   */
  private dropdownLinks() {
    const linksJsx :JSX.Element[] = [];
    const links: Config[] = this.props.config.slice(1);
    for (const conf of links) {
      const jsx = this.getLinkJsx(conf);
      linksJsx.push(jsx);
    }
    return linksJsx;
  }

  /**
   * Gathers the dropdown links modals JSX.Elements into an array
   */
  private dropdownModals() {
    const modalsJsx: JSX.Element[] = [];
    const linksConfig: Config[] = this.props.config.slice(1);
    for (let j: number = 0; j < linksConfig.length; j++) {
      const conf: Config = linksConfig[j];
      const toggle: string = conf.rGet('data_toggle');
      if (typeof toggle === 'string' && toggle === 'modal') {
        modalsJsx.push(<Modal key={j} config={conf} />);
      }
    }
    return modalsJsx;
  }

  /**
   * Get the link's JSX.Element.
   *
   * @param {Config} conf configuration object
   */
  private getLinkJsx(conf: Config) {
    const role: string = conf.rGet('role');
    const key :number = this.nextKey;
    this.nextKey++;

    if (role) {
      return <div key={key} className="dropdown-divider" />
    }

    const toggle: string = conf.rGet('data_toggle');
    if (toggle === 'modal') {
      return this.modalLink(key, toggle, conf);
    }

    return this.defaultLink(key, conf);
  }

  /**
   * Get the default navigation link.
   *
   * @param {number} key  JSX.Element array key
   * @param {Config} conf configuration object
   *
   * @return {JSX.Element}
   */
  private defaultLink(key: number, conf: Config): JSX.Element {
    const classes: string = conf.rGet('classes') || '';
    const icon: string = conf.rGet('icon') || '';
    const value: string = conf.rGet('value') || '';
    const target: string = conf.rGet('target');
    const callback: ()=>void = conf.rGet('callback');
    return (
      <a key={key}
        href={conf.get('href')}
        className={'dropdown-item '+classes}
        onClick={callback}
        target={target}
      >
        <Icon className={icon} /> { value }
      </a>
    );
  }

  /**
   * Get a navigation link that triggers a modal popup.
   *
   * @param {number} key    JSX.Element array key
   * @param {string} toggle toggle value for modal link.
   * @param {Config} conf   configuration object
   *
   * @return {JSX.Element} 
   */
  private modalLink(key: number, toggle: string, conf: Config): JSX.Element {
    const classes: string = conf.rGet('classes') || '';
    const icon: string = conf.rGet('icon') || '';
    const value: string = conf.rGet('value') || '';
    const target: string = '#'+conf.get('modal_id');
    return (
      <a key={key}
        href={target}
        className={'dropdown-item '+classes}
        data-toggle={toggle}
        data-target={target}
      >
        <Icon className={icon} /> { value }
      </a>
    );
  }

}
