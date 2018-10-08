import * as React from 'react';
import Col from 'src/components/bootstrap4/Col';
import Row from 'src/components/bootstrap4/Row';
import 'src/css/unit-test/UnitTest.css';
import Config from 'src/logic/Config';
import { _id } from 'src/logic/Tools';
import {
  getFileType,
  getFileTypes,
  getShortname,
  IFile
} from './File';
import FilesList from './FilesList';
import LoadDir from './LoadDir';
import { getDefaultProjectPath } from './options/DefaultProjectPath';
import { getServerAddress } from './options/ServerAddress';
import Output from './Output';
import TestScore from './TestScore';

interface IProps {
  config: Config;
}

interface IState {
  disableLoadDirButton: boolean;
  disableLoadTestButton: boolean;
  filesList: IFile[];
  filterValue: string;
  output: string;
  outputsJsx: JSX.Element[];
}

interface IUnitTest {
  dir: string;
  projectRoot: string;
  outputId: string;
  filesTotal: number;
  testFilesTotal: number;
}

/**
 * [convention]
 * #1 Any method name that begins with "load" performs an Ajax request.
 * #2 Any method name that begins with "render" will cause the DOM to be
 *    rendered or re-rendered.
 */
class UnitTest extends React.Component<IProps, IState> {

  public static readonly DIRECTORY = 0;
  public static readonly TEST_LIST_OF_FILES = 2;
  public static readonly TEST_DIRECTORY  = 1;

  private id: number;
  private outputId: number;
  private ui: IUnitTest;

  public constructor(props: any) {
    super(props);
    this.id = _id();
    this.outputId = 0;
    this.ui = {
      dir: '',
      filesTotal: 0,
      outputId: "jUnit-output-"+ this.id,
      projectRoot: '',
      testFilesTotal: 0,
    };
    this.state = {
      disableLoadDirButton: false,
      disableLoadTestButton: false,
      filesList: [],
      filterValue: '',
      output: '',
      outputsJsx: []
    };
    this.checkAll = this.checkAll.bind(this);
    this.uncheckAll = this.uncheckAll.bind(this);
    this.filterFilesList = this.filterFilesList.bind(this);
    this.clearFilesListFilter = this.clearFilesListFilter.bind(this);
    this.loadUnitTestOutput = this.loadUnitTestOutput.bind(this);
    this.setSubDir = this.setSubDir.bind(this);
    this.setProjectRoot = this.setProjectRoot.bind(this);
    this.loadFilesList = this.loadFilesList.bind(this);
    this.loadOutputsSuccess = this.loadOutputsSuccess.bind(this);
    this.loadFilesListSuccess = this.loadFilesListSuccess.bind(this);
    this.loadFailure = this.loadFailure.bind(this);
    this.renderUpdateFilesList = this.renderUpdateFilesList.bind(this);
    this.disableLoadDirButton = this.disableLoadDirButton.bind(this);
    this.disableLoadTestButton = this.disableLoadTestButton.bind(this);
  }

  /**
   * Render
   *
   * @return {JSX.Element}
   */
  public render(): JSX.Element[] {
    const {
      disableLoadDirButton,
      disableLoadTestButton,
      filesList,
      filterValue,
      output,
      outputsJsx
    } = this.state;
    return [
      <Row key="1" className="unit-test-row" style={{flexGrow:0,flexWrap:'unset'}}>
        <LoadDir
          loadDirButtonDisabled={disableLoadDirButton}
          loadTestButtonDisabled={disableLoadTestButton}
          config={this.loadDirConf()}
        />
      </Row>,
      <Row key="2" className="unit-test-row" style={{flexGrow:1,flexWrap:'unset'}}>
        <Output config={this.outputConf()} id={this.ui.outputId}>
          { outputsJsx }
        </Output>
        <FilesList
          list={filesList}
          filter={filterValue}
          config={this.filesListConf()}
        />
      </Row>,
      <Row key="3" className="unit-test-row justify-content-center">
        <Col style={{ margin: 'auto' }}>
          <TestScore output={output} />
        </Col>
      </Row>
    ];
  }

  /**
   * Set sub-directory path.
   *
   * Callback given to child components to update the direcotry path.
   *
   * @param {string} dir directory path
   *
   * @return {void} 
   */
  public setSubDir(dir: string): void {
    this.ui.dir = dir;
  }

  public setProjectRoot(path: string): void {
    this.ui.projectRoot = path;
  }

  /**
   * Renders a list of files
   *
   * @return {void}
   */
  public renderUpdateFilesList(): void {
    const { filesList } = this.state;
    this.setState({ filesList });
  }

