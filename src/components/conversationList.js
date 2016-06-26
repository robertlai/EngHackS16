import React from 'react';

const ConversationList = React.createClass({
	getDefaultProps() {
		return {
			conversations: []
		};
	},
	handleClick(e, c) {
		console.log(e);
		console.log(c);
	},
	render() {
		return (
			<div id='conversation-list'>
				{this.props.conversations.map((conversation) => {
					<div className='conversation-list-item'>
						<h2>{ conversation.title }</h2>
						{ conversation.description }
						<button onClick={this.handleClick.bind(conversation)}>Enter</button>
					</div>
				})}
			</div>
		);
	}
});

export default ConversationList;