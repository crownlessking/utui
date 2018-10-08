import * as React from 'react';
import Config from 'src/logic/Config';

interface ITabBodyProps {
  config: Config;
}

interface IModel {
  classes: string;
  content: any;
  labelledBy : string;
  tabContentId: string;
}

class TabBody extends React.Component<ITabBodyProps> {

  private tab :IModel;

  public constructor(props:any) {
    super(props);
    const conf = this.props.config;
    this.tab = {
      classes : conf.rGet('content_class') || '',
      content : conf.rGet('content'),
      labelledBy : conf.get('tab_id'),
      tabContentId : conf.get('tab_content_id')
    }

  }

  public render() {
    const tab:IModel = this.tab;
    return (
      <div className={'container tab-pane '+tab.classes}
        id={tab.tabContentId}
        role="tabpanel"
        aria-labelledby={tab.labelledBy}
      >
        {tab.content}
      </div>
    );

  }

}

export default TabBody;