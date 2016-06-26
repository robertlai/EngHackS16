import React from 'react';
import TopBar from 'components/topBar';
import ConversationList from 'components/conversationList';

const DashboardView = React.createClass({
	render() {
		return (
			<div id='dashboard-container'>
				<TopBar/>
				<ConversationList/>
			</div>
		);
	}
});

export default DashboardView;