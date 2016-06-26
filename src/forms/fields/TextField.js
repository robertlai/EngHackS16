import React from 'react';

const TextField = React.createClass({
	render() {
		return (
			<input {...this.props}/>
		);
	}
});

export default TextField;