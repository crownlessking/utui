import * as React from 'react';
import { newTab } from 'src/components/bootstrap4/tabulation/Tabulation';
import UnitTestOptions from 'src/components/unit-test/options/UnitTestOptions';
import UnitTest from 'src/components/unit-test/UnitTest';
import Config from 'src/logic/Config';
import HelpIframe from '../../HelpIframe';

class NavModel {

  public static getInstance(): NavModel {
    return NavModel.instance;
  }

  private static instance: NavModel = new NavModel();

  public links: Array<() => void> = [
    () => {
      const conf = new Config();
      conf.set('href', 'javascript:');
      conf.set('id', 'new');
      conf.set('icon', 'fas fa-plus');

      conf.set('callback', () => {
        const tabConf: Config = new Config();
        tabConf.rSet('name', 'Unit Test');
        tabConf.set('content', <UnitTest config={tabConf} />);
        newTab(tabConf);
      });
      return conf;
    }
  ];

  public linksRight: Array<() => void> = [
    () => {
      const confs: Config[] = [];

      confs.push(new Config({
        'href': 'javascript:',
        'icon': 'fas fa-wrench',
        'menu_align_right': true
      }));

      confs.push(new Config({
        'data_toggle': 'modal',
        // 'icon': 'fas fa-sitemap',
        'modal_content': <UnitTestOptions />,
        'modal_id': 'modal-set-root-path',
        'modal_title': 'Unit Test Settings',
        'value': 'Unit Test'
      }));

      // confs.push(new Config({
      //   'role': 'separator'
      // }));

      confs.push(new Config({
        'href': 'https://www.patreon.com/riviereking',
        'icon': 'fas fa-dollar-sign',
        'target': '__blank',
        'value': 'Support Me'
      }));

      confs.push(new Config({
        'callback': () => {
          newTab(new Config({
            'content': <HelpIframe />,
            'name': 'Help'
          }));
        },
        'href': '#help',
        'icon': 'far fa-question-circle',
        'value': 'Help'
      }));

      return confs;
    }

  ];

  constructor() {
    if (NavModel.instance) {
      throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
    }
    NavModel.instance = this;
  }

};

export default NavModel.getInstance();