import 'polyfill';

import 'style.scss';

import ReactDOM from 'react-dom';
import Routes from 'routes/routes';

global.EH = global.EH || {};
ReactDOM.render(Routes, document.getElementById('app'));