import * as React from 'react';
import SetDefaultProjectPath from './DefaultProjectPath';
import ServerAddress from './ServerAddress';

export default class UnitTestOptions extends React.Component {
  
  public render() {
    return (
      <form>
        <SetDefaultProjectPath />
        <ServerAddress />
      </form>
    );
  }

}