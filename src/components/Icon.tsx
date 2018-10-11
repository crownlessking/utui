import * as React from 'react';

interface IProps {
  className: string;
}

export default class Icon extends React.Component<IProps> {

  public render() {
    const { className } = this.props;
    if (className.match('^glyphicon glyphicon-')) {
      return <span className={className} />;
    } else if (className.match('^fa')) {
      return <i className={className} />;
    }
    return '';
  }

}
