import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import MainView from 'views/MainView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import MessageView from 'views/MessageView';

import 'whatwg-fetch';
// const Routes = (
// 	<Router history={history} routes={{
// 		path: '/(:lang)',
// 		component: RootView,
// 		onEnter: DefaultRedirect,
// 		childRoutes: [
// 			DashboardRoutes,
// 			VenueRoutes
// 		]
// 	}}/>
// );

const checkAuth = (nextState, replace, callback) => {
	fetch('/auth/getUserStatus', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({

				})
			}).then((res) => {
				// console.log(res.json());
				return res.json();
				// if(res.status != 200) {

				// }
				// return res.status == 200;
			}).then((json) => {
				console.log(json);
				if(!json.loggedIn) {
					browserHistory.push('/login');
				}
				else {
					callback();
				}
			});
}

const Routes = (
	<Router history={browserHistory}>
		<Route path="/login" component={LoginView}/>
		<Route path="/register" component={RegisterView}/>
		<Route path="/main" component={MainView} onEnter={checkAuth}/>
	</Router>
);

export default Routes;

	  // <Route path="about" component={About}/>
	  // <Route path="users" component={Users}>
	  //   <Route path="/user/:userId" component={User}/>
	  // </Route>
	  // <Route path="*" component={NoMatch}/>

	 //  		<Route path="/register" component={RegistrationView}/>
		// <Route path="/login" component={LoginView}/>