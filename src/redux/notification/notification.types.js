var keyMirror = require("key-mirror");

const notificationTypes = keyMirror({
	GET_NOTIFICATION_DATA: null,
	REMOVE_NOTIFICATION_DATA: null,
});

export default notificationTypes;
