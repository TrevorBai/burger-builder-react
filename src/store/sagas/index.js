import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth'
import { initIngredientsSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'

export function* watchAuth() {
  // the order of following yields doesn't matter, it doesn't pause here because they are synchronous tasks
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_USER, authSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    // takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
  ])
}