  /**
   * Runs a unit test
   *
   * @return {void}
   */
  public loadUnitTestOutput(): void {
    this.disableLoadTestButton();
    const { filesList } = this.state;
    if (filesList.length === 0) {
      this.renderLog('Load a project directory first.');
      this.scrollToOutputBottom();
      return;
    }
    const { dir, testFilesTotal, projectRoot } = this.ui;
    const selectedFiles = this.getSelectedFiles();
    if (selectedFiles.length === testFilesTotal) {
      $.post(getServerAddress(), {
        'boot': this.getBootFiles(),
        'cmd': UnitTest.TEST_DIRECTORY,
        'dir': dir,
        'root': projectRoot
      }, this.loadOutputsSuccess)
      .fail(this.loadFailure);
    } else {
      $.post(getServerAddress(), {
        'boot': this.getBootFiles(),
        'cmd': UnitTest.TEST_LIST_OF_FILES,
        'dir': dir,
        'files': selectedFiles.join(),
        'root': projectRoot,
      }, this.loadOutputsSuccess)
      .fail(this.loadFailure);
    }
  }

  /**
   * Disable loadDir button.
   *
   * The button makes a request to load the files from the desired directory.
   *
   * @param flag true or false
   */
  public disableLoadDirButton(flag: boolean = true): void {
    setTimeout(() => {
      this.setState({ disableLoadDirButton: flag });
    }, 0);
  }

  /**
   * Disable test button.
   *
   * The button to run a unit test.
   *
   * @param flag true or false
   */
  public disableLoadTestButton(flag: boolean = true): void {
    setTimeout(() => {
      this.setState({ disableLoadTestButton: flag });
    }, 0);
  }

  /**
   * Set tab title
   */
  public setTabTitle() {
    const id:number = this.props.config.keys.id;
    const dir = this.ui.dir;
    if (dir.length >= 3) {
      let index:number = dir.lastIndexOf('/', dir.length-2);
      if (index === -1) {
        index = dir.lastIndexOf('\\', dir.length-1);
      }
      const title = dir.substring(index+1, dir.length-1);
      this.props.config.keys.setTabTitle(id, title);
      return;
    }
    this.props.config.keys.setTabTitle(id, '...');
  }

  /**
   * When a file is check or unchecked in the files pane of the UI,
   * This method will ensure that only the checked files are evaluated
   * when the test runs.
   */
  private getSelectedFiles(): string[] {
    const { filesList } = this.state;
    const selectedList: string[] = [];
    for (const file of filesList) {
      if (file.checked) {
        selectedList.push(file.filename);
      }
    }
    return selectedList;
  }

  private loadFilesList(): void {
    this.disableLoadDirButton();
    $.post(getServerAddress(), {
      'dir': this.ui.dir,
      'root': this.ui.projectRoot
    }, this.loadFilesListSuccess)
    .fail(this.loadFailure);
  }

  /**
   * Check all files
   */
  private checkAll(): void {
    const { filesList } = this.state;
    for (const file of filesList) {
      if (!file.disabled && file.visible) {
        file.checked = true;
      }
    }
    this.setState({ filesList });
  }

  /**
   * Uncheck all files
   */
  private uncheckAll(): void {
    const { filesList } = this.state;
    for (const file of filesList) {
      if (!file.disabled && file.visible) {
        file.checked = false;
      }
    }
    this.setState({ filesList });
  }

  private setFilesList(filenames: string[]) {
    const filesList: IFile[] = [];
    let testFilesCount = 0;
    let filesCount = 0;
    for (const f of filenames) {
      const shortname = getShortname(f);
      const type = getFileType(shortname);
      const { PHP_TEST_FILE } = getFileTypes();
      const disabled = (type !== PHP_TEST_FILE);
      filesList.push({
        alwaysVisible: false,
        boot: false,
        checked: !disabled,
        disabled,
        filename: f,
        hovered: false,
        shortname,
        type,
        visible: !disabled
      });
      if (type === PHP_TEST_FILE) {
        testFilesCount++;
      }
      filesCount++;
    }
    this.ui.testFilesTotal = testFilesCount;
    this.ui.filesTotal = filesCount;
    this.setState({ filesList });
  }

  /**
   * Apply filter to the list of files.
   *
   * As user types in filter, disqualified file names will be removed.
   *
   * @param e event data
   */
  private filterFilesList(e: any) {
    const filter: string = e.target.value;
    const { filesList } = this.state;
    this.setState({ filterValue: filter });
    for (const file of filesList) {
      file.visible = (file.filename.indexOf(filter) >= 0);
      if (file.disabled && filter.length === 0) {
        file.visible = false;
      }
    }
    this.setState({ filesList });
  }

  /**
   * Clear value in filter textfield above the files list.
   */
  private clearFilesListFilter() {
    this.filterFilesList({target: {value: ''}});
  }

  /**
   * Gather an array of files that should be bootstrapped when running a test.
   */
  private getBootFiles() {
    const { filesList } = this.state;
    let boot: string = '';
    for (const file of filesList) {
      if (file.boot) {
        boot += ','+file.filename;
      }
    }
    return boot.substring(1);
  }

  /**
   * Handles the unit test result returned in the response.
   *
   * The result will be appended in the outputs pane.
   *
   * @param dat server response
   */
  private loadOutputsSuccess(dat: any) {

    // dat.meta.totalTestFiles = this.ui.testFilesTotal;
    // dat.meta.totalFiles = this.ui.filesTotal;
    // this.renderLogJson(dat);

    if (dat.data && dat.data.output) {
      const output = dat.data.output;
      const { outputsJsx } = this.state;
      outputsJsx.push(
        <pre
          key={this.outputId}
          className="unit-test-output"
        >
          { output }
        </pre>
      );
      this.outputId++;
      this.setState({ output, outputsJsx });
    } else if (dat.errors) {
      this.loadLogError(dat);
      const output = '';
      const { outputsJsx } = this.state;
      this.setState({ output, outputsJsx });
    }
    this.scrollToOutputBottom();
  }

