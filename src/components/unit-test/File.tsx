import * as React from 'react';
import {
  FormCheck,
  FormCheckbox,
  FormCheckboxLabel
} from 'src/components/bootstrap4/Form';
import Icon from 'src/components/Icon';
import FileOptions from 'src/components/unit-test/FileOptions';
import Config from 'src/logic/Config';

interface IProps {
  active?: boolean;
  config: Config;
  file: IFile;
  id?: string;
}

export interface IFileTypes {
  readonly OTHER: number,
  readonly PHP_FILE: number,
  readonly PHP_TEST_FILE: number
}

export interface IFile {
  alwaysVisible: boolean;
  boot: boolean; // if true, file will be bootstrapped.
  checked: boolean;
  disabled: boolean;
  filename: string;
  hovered: boolean;
  options?: number[];
  shortname: string;
  type: number;
  visible: boolean;
}

export default class File extends React.Component<IProps> {

  public readonly BOOTSTRAP = 1;

  public constructor(props: any) {
    super(props);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  public render() {
    const {config, file, id} = this.props;
    const { checked, disabled, shortname } = file;
    const iconClass = this.getFaIconClass(shortname);
    const moreClasses = this.getMoreClasses(file);
    return (
      <FormCheck>
        <FormCheckbox
          id={id}
          checked={checked}
          onChange={this.toggleCheck}
          disabled={disabled}
        />
        <FormCheckboxLabel
          htmlFor={id}
          mouseEnter={this.onMouseEnter}
          mouseLeave={this.onMouseLeave}
        >
          <Icon className={iconClass} /> &nbsp;
          <span className={'files-list-filename'+moreClasses}>
            { shortname }
          </span>
          <FileOptions file={file} config={config} />
        </FormCheckboxLabel>
      </FormCheck>
    )
  }

  /**
   * Used for applying additional classes based on the file state.
   *
   * @param file file
   */
  private getMoreClasses(file: IFile): string {
    let moreClasses = '';
    if (file.boot) {
      moreClasses += ' files-list-boot';
    }
    return moreClasses;
  }

  /**
   * Needed for checking and unchecking a single checkbox.
   */
  private toggleCheck() {
    this.props.file.checked = !this.props.file.checked;
    this.props.config.keys.renderUpdateFilesList();
  }

  /**
   * Get a font-awesome icon for the file mime.
   *
   * @param shortname filename without directory path
   */
  private getFaIconClass(shortname: string): string {
    const { PHP_FILE, PHP_TEST_FILE } = getFileTypes();
    const type = getFileType(shortname);
    let classes;
    switch (type) {
      case PHP_FILE:
      case PHP_TEST_FILE:
      classes = 'fab fa-php fa-lg';
      break;
      default:
      classes = 'far fa-file';
    }
    return classes;
  }

  /**
   * Show available options for a file when hovered.
   */
  private onMouseEnter() {
    this.props.file.hovered = true;
    this.props.config.keys.renderUpdateFilesList();
  }

  /**
   * Hide available options for file when no longer hovered.
   */
  private onMouseLeave() {
    this.props.file.hovered = false;
    this.props.config.keys.renderUpdateFilesList();
  }
}

/**
 * Get the filename without the directory path.
 *
 * @param filename filename, including directory path
 *
 * @return {string}
 */
export function getShortname(filename: string): string {
  let index: number = filename.lastIndexOf('\/');
  if (index < 0) {
    index = filename.lastIndexOf('\\');
  }
  if (index >= 0) {
    const shortNameStart = index + 1;
    return filename.substring(shortNameStart);
  }
  throw new Error('Oops! Could not generate the short filename.');
}

/**
 * Get the file type.
 *
 * This helps differentiate test files from other kinds of files.
 * Having that information helps ignore non-test files when running
 * unit tests.
 *
 * @param shortName 
 */
export function getFileType(shortName: string) {
  const types = getFileTypes();
  const lname = shortName.toLowerCase();
  if (lname.endsWith('test.php')) {
    return types.PHP_TEST_FILE;
  }
  if (lname.endsWith('.php')) {
    return types.PHP_FILE;
  }
  return types.OTHER;
}

/**
 * get file types
 */
export function getFileTypes() {
  const types: IFileTypes = {
    OTHER: 0,
    PHP_FILE: 1,
    PHP_TEST_FILE: 2
  }
  return types;
}

