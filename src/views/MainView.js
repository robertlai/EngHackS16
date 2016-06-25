import React from 'react';
import test from '../test';
import Message from 'components/message';
import InputBox from 'components/inputBox';

const MainView = React.createClass({
	render() {
		return (
			<div>
				<InputBox />
				<Message {...test}/>
			</div>
		);
	}
});

export default MainView;