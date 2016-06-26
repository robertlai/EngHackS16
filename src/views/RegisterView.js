import 'whatwg-fetch';
import React from 'react';
import {Link } from 'react-router';

import Form from 'forms/Form';
import SignupFormSchema from 'forms/schemas/SignupFormSchema';

const RegisterView = React.createClass({
	getInitialState() {
		return {
			validationEnabled: false
		};
	},
	handleSubmit(e) {
		e.preventDefault();

	    const { form } = this.refs;

	    if(form.validate()) {
	      const { username, password } = form.getValue();

	      fetch('/auth/register', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: username,
					password: password
				})
			}).then((res) => {
				console.log(res);
				if(res.status != 200) {

				}
			});
	    }

	    this.setState({
	      validationEnabled: true,
	    });
	},
	render() {
		return (
			<div id="login-box">
				<form id='auth_form'>
					<h1>Register</h1>
					<Form
			            ref='form'
			            schema={SignupFormSchema}
			            validationEnabled={this.state.validationEnabled}
			          />
					<button id="submit-button" onClick={this.handleSubmit}>Submit</button>
				</form>
        		<Link to='/login'>Login</Link>
			</div>
		);
	}
});

export default RegisterView;