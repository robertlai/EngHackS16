import React from 'react';
import test from '../test';
import Message from 'components/message';
import InputBox from 'components/inputBox';

const MainView = React.createClass({
	render() {
		return (
			<div>
				<InputBox />
				<div id='root-message-anchor'>
					<Message
						{...test}
						selfAngle={Math.PI}
						index={0}
						nodeCount={1}
					/>
				</div>
			</div>
		);
	}
});

export default MainView;