import React from 'react';

const MessageView = React.createClass({
	render() {
		return (
			<div className='message-box'>
				<h2>User Name</h2>
				<div className='message-inner'>
					lorem ipsum dolor sit amet
				</div>
			</div>
		);
	}
});

export default MessageView;