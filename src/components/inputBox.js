import React from 'react';
import request from 'request';

const InputBox = React.createClass({
	handleSubmit() {
		request({
			uri: 'http://localhost:8080/api/messages/new',
			method: 'POST',
			json: {
				msg: this.refs.input.value
			}
		}, (err, res, body) => {
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