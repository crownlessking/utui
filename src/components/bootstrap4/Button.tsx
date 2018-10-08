import * as React from 'react';
import { c } from 'src/logic/Tools';

interface IProps {
  className?: string;
  dataToggle?:string;
  dataTarget?:string;
  disabled?: boolean;
  onClick?: ()=>void;
  outlined?: boolean;
  style?: React.CSSProperties;
  type?: string;
}

/**
 * List of button styles
 *
 * - primary   | outline-primary
 * - secondary | outline-secondary
 * - success   | outline-success
 * - danger    | outline-danger
 * - warning   | outline-warning
 * - info      | outline-info
 * - light     | outline-light
 * - dark      | outline-dark
 * - link      | outline-link
 *
 * @link https://getbootstrap.com/docs/4.1/components/buttons/#examples
 */
export default class Button extends React.Component<IProps> {

  public render() {
    const {
      className,
      dataToggle,
      dataTarget,
      disabled,
      onClick,
      outlined,
      style,
      type
    } = this.props;
    const outline = outlined ? '-outline' : '';
    const t = type || 'button';
    return (
      <button
        type={t}
        className={'btn btn'+outline+'-primary'+c(className)}
        data-toggle={dataToggle}
        data-target={dataTarget}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        { this.props.children }
      </button>
    )
  }

}

export function ButtonSecondary(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-secondary'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonSuccess(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-success'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonDanger(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-danger'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonWarning(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-warning'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonInfo(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-info'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonLight(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-light'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonDark(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-dark'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}

export function ButtonLink(props: any) {
  const {
    className,
    dataToggle,
    dataTarget,
    disabled,
    onClick,
    outlined,
    type
  } = props;
  const t = type || 'button';
  const outline = outlined ? '-outline' : '';
  return (
    <button
      type={t}
      className={'btn btn'+outline+'-link'+c(className)}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={onClick}
      disabled={disabled}
    >
      { props.children }
    </button>
  )
}
