import notificationTypes from "./notification.types";

export const getNotificationData = (payload) => ({
	type: notificationTypes.GET_NOTIFICATION_DATA,
	payload,
});

export const removeNotificationData = (payload) => ({
	type: notificationTypes.REMOVE_NOTIFICATION_DATA,
	payload,
});