  /**
   * Handles successful files list request.
   *
   * The files will be loaded in the files list pane.
   * 
   * @param dat server response
   */
  private loadFilesListSuccess(dat: any): void {

    // this.renderLogJson(dat); // DEBUG

    if (dat.data && dat.data.files) {
      this.setFilesList(dat.data.files);
      this.renderLog('Directory loaded successfully!');
      this.renderUpdateFilesList();
    } else if (dat.errors) {
      this.loadLogError(dat);
      const { outputsJsx } = this.state;
      this.setState({ outputsJsx });
      this.renderClearFilesList();
    } else {
      this.setState({ filesList: [] });
      this.renderLogJson(dat);
    }
    this.scrollToOutputBottom();
  }

  /**
   * Handles request failure
   *
   * @param data server response
   */
  private loadFailure(data: any): void {
    this.renderClearFilesList();
    if (data.responseText) {
      const { outputsJsx } = this.state;
      outputsJsx.push(
        <div
          key={this.outputId}
          dangerouslySetInnerHTML={{__html: data.responseText}}
        />
      );
      this.outputId++;
      this.setState({ outputsJsx });
    } else {
      this.renderLogJson(data);
    }
    this.scrollToOutputBottom();
  }

  /**
   * If error(s) occurred from request, this method will display them in
   * the output pane.
   *
   * @param dat server response
   */
  private loadLogError(dat: any) {
    const { outputsJsx } = this.state;
    for (const e of dat.errors) {
      outputsJsx.push(
      <div key={this.outputId}>
        <strong>error:</strong>&nbsp;{e.detail}
      </div>
      );
      this.outputId++;
    }
  }

  /**
   * Clear the list of files
   */
  private renderClearFilesList(): void {
    this.setState({ filesList: [] });
  }

  /**
   * Inserts some text in the output area.
   *
   * @param entry anytning
   */
  private renderLog(entry: string): void {
    const { outputsJsx } = this.state;
    outputsJsx.push(<div key={this.outputId}>{entry}</div>);
    this.outputId++;
    this.setState({ outputsJsx });
  }

  /**
   * Insert response as JSON in the output area.
   *
   * @param data response from server
   */
  private renderLogJson(data: any): void {
    const { outputsJsx } = this.state;
    const highlight = this.syntaxHighlight(data, this.outputId);
    this.outputId++;
    outputsJsx.push(highlight);
    this.setState({ outputsJsx });
  }

  /**
   * Scroll output window to bottom.
   *
   * Currently, the loadDir button will remain disabled until this method runs.
   * This will allow the script to finish scrolling to the bottom before
   * performing another request.
   *
   */
  private scrollToOutputBottom() {
    setTimeout(()=> {
      const comp = $('#'+this.ui.outputId);
      comp.animate({
        scrollTop: comp.prop('scrollHeight')
      }, 'slow', () => {
        this.disableLoadDirButton(false);
        this.disableLoadTestButton(false);
      });
    }, 0);
  }

  private syntaxHighlight (json: object | string, key: number, indent: number = 2): JSX.Element {
    if (typeof json !== 'string') {
         json = JSON.stringify(json, undefined, indent);
    } if (typeof json === 'undefined') {
      return <pre />;
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const innerHTML: string = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls: string = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
    return <pre key={key} dangerouslySetInnerHTML={{__html: innerHTML}} />
  }

  private loadDirConf(): Config {
    const conf: Config = new Config();
    conf.set('label', 'Load Test Files');
    conf.set('url', getDefaultProjectPath());
    conf.set('id', this.id);
    conf.set('tabId', this.props.config.keys.id);
    conf.set('setSubDir', this.setSubDir);
    conf.set('setProjectRoot', this.setProjectRoot);
    conf.set('load_files_list', this.loadFilesList);
    conf.set('loadUnitTestOutput', this.loadUnitTestOutput);
    conf.set('setTabTitle', this.props.config.keys.setTabTitle);

    return conf;
  }

  private outputConf(): Config {
    const conf: Config = new Config();
    conf.set('disable_load_dir_button', this.disableLoadDirButton);

    // TODO Insert more data for the form here

    conf.set('id', this.id);

    return conf;
  }

  private filesListConf(): Config {
    const conf: Config = new Config();
    conf.set('checkAll', this.checkAll);
    conf.set('uncheckAll', this.uncheckAll);
    conf.set('filterFilesList', this.filterFilesList);
    conf.set('clearFilesListFilter', this.clearFilesListFilter);
    conf.set('renderUpdateFilesList', this.renderUpdateFilesList);
  
    // TODO Insert more data for file list here

    conf.set('id', this.id);

    return conf;
  }

}

export default UnitTest;