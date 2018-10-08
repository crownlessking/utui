import * as React from 'react';
import Config from 'src/logic/Config';
import CloseButton from './CloseButton';

/**
 * 
 * [Attribute list]
 * name : string;
 * href : string;
 * class : string;
 * icon : string;
 * callback(name : string) : object;
 */
interface ITabHeadProps {
  config : Config;
  title: string;
}

interface IModel {
  ariaControls : string;
  ariaSelected : boolean;
  classes : string;
  href : string;
  icon : any;
  id : string;
}

class TabHead extends React.Component<ITabHeadProps> {

  private tab: IModel;

  public constructor(props:any) {
    super(props);
    const conf: Config = this.props.config;
    const tabId: string = conf.get('tab_id');
    const tabAriaControls: string = conf.get('tab_content_id');
    conf.relax();
    const iconClasses: string = conf.get('icon');

    this.tab = {
      ariaControls : tabAriaControls,
      ariaSelected : true,
      classes : conf.get('class') || '',
      href : '#'+tabAriaControls,
      icon : iconClasses,
      id : tabId
    }

  }

  public render( ) {
    const tab: IModel = this.tab;
    const id: string = this.props.config.get('tab_id');
    const callback: ()=>void = this.props.config.get('delete_tab');
    return (
      <li role="presentation" className="nav-item">
        <a
          className={'nav-link '+tab.classes}
          id={tab.id}
          data-toggle="tab"
          href={tab.href}
          role="tab"
          aria-controls={tab.ariaControls}
          aria-selected={tab.ariaSelected}
        >
          {tab.icon}
          {this.props.title}
          &nbsp;&nbsp;
        </a>
        <CloseButton closeId={id} callback={callback} />
      </li>
    );
  }

}

export default TabHead;