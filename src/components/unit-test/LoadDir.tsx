import * as React from 'react';
import Button, { ButtonSecondary } from 'src/components/bootstrap4/Button';
import { Col4, ColLgAuto } from 'src/components/bootstrap4/Col';
import Input, {
  InputGroup,
  InputGroupAppend,
  InputGroupMb2,
  InputGroupPrepend,
} from 'src/components/bootstrap4/Input';
import Modal from 'src/components/bootstrap4/modal/Modal';
import 'src/css/unit-test/LoadDir.css';
import Config from 'src/logic/Config';
import { _id, checkPath } from 'src/logic/Tools';
import { getDefaultProjectPath } from './options/DefaultProjectPath';

interface IProps {
  loadDirButtonDisabled: boolean;
  config :Config;
  loadTestButtonDisabled: boolean;
}

interface IFormLoadDirData {
  inputId :string;
  label :string;
  shortName: string;
  urlId :string;
}

interface IState {
  projectRoot: string; // project root directory
  subDir: string;      // directory within the project root
}

export default class LoadDirectory extends React.Component<IProps, IState> {

  private id :number;
  private form :IFormLoadDirData;
  private setSubDir: (path: string | undefined) => void;
  private setProjectRoot: (path: string| undefined) => void;

  public constructor(props :any) {
    super(props);
    this.id = _id();
    const conf :Config = this.props.config;
    this.form = {
      inputId : 'load-directory-'+this.id,
      label : conf.get('label'),
      shortName: '', // project root directory short name
      urlId : 'url-'+this.id
    }
    this.setSubDir = conf.get('setSubDir');
    this.setProjectRoot = conf.get('setProjectRoot');
    this.state = {
      projectRoot: getDefaultProjectPath(),
      subDir : ''
    };
    this.setSubDir(this.state.subDir);
    this.setProjectRoot(this.state.projectRoot);

    this.updateSubDir = this.updateSubDir.bind(this);
    this.loadFilesList = this.loadFilesList.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.rootPathButtonPrepend = this.rootPathButtonPrepend.bind(this);
    this.subDirTextfield = this.subDirTextfield.bind(this);
    this.loadDirButton = this.loadDirButton.bind(this);
    this.updateProjectRoot = this.updateProjectRoot.bind(this);
    this.afterProjectRootUpdate = this.afterProjectRootUpdate.bind(this);
  }

  public render() {
    const { loadTestButtonDisabled } = this.props;
    const { loadUnitTestOutput } = this.props.config.keys;
    return [
        <ColLgAuto key="1" className="load-dir-input">
          <InputGroupMb2>
            <this.rootPathButtonPrepend />
            <this.subDirTextfield />
            <this.loadDirButton />
          </InputGroupMb2>
        </ColLgAuto>,
        <Col4 key="2" className="load-dir-input">
          <Button
            onClick={loadUnitTestOutput}
            disabled={loadTestButtonDisabled}
          >
            <strong>RUN TEST</strong>
          </Button>
        </Col4>
    ];
  }

  public componentDidMount() {
    this.updateTabTitle();
  }

  public componentDidUpdate() {
    this.updateTabTitle();
  }

  /**
   * Callback for handling [enter] key press in the sub directory textfield.
   *
   * @param e any
   */
  private _handleKeyPress (e: any) {
    if (!this.props.loadDirButtonDisabled && e.key === 'Enter') {
      this.loadFilesList();
    }
  }

  /**
   * Button that displays the targeted project root directory.
   *
   * This button can also be clicked to switch project.
   */
  private rootPathButtonPrepend(props: any) {
    const elementId = 'load-dir-project-path-button-'+this.id;
    const { projectRoot } = this.state;
    this.form.shortName = this.getShortFilename(projectRoot);
    return (
      <InputGroupPrepend>
        <ButtonSecondary
          className="App-font-mono"
          dataToggle="modal"
          dataTarget={'#'+elementId}
          outlined={true}
        >
          { this.form.shortName || 'Click me' }
        </ButtonSecondary>
        <Modal config={new Config({
          'modal_id' : elementId,
          'modal_title': 'Enter Project Root Path'
        })}>
          <InputGroup>
            <Input
              type="text"
              className="App-font-mono load-dir-filename"
              value={projectRoot}
              placeholder="Enter project root path"
              onChange={this.updateProjectRoot}
              onBlur={this.afterProjectRootUpdate}
            />
          </InputGroup>
        </Modal>
      </InputGroupPrepend>
    )
  }

  /**
   * Field to insert path for accessing sub-directories within
   * the project root directory.
   *
   * Note: This element may be enhanced to accect a limit number of phpunit
   *       command line options
   *
   * @param props any
   */
  private subDirTextfield(props: any) {
    const { inputId, urlId } = this.form;
    const { subDir } = this.state;
    return (
      <Input
        type="text"
        className="App-font-mono load-dir-filename"
        id={inputId}
        aria-describedby={urlId}
        onChange={this.updateSubDir}
        onPaste={this.updateSubDir}
        value={subDir}
        placeholder="tests/"
        onKeyPress={this._handleKeyPress}
      />
    );
  }

  /**
   * Files are loaded in the files list pane when this button is clicked
   *
   * @param props any
   */
  private loadDirButton(props: any) {
    return (
      <InputGroupAppend key="1">
        <Button
          onClick={this.loadFilesList}
          disabled={this.props.loadDirButtonDisabled}
          outlined={true}
        >
          Load
        </Button>
      </InputGroupAppend>
    );
  }

  /**
   * Shorten the path to the last directory.
   * 
   * This is done so that the entire directory path will not be displayed.
   *
   * @param filename directory name
   */
  private getShortFilename(filename: string) {
    if (filename.length >= 3) {
      let index:number = filename.lastIndexOf('/', filename.length-2);
      if (index === -1) {
        index = filename.lastIndexOf('\\', filename.length-1);
      }
      const sample = filename.substring(index+1, filename.length);
      return sample;
    }
    return filename;
  }

  /**
   * Callback for running some extra logic after setting the project root
   * directory.
   *
   * @param e any
   */
  private afterProjectRootUpdate(e: any) {
    this.filterProjectRoot(e);
  }

  /**
   * Fixes any issues with project root directory value.
   *
   * @param e any
   */
  private filterProjectRoot(e: any) {
    const pr:string = e.target.value;
    if (pr) {
      const projectRoot = checkPath(pr);
      this.setState({ projectRoot });
      this.setProjectRoot(projectRoot);
    }
  }

  /**
   * Callback for changing the title of the current unit test tab.
   *
   * The title will be set to the directory name.
   */
  private updateTabTitle() {
    const shortName: string = this.form.shortName;
    const title = shortName.substring(0, shortName.length - 1);
    const id = this.props.config.keys.tabId;
    this.props.config.keys.setTabTitle(id, title);
  }

  /**
   * Callback for changing the project root directory.
   *
   * @param e any
   */
  private updateProjectRoot(e: any) {
    this.setState({ projectRoot: e.target.value });
    this.setProjectRoot(e.target.value);
  }

  /**
   * Callback for changing the sub directory within the project root.
   *
   * @param e any
   */
  private updateSubDir(e: any) {
    this.setState({subDir: e.target.value});
    this.setSubDir(e.target.value);
  }

  /**
   * Callback for loading the files list in the pane.
   */
  private loadFilesList() {
    this.props.config.get('load_files_list')();
  }

}
