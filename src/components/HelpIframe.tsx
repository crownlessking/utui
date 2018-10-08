import * as React from 'react';

export default class HelpIframe extends React.Component {

  public render() {
    return (
      <iframe
        src="/help.html"
        style={{
          border: 'none',
          display: 'flex',
          flexGrow: 1,
          height: '100%',
          width: '100%',
        }}
      />
    );
  }

}