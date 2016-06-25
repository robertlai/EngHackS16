import React from 'react';

const LoginView = React.createClass({
	getInitialState() {
		return {
			someText: 'hi'
		};
	},
	handleSubmit() {
		this.setState({
			someText: 'hello'
		});
	},
	render() {
		return (
			<div id="login-box">
				<h1>Login</h1>
				<input type="text"/>
				<input type="text"/>
				<button id="submit-button" onClick={this.handleSubmit}/>
				{ this.state.someText }
			</div>
		);
	}
});

export default LoginView;