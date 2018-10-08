import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

/*
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
*/

// more info:
// https://github.com/stereobooster/react-snap

const HTMLElement = document.getElementById('root');

if (HTMLElement && HTMLElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, HTMLElement);
} else {
  ReactDOM.render(<App />, HTMLElement);
}

registerServiceWorker();