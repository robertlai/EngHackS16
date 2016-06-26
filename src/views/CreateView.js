import React from 'react';

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
			console.log(res);
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