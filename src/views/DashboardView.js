import React from 'react';
import TopBar from 'components/topBar';
import ConversationList from 'components/conversationList';
import 'whatwg-fetch';

const DashboardView = React.createClass({
	getInitialState() {
		return {
			conversations: []
		};
	},
	componentDidMount() {
		fetch('/api/conversations/all', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then((res) => {
			if(res.status == 200) {
				return res.json();
			}
		}).then((json) => {
			this.setState({
				conversations: json
			});
		});
	},
	render() {
		return (
			<div id='dashboard-container'>
				<TopBar/>
				<ConversationList conversations={this.state.conversations}/>
			</div>
		);
	}
});

export default DashboardView;