import React from 'react';
import {browserHistory } from 'react-router';

const ConversationList = React.createClass({
	getDefaultProps() {
		return {
			conversations: []
		};
	},
	handleClick(id) {
		browserHistory.push(`/main/${id}`);
	},
	render() {
		return (
			<div id='conversation-list'>
				{this.props.conversations.map((conversation, i) => {
					return (
						<div key={`c${i}`} className='conversation-list-item'>
							<h1>{ conversation.title }</h1>
							<button onClick={this.handleClick.bind(this, conversation._rootNode)}>Enter</button>
						</div>
					);
				})}
			</div>
		);
	}
});

export default ConversationList;