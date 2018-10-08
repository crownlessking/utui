import * as React from 'react';
import Col from 'src/components/bootstrap4/Col';
import 'src/css/unit-test/Output.css';
import Config from 'src/logic/Config';

interface IProps {
  config: Config;
  id: string;
}

class FormJUnitOutput extends React.Component<IProps> {

  public render() {
    const {config, children, id} = this.props;
    return (
      <Col className="jUnit-output" id={id}>
        {children || config.rGet('content')}
      </Col>
    );
  }

}

export default FormJUnitOutput;