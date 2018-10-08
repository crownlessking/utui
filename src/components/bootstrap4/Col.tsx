import * as React from 'react';
import { c } from '../../logic/Tools';

interface IProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties
}

export default class Col extends React.Component<IProps> {

  public render() {
    const {className, id, style} = this.props;
    return (
      <div
        className={'col'+c(className)}
        id={id}
        style={style}
      >
        { this.props.children }
      </div>
    )
  }
}

export function Col1(props: any) {
  const { className, style } = props;
  return (
    <div className={'col col-1'+c(className)} style={style}>
      { props.children }
    </div>
  );
}

export function Col2(props: any) {
  const { className, style } = props;
  return (
    <div className={'col col-2'+c(className)} style={style}>
      { props.children }
    </div>
  );
}

export function Col4(props: any) {
  const { className, style } = props;
  return (
    <div className={'col col-4'+c(className)} style={style}>
      { props.children }
    </div>
  );
}

export function ColLg5(props: any) {
  const {className, id} = props;
  return (
    <div className={'col col-lg-5'+c(className)} id={id}>
      { props.children }
    </div>
  );
}

export function ColLgAuto(props: any) {
  const { className } = props;
  return (
    <div className={'col col-lg-auto'+c(className)}>
      { props.children }
    </div>
  );
}

export function ColSm(props: any) {
  const { className } = props;
  return (
    <div className={'col-sm'+c(className)}>
      { props.children }
    </div>
  );
}
