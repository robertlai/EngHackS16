import React from 'react';

const ConversationList = React.createClass({
	getInitialState() {
		return {
			conversations: []
		};
	},
	componentDidMount() {

	},
	render() {
		return (
			<div id='conversation-list'>
				{this.state.conversations.map((conversation) => {

				})}
			</div>
		);
	}
});

export default ConversationList;