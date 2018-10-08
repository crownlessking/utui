import * as React from 'react';
import Config from 'src/logic/Config';
import { getFileTypes, IFile } from './File';

interface IProps {
  config: Config;
  file: IFile;
}

export interface IFileOpConst {
  readonly BOOTSTRAP: number;

  // TODO Create a new option by first adding a
  //      constant identifier here.
}

export default class FileOption extends React.Component<IProps> {

  /**
   * Object containing constants for file options.
   */
  private readonly fConst = getFileOpConst();

  public constructor(props: any) {
    super(props);
    this.setFileOptions();
    this.bootstrap = this.bootstrap.bind(this);
    this.toggleBootstrap = this.toggleBootstrap.bind(this);
  }

  public render() {
    const options = this.getOptionsTsx();
    return options;
  }

  /**
   * Assigned specific options to a file based on its type.
   */
  private setFileOptions() {
    const { file } = this.props;
    if (!file.options) {
      const { BOOTSTRAP } = this.fConst;
      const { PHP_FILE } = getFileTypes();

      // Enable PHP files to be bootstrapped
      if (file.type === PHP_FILE) {
        file.options = [];
        file.options.push(BOOTSTRAP);
      }

      // TODO give a file a specific option here

    }
  }

  /**
   * Inserts options' element.
   */
  private getOptionsTsx() {
    const { file } = this.props;
    const { BOOTSTRAP } = this.fConst;
    const tsx = []
    let cntr = 0;
    if (file.options && file.options.length > 0) {
      for (const option of file.options) {
        switch (option) {
          case BOOTSTRAP:
          tsx.push(<this.bootstrap key={cntr} />);
          cntr++;
          break;

          // TODO Insert more options cases here

        }
      }
    }
    return tsx;
  }

  /**
   * Bootstrap TSX element
   *
   * When clicked, the designated file will be bootstrapped when running a test.
   */
  private bootstrap() {
    const color = this.bootstrapColor();
    return (
      <span>
        &nbsp;
        <a href="javascript:"
          onClick={this.toggleBootstrap}
          style={{ color }}
        >
          <i className="fas fa-cogs" />
        </a>
      </span>
    );
  }

  /**
   * Mechanism for the visibility of the bootstrap option.
   */
  private bootstrapColor() {
    const { file } = this.props;
    return (file.boot)
    ? '#ff9900'
    : file.hovered ? '#ffeacc' : '#fff';
  }

  /**
   * Callback for bootstrap option
   */
  private toggleBootstrap() {
    const { file } = this.props;
    file.boot = !file.boot;

    // if it's a bootstrap file, it's always visible
    file.alwaysVisible = file.boot;

    this.props.config.keys.renderUpdateFilesList();
  }

}

/**
 * Options constants
 */
export function getFileOpConst() {
  const constants: IFileOpConst = {
    BOOTSTRAP: 1
  }
  return constants;
}