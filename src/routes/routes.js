import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import TestView from 'views/TestView';
import OtherView from 'views/OtherView';
// import {Router} from 'react-router';

// import history from 'core/history';

// import DefaultRedirect from 'routes/DefaultRedirect';
// import RootView from 'views/RootView';
// import DashboardRoutes from 'routes/DashboardRoutes';
// import VenueRoutes from 'routes/VenueRoutes';

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

const Routes = (
	<Router history={browserHistory}>
		<Route path="/test" component={TestView}>

		</Route>
	</Router>
);

export default Routes;

	  // <Route path="about" component={About}/>
	  // <Route path="users" component={Users}>
	  //   <Route path="/user/:userId" component={User}/>
	  // </Route>
	  // <Route path="*" component={NoMatch}/>