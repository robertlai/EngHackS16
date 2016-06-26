import React from 'react';
import TopBar from 'components/topBar';
import MainView from 'views/MainView';

const DashboardView = React.createClass({
	componentDidMount() {

	},
	render() {
		return (
			<div id='dashboard-container'>
				<TopBar/>
				<MainView/>
			</div>
		);
	}
});

export default DashboardView;