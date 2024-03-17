import { takeLatest, all, call, put } from "redux-saga/effects";
import {
	getHouseDataSuccess,
	paginationHouseDataSuccess,
	paginationHouseDataFailure,
} from "./house.action";
import { getHouseData, filterHouseData } from "../../api/house.api";
import HouseTypes from "./house.types";

//=========================
function* getHouseDataSaga({ payload }) {
	try {
		const result = yield getHouseData(payload);
		console.debug("result get post: ", result);

		yield put(getHouseDataSuccess(result));
	} catch (err) {
		//do nothing
	}
}

function* getHouseDataSagaStart() {
	yield takeLatest(HouseTypes.GET_HOUSE_DATA, getHouseDataSaga);
}
//=========================
function* paginationDataSaga({ payload }) {
	try {
		const result = yield filterHouseData(payload);
		console.debug("result get post: ", result);

		yield put(paginationHouseDataSuccess(result));
	} catch (err) {
		//do nothing
		yield put(paginationHouseDataFailure(err.message));
	}
}

function* paginationDataSagaStart() {
	yield takeLatest(HouseTypes.PAGINATE_HOUSE_DATA, paginationDataSaga);
}
//=========================

export function* houseSaga() {
	yield all([call(getHouseDataSagaStart), call(paginationDataSagaStart)]);
}
