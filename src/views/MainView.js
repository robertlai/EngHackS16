import React from 'react';
import test from '../test';
import Message from 'components/message';
import InputBox from 'components/inputBox';

const MainView = React.createClass({
	render() {
		return (
			<div>
				<InputBox />
				<Message
					{...test}
					selfAngle={0}
					index={0}
					nodeCount={1}
				/>
			</div>
		);
	}
});

export default MainView;