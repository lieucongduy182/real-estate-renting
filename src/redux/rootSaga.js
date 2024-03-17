import { call, all } from "redux-saga/effects";
import { houseSaga } from "./house/house.saga";
import { userSaga } from "./user/user.saga";
import { notificationSaga } from "./notification/notification.saga";

export default function* rootSaga() {
	yield all([call(houseSaga), call(userSaga), call(notificationSaga)]);
}
