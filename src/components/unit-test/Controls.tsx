import * as React from 'react';
import 'src/css/unit-test/Controls.css';
import Config from 'src/logic/Config';

interface IProps {
  config: Config;
}

class Controls extends React.Component<IProps> {

  public render() {
    const conf: Config = this.props.config;
    const id: number = conf.get('id');
    conf.relax();
    const content: string = conf.get('content') || '';
    return (
      <div className="" id={"test-controls-"+id}>
        {content}
      </div>
    );
  }

}

export default Controls;