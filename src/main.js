import 'polyfill';

import 'style.scss';

import ReactDOM from 'react-dom';
import Routes from 'routes/routes';

// import CurrentUserStore from 'stores/CurrentUserStore';
// CurrentUserStore.getMe();

ReactDOM.render(Routes, document.getElementById('app'));