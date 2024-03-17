import { all, call, put, takeLatest } from "redux-saga/effects";
import notificationTypes from "./notification.types";
import { getNotificationData } from "./notification.actions";

function* getNotificationSaga(payload) {
	try {
		console.debug("result get notification: ", payload);
		yield put(getNotificationData(payload));
	} catch (error) {
		console.log(payload);
	}
}

function* removeNotificationSaga(payload) {
	try {
		console.debug("result get notification: ", payload);
		yield put(getNotificationData(payload));
	} catch (error) {
		console.log(payload);
	}
}

export function* notificationSaga() {
	yield all[(call(getNotificationSaga), call[removeNotificationSaga])];
}
