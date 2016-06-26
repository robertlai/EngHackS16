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
	render() {
		return (
			<div id='topbar'>
				<button onClick={this.handleLogout}>Logout</button>
			</div>
		);
	}
});

export default TopBar;