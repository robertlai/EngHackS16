import React from 'react';
import {browserHistory } from 'react-router';

const CreateView = React.createClass({
	handleCreate() {
		fetch('/api/conversations/new', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				title: this.refs.title.value,
				content: this.refs.message.value
			})
		}).then((res) => {
			if(res.status == 200) {
				browserHistory.push('/dashboard');
			}
		});
	},
	render() {
		return (
			<div>
				<input ref='title' type='text' placeholder='Title'/>
				<input ref='message' type='text' placeholder='Message'/>
				<button onClick={this.handleCreate}>Create</button>
			</div>
		);
	}
});

export default CreateView;