import * as React from 'react';
import { c } from 'src/logic/Tools';

interface IProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default class Row extends React.Component<IProps> {

  public render() {
    const {className, id, style} = this.props;
    return (
      <div className={'row'+c(className)} id={id} style={style}>
        {this.props.children}
      </div>
    )
  }

}