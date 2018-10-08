import * as React from 'react';
// import Progress, { ProgressBar } from 'src/components/bootstrap4/Progress';
import 'src/css/unit-test/ProgressBar.css';

interface IProps {
  output: string;
}

export default class TestScore extends React.Component<IProps> {

  // #dc3545
  private readonly failColor = [225, 53, 69]; // RGB values

  // #28a745
  private readonly successColor = [40, 167, 69]; // RGB values

  /*
  <Progress>
    <ProgressBar percent={percent} min="0" max="100" />
  </Progress>
  */

  public render() {
    const percent = this.getPercentScore();
    const colorPercent = percent / 100;
    const transitColor = this.transit(this.failColor, this.successColor, colorPercent);
    return (
      <div className="progress-bar-border">
        <div className="progress-bar-percent">
          <strong>{ percent }%</strong>
        </div>
        <div className="progress-bar" style={{
          backgroundColor: transitColor,
          width: percent+'%'
        }} />
        <div className="progress-bar-percent">
          <strong>{ percent }%</strong>
        </div>
      </div>
    );
  }

  /**
   * Format phpunit output for dis
   */
  private getPercentScore(): number {
    const { output } = this.props;
    const failed = /((Tests?:\s+\d+)|(,?\s+Errors?:\s+\d+)|(,?\s+Failures?:\s+\d+)|(,?\s+Assertions?:\s+\d+)|(,?\s+Incomplete:\s+\d+)|(,?\s+Skipped:\s+\d+)|(,?\s+Risky:\s+\d+))+/;
    const passed = /OK\s+\(\d+\s+tests?,\s+\d+\s+assertions?\)/;
    if (failed.test(output)) {
      const matches = output.match(failed) || [];
      const match = JSON.stringify(matches[0]).replace(/\s+|"/g,'');
      return this.calcPercent(match);
    } else if (passed.test(output)) {
      return 100;
    }
    return 0;
  }

  /**
   * Get unit test percentage score.
   *
   * @param output phpunit console output
   */
  private calcPercent(errors: string): number {
      const errorsObj = this.parseErrors(errors);
      const total = errorsObj.Tests;
      let tests = total;
      tests -= errorsObj.Errors || 0;
      tests -= errorsObj.Failures || 0;
      tests -= errorsObj.Incomplete || 0;

      return Math.floor(tests / total * 100) || 0;
  }

  /**
   * Convert errors result to an object.
   *
   * @return {any}
   */
  private parseErrors(errors: string): any {
    const errorsObj: any = {};
    const errorsArr = errors.split(',');
    for (const err of errorsArr) {
      const index = err.indexOf(':');
      const prop = err.substring(0, index);
      const val = +err.substring(index + 1);
      errorsObj[prop] = val;
    }
    return errorsObj;
  }

  // The following transition color method were made possible with the help of:
  // https://stackoverflow.com/questions/18938597/nice-fade-from-red-to-green

  private colorString(r: number, g: number, b: number) {
    r = Math.min(255, Math.max(0, Math.round(r)));
    g = Math.min(255, Math.max(0, Math.round(g)));
    b = Math.min(255, Math.max(0, Math.round(b)));
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
  }
  
  private average(a: number, b: number, percent: number) {
    const gamma = 3;
    const a2 = Math.pow(a, gamma);
    const b2 = Math.pow(b, gamma);
    const c2 = a2 + (b2 - a2) * percent;
    return Math.pow(c2, 1/gamma);
  }

  private transit(startColor: number[], endColor: number[], step: number) {
    step = Math.min(1, step);
    const c = this.colorString(
      this.average(startColor[0], endColor[0], step),
      this.average(startColor[1], endColor[1], step),
      this.average(startColor[2], endColor[2], step)
      );
    return c;
  }
}