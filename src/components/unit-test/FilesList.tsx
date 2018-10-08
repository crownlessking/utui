import * as React from 'react';
import { ButtonInfo } from 'src/components/bootstrap4/Button';
import Col, { Col1, Col2, ColLg5 } from 'src/components/bootstrap4/Col';
import Input from 'src/components/bootstrap4/Input';
import { InputGroupPrepend, InputGroupSm } from 'src/components/bootstrap4/Input';
import Row from 'src/components/bootstrap4/Row';
import 'src/css/unit-test/FilesList.css';
import Config from 'src/logic/Config';
import File, { IFile } from './File';

interface IProps {
  config: Config;
  filter: string;
  list: IFile[];
}

export default class FilesList extends React.Component<IProps> {

  public constructor(props: any) {
    super(props);
    this.filterInput = this.filterInput.bind(this);
  }

  public render() {
    const { config, filter } = this.props;
    const { id, checkAll, uncheckAll } = config.keys;
    const filesListJsx = this.renderFilesList();
    return (
      <ColLg5 className="files-list" id={"files-list-"+id}>
        <Row className="files-list-header">
          <Col1 className="file-list-header-icon">
            <a href="javascript:" onClick={checkAll}>
              <i className="far fa-check-square" />
            </a>
          </Col1>
          <Col1 className="file-list-header-icon">
            <a href="javascript:" onClick={uncheckAll}>
              <i className="far fa-square" />
            </a>
          </Col1>
          <Col2 className="file-list-header-icon">
            { filesListJsx.length }
          </Col2>
          <Col>
            <this.filterInput filter={filter} config={config} />
          </Col>
        </Row>
        <form id={'files-list-'+id+'-form'}>
          { filesListJsx }
        </form>
      </ColLg5>
    );
  }

  /**
   * Renders a list of files
   *
   * @return {void}
   */
  private renderFilesList(): JSX.Element[] {
    const { renderUpdateFilesList } = this.props.config.keys;
    const listJsx: JSX.Element[] = [];
    for (let j=0; j < this.props.list.length; j++) {
      const file = this.props.list[j];
      if (file.visible || file.alwaysVisible) {
        listJsx.push(
          <File
            key={j}
            file={file}
            config={new Config({
              'renderUpdateFilesList': renderUpdateFilesList
            })}
          />
        );
      }
    }
    return listJsx;
  }

  private filterInput(props: any) {
    const { config, filter } = props;
    const { clearFilesListFilter, filterFilesList } = config.keys;
    return (
      <InputGroupSm>
        <InputGroupPrepend>
          <ButtonInfo
            onClick={clearFilesListFilter}
            outlined={true}
          >
            <i className="fas fa-times" />
          </ButtonInfo>
        </InputGroupPrepend>
        <Input
          type="text"
          placeholder="Filter"
          onChange={filterFilesList}
          value={filter}
        />
      </InputGroupSm>
    )
  }

}
