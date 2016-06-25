import React from 'react';
import test from '../test';
import Message from 'components/message';

const MainView = React.createClass({
	render() {
		return (
			<div>
				<div className="stuff"></div>
				<Message {...test}/>
			</div>
		);
	}
});

export default MainView;