
import * as React from 'react';
import 'src/css/Tab.css';
import Config from 'src/logic/Config';
import { setTimeout } from 'timers';
import TabBody from './TabBody';
import TabHead from './TabHead';

interface ITabProps {
  config: Config;
}

interface ITabState {
  body: any[];
  head: any[];
  confs: Config[];
};

export let newTab: (conf: Config)=>void;

export default class Tabulation extends React.Component<ITabProps, ITabState> {

  private nextId: number;

  public constructor(props: any) {
    super(props);
    this.state = {
      body : [],
      confs : [],
      head : []
    };
    this.nextId = 0;
    this.newTab = this.newTab.bind(this);
    newTab = this.newTab;
  }

  public render() {
    const { body, head } = this.state;
    return (
      <div className="tabulation" id="tabulation">
        <div id="tab-selection" className="interface-tab" role="tablist">
          <ul className="nav nav-tabs" id="all-tabs" role="tablist">
            { head }
          </ul>
        </div>
        <div id="tab-content" className="tab-content">
          { body }
        </div>
      </div>
    );

  }

  public newTab (conf:Config): void {
    const id:number = this.nextId;
    conf.set('id', id);
    const tabId: string = 'tab-'+id;
    conf.set('tab_id', tabId);
    conf.set('tab_content_id', tabId+'-content');
    conf.set('delete_tab', this.deleteTab.bind(this));
    conf.set('setTabTitle', this.setTabTitle.bind(this));
    const head: any[] = this.state.head;
    head.push(<TabHead key={id} title={conf.keys.name} config={conf} />);
    const body: any[] = this.state.body;
    body.push(<TabBody key={id} config={conf} />);
    const confs = this.state.confs;
    confs.push(conf);

    this.setState({body, confs, head});
    this.showTab(id);
    this.nextId++;
  }

  public setTabTitle (id: number, title: string) {
    if (!title) {
      return;
    }
    for (let j = 0; j < this.state.confs.length; j++) {
      const conf = this.state.confs[j];
      if (id === conf.keys.id) {
        conf.rSet('name', title);
        this.state.head[j] = <TabHead key={id} title={title} config={conf} />;
        this.setState({
          confs: this.state.confs,
          head: this.state.head
        });
        return;
      }
    }
  }

  /**
   * Delete a specific tab.
   *
   * @param {Number} aId unique id identifying tab
   *
   * @return {void}
   */
  public deleteTab (tabId: string): void {
    const head: any[] = [];
    const body: any[] = [];
    const confs: Config[] = [];
    const wasSelected: boolean = this.isSelected(tabId);
    for (let j = 0; j < this.state.confs.length; j++) {
      const conf = this.state.confs[j];
      const cursorId: string = conf.get('tab_id');
      if (cursorId !== tabId) {
        head.push(this.state.head[j]);
        body.push(this.state.body[j]);
        confs.push(conf);
      }
    }
    this.setState({body, confs, head});
    this.showTabOnDelete(tabId, wasSelected, confs);
  }

  /**
   * Toggles the last tab to be visible if the last one was deleted.
   *
   * @param {Config[]} confs array of configuration
   *
   * @return {void}
   */
  private showTabOnDelete(tabId: string, wasSelected: boolean, confs: Config[]): void {
    if (wasSelected) {
      const nLength: number = confs.length;
      if (nLength > 1) {
        const dId: number = confs[nLength - 1].get('id');
        this.showTab(dId);
      } else if (nLength === 1) {
        const dId: number = confs[0].get('id');
        this.showTab(dId);
      }
    }
  }

  /**
   * Returns true if the tab associated with the provided id is selected.
   *
   * @param {string} tabId id of tab
   *
   * @return {boolean}
   */
  private isSelected(tabId: string): boolean {
    const selectedId = $("a[aria-selected='true']").attr('id');

    return tabId === selectedId;
  }

  /**
   * Toggle the content of a specific tab to be visible.
   *
   * @param {number} aId id of tab
   */
  private showTab(aId: number) {
    const tabId: string = 'tab-'+aId;
    setTimeout(() => {
      // $('#all-tabs li:last-child a').tab('show');
      $('#'+tabId).tab('show');
    }, 1);
  }

}
