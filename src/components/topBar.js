import React from 'react';
import {Link, browserHistory } from 'react-router';
import 'whatwg-fetch';

const TopBar = React.createClass({
	handleLogout() {
		fetch('/auth/logout', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			}).then((res) => {
				if(res.status == 200) {
					browserHistory.push('/login');
				}
			});
	},
	handleNewConversation() {
		browserHistory.push('/create');
	},
	render() {
		return (
			<div id='topbar'>
				<button id='create-button' onClick={this.handleNewConversation}>Create a new conversation</button>
				<button id='logout-button' onClick={this.handleLogout}>Logout</button>
			</div>
		);
	}
});

export default TopBar;