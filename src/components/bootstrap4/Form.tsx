import * as React from 'react';
import { c } from 'src/logic/Tools';

export default class Form extends React.Component {

  public render() {
    return (
      <form>
        {this.props.children}
      </form>
    )
  }

}


/**
 * Form group for checkboxes
 *
 * @param props any
 */
export function FormCheck(props: any) {
  const { className } = props;
  return (
    <div className={'form-group form-check'+c(className)}>
      {props.children}
    </div>
  );
}

/**
 * 
 */
export function FormCheckbox(props: any) {
  const { className, id, checked, onChange, disabled } = props;
  return (
    <input
      type="checkbox"
      className={'form-check-input'+c(className)}
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

/**
 * Checkbox label
 *
 * @param props any
 */
export function FormCheckboxLabel(props: any) {
  const { className, htmlFor, mouseEnter, mouseLeave } = props;
  return (
    <label
      className={'form-check-label'+c(className)}
      htmlFor={htmlFor}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      { props.children }
    </label>
  );
}

export function FormGroup(props: any) {
  return (
    <div className="form-group">
      { props.children }
    </div>
  )
}