const _ = require('lodash');
const fs = require('fs');

const viewCache = new Map();

function Render(view, options) {
	const compiled = _.template(view);
	return compiled(options);
}

module.exports = function(filePath, options, callback) {
	if(viewCache.has(filePath)) {
		return callback(null, Render(viewCache.get(filePath), options));
	} else {
		fs.readFile(filePath, function (err, content) {
			if (err) { return callback(new Error(err)); }

			const view = content.toString();
			viewCache.set(filePath, view);
			return callback(null, Render(view, options));
		});
	}
};