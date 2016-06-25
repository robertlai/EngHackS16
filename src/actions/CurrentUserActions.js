import alt from 'core/alt';

class CurrentUserActions {
	constructor() {
		this.generateActions(
			'receivedMe',
			'fetchingMeFailed'
		);
	}
}

CurrentUserActions = alt.createActions(CurrentUserActions);
export default CurrentUserActions;