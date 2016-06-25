import 'babel-polyfill';
import 'promise.prototype.finally';

if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

window.addEventListener('dragover', function(e) {
	e.preventDefault();
	e.stopPropagation();
	return false;
}, false);

window.addEventListener('drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
	return false;
}, false);