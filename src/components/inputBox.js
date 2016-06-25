import React from 'react';
// import request from 'request';
import http from 'http';

const InputBox = React.createClass({
	handleSubmit() {
		// request.get({url: '/main'}, (err, res) => {
		// 	console.log(res);
		// });
			http.get('/main', (res) => {
				console.log(res);
			}
		);
	},
	render() {
		return (
			<div className='inputBox'>
				<input type='text'/>
				<button onClick={this.handleSubmit}/>
			</div>
		);
	}
});

export default InputBox;