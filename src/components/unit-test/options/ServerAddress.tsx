import * as React from 'react';
import { FormGroup } from '../../bootstrap4/Form';
import Input from '../../bootstrap4/Input';
import { checkPath } from '../File';

interface IState {
  value: string;
}

let serverAddress: string = '';// 'http://localhost/phpunit-server/';

export default class ServerAddress extends React.Component<{}, IState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      value: serverAddress
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  public render() {
    const id = 'phpunit-server-address';
    const { value } = this.state;
    return (
      <FormGroup>
        <label htmlFor={id}>PHPUnit Server</label>
        <Input
          className="App-font-mono load-dir-filename"
          id={id}
          type="text"
          placeholder="http://localhost/ or http://virtual-host/"
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={value}
        />
      </FormGroup>
    );
  }

  private onChange(e: any) {
    const value = e.target.value;
    serverAddress = value;
    this.setState({ value });
  }

  private onBlur(e: any) {
    serverAddress = checkPath(e.target.value);
    this.setState({ value: serverAddress });
  }

}

export function getServerAddress() {
  return serverAddress;
}