import * as React from 'react';
import { c } from 'src/logic/Tools';

interface IProps {
  ariaLabel?: string;
  ariaDescribedby?: string;
  className?: string;
  id?: string;
  onBlur?: any;
  onChange?: any;
  onKeyPress?: any;
  onPaste?: any;
  placeholder?: string;
  type: string;
  value?: string;
}

export default class Input extends React.Component<IProps> {

  public render() {
    const { 
      ariaLabel,
      ariaDescribedby,
      className,
      id,
      onBlur,
      onChange,
      onKeyPress,
      onPaste,
      placeholder,
      type,
      value
    } = this.props;
    return (
      <input
        type={type}
        className={'form-control'+c(className)}
        value={value}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onPaste={onPaste}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      />
    );
  }

}

// https://getbootstrap.com/docs/4.1/components/input-group/#basic-example

export function InputGroup(props: any) {
  const { className } = props;
  return (
    <div
      className={'input-group'+c(className)}
    >
      { props.children }
    </div>
  );
}

export function InputGroupMb2(props: any) {
  const { className } = props;
  return (
    <div className={'input-group mb-2'+c(className)}>
      { props.children }
    </div>
  )
}

export function InputGroupMb3(props: any) {
  const { className } = props;
  return (
    <div className={'input-group mb-3'+c(className)}>
      { props.children }
    </div>
  )
}

export function InputGroupSm(props: any) {
  const { className } = props;
  return (
    <div
      className={'input-group input-group-sm'+c(className)}
    >
      { props.children }
    </div>
  );
}

export function InputGroupPrepend(props: any) {
  const { className } = props;
  return (
    <div className={'input-group-prepend'+c(className)}>
      { props.children }
    </div>
  );
}

export function InputGroupAppend(props: any) {
  const { className } = props;
  return (
    <div className={'input-group-append'+c(className)}>
      { props.children }
    </div>
  );
}

export function InputGroupText(props: any) {
  const { className } = props;
  return (
    <span className={'input-group-text'+c(className)}>
      { props.children }
    </span>
  );
}

