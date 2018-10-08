import * as React from 'react';
import Config from 'src/logic/Config';

interface IProps {
  config: Config;
}

export interface IModal {
  content: any;
  id: string;
  submitButtonCallback?: ()=>void;
  submitButtonStyle: string;
  submitButtonValue: string;
  title: string;
}

export default class Modal extends React.Component<IProps> {

  private modal: IModal;

  public constructor(props: any) {
    super(props);
    const conf: Config = this.props.config;
    this.modal = {
      content: conf.rGet('modal_content') || '',
      id: conf.get('modal_id'), // this is the string value of the HTML element attribute
      submitButtonCallback: conf.rGet('modal_callback') || undefined,
      submitButtonStyle: conf.rGet('modal_submit_button_style') || 'btn-primary',
      submitButtonValue: conf.rGet('modal_submit_button_value') || 'Save changes',
      title: conf.rGet('modal_title') || ''
    };
    this.modalTitle = this.modalTitle.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  public render() {
    return (
      <div className="modal fade"
        id={this.modal.id}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <this.modalTitle />
              <this.upperCloseButton />
            </div>
            <div className="modal-body">
              {this.props.children || this.modal.content}
            </div>
            <div className="modal-footer">
              <this.closeButton />
              <this.submitButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Modal title
   *
   * @return {JSX.Element}
   */
  private modalTitle(): JSX.Element {
    return (
      <h5 className="modal-title" id={this.modal.id+"-title"}>
        {this.modal.title}
      </h5>
    );
  }

  /**
   * Upper close (X) button
   *
   * @return {JSX.Element}
   */
  private upperCloseButton(): JSX.Element {
    return (
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }

  /**
   * Close button bottom right.
   *
   * @return {JSX.Element}
   */
  private closeButton(): JSX.Element {
    return (
      <button type="button"
        className="btn btn-secondary"
        data-dismiss="modal"
      >
      Close
      </button>
    )
  }

  /**
   * Submit button JSX.Element
   *
   * @return {any}
   */
  private submitButton():any {
    if (this.modal.submitButtonCallback) {
      return (
        <button type="button"
          className={"btn "+this.modal.submitButtonStyle}
          onClick={this.modal.submitButtonCallback}
        >
          {this.modal.submitButtonValue}
        </button>
      );
    }
    return '';
  }


}