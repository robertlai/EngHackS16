import 'whatwg-fetch';
import React from 'react';

const InputBox = React.createClass({
	handleSubmit() {
		fetch('/api/messages/new', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		  	_parent: '576f09ee9ad4abc82ce85beb',
		    messageContent: this.refs.input.value
		  })
		}).then((res) => {
			console.log(res);
		});
	},
	render() {
		return (
			<div className='inputBox'>
				<input ref='input' type='text'/>
				<button onClick={this.handleSubmit}/>
			</div>
		);
	}
});

export default InputBox;