import { all } from 'redux-saga/effects';

// //=========================
// function* getHouseDataSaga({payload}) {
//     try {
//         const result = yield getHouseData(payload)
//         console.debug("result get post: ", result)

//         yield put(getHouseDataSuccess(result))
//     } catch (err) {
//         //do nothing
//     }
// }

// function* getHouseDataSagaStart() {
//     yield takeLatest(HouseTypes.GET_HOUSE_DATA, getHouseDataSaga);
// }

export function* userSaga() {
    yield all([
        // call(getHouseDataSagaStart),
    ]);
}
