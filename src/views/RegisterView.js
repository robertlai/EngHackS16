import React from 'react';
import Form from 'forms/Form';
import SigninFormSchema from 'forms/schemas/SigninFormSchema';

const RegisterView = React.createClass({
	getInitialState() {
		return {
			validationEnabled: false
		};
	},
	handleSubmit() {

	},
	render() {
		return (
			<div id="login-box">
				<form id='auth_form'>
					<h1>Register</h1>
					<Form
			            ref='form'
			            schema={SigninFormSchema}
			            validationEnabled={this.state.validationEnabled}
			          />
					<button id="submit-button" onClick={this.handleSubmit}/>
				</form>
        		<Link to='/sign_up'>Create new account</Link>
			</div>
		);
	}
});

export default RegisterView;