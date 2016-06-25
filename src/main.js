import 'polyfill';

import 'style.scss';

import ReactDOM from 'react-dom';
import Routes from 'routes/routes';

global.MI = global.MI || {};
ReactDOM.render(Routes, document.getElementById('app'));