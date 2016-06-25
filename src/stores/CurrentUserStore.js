import alt from 'core/alt';
import CurrentUserActions from 'actions/CurrentUserActions';

const CurrentUserSource = {
	getMe: {
		remote() {
			// return API.user.Me().then(me => {
			// 	if(me.organization) {
			// 		return Organization.get({ id: me.organization }).then(org => {
			// 			me.organization = org;
			// 			return me;
			// 		});
			// 	} else {
			// 		return me;
			// 	}
			// });
			return {};
		},

		success: CurrentUserActions.receivedMe,
		error: CurrentUserActions.fetchingMeFailed
	}
};

class CurrentUserStore {
	constructor() {
		this.user = {};
		this.registerAsync(CurrentUserSource);
		this.bindListeners({
			handleReceiveMe: CurrentUserActions.RECEIVED_ME
		});
	}

	handleReceiveMe(me) {
		if(me.id !== this.user.id) {
			console.log(me);
		}
		this.user = me;
	}
}

export default alt.createStore(CurrentUserStore, 'CurrentUserStore');