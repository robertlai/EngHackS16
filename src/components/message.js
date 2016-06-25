import React from 'react';
import _ from 'lodash';

const Message = React.createClass({
	render() {
		return (
			<div className='messageContainer'>
				<div className='message'> { this.props.text } </div>
				{ _.map(this.props.children, (message) => {
					return <Message {...message}/>;
				}) }
			</div>
		);
	}
});

export default Message;