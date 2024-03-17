import notificationTypes from "./notification.types";

const INITIAL_STATE = {
	notification: 0,
};

const notificationReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	console.log(action);
	switch (type) {
		case notificationTypes.GET_NOTIFICATION_DATA:
			const { number } = payload;
			console.log(number);
			return {
				notification: number,
			};

		case notificationTypes.REMOVE_NOTIFICATION_DATA:
			return {
				notification: 0,
			};

		default:
			return state;
	}
};

export default notificationReducer;
