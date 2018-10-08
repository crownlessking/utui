import * as React from 'react';
import Input from 'src/components/bootstrap4/Input';
import { checkPath } from '../../../logic/Tools';
import { FormGroup } from '../../bootstrap4/Form';

let defaultProjectPath: string = '';

export default class DefaultProjectPath extends React.Component {

  public constructor(props: any) {
    super(props);
    this.filterValue = this.filterValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const id = 'root-path-input';
    return (
      <FormGroup>
        <label htmlFor={id}>Default Project Path</label>
        <Input
          className="App-font-mono load-dir-filename"
          type="text"
          id={id}
          onBlur={this.filterValue}
          placeholder="Enter Default Project Root Path"
        />
      </FormGroup>
    );
  }

  private onChange(e: any) {
    defaultProjectPath = e.target.value;
  }

  private filterValue(e: any): void {
    const { value } = e.target;
    defaultProjectPath = checkPath(value);
  }

}

export function getDefaultProjectPath() {
  return defaultProjectPath;
}


