import * as React from 'react';

export default class Progress extends React.Component {

  public render() {
    return (
      <div className="progress">
        { this.props.children }
      </div>
    );
  }

}

export function ProgressBar(props: any) {
  const { min, max, percent } = props;
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={min}
      aria-valuemax={max}
      style={{ width: percent+'%' }}
    >
      <strong>{ percent }%</strong>
    </div>
  )
}