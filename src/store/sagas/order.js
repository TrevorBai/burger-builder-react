import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import Axios from '../../axios-orders'

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart())
  try {
    const res = yield Axios.post(`/orders.json?auth=${action.token}`, action.orderData)
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData))
  } catch(e) {
    yield put(actions.puchaseBurgerFail(e))
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart())
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
  try {
    const res = yield Axios.get(`/orders.json${queryParams}`)
    const fetchedOrders = []
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      })
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders))
  } catch(e) {
    yield put(actions.fetchOrdersFail(e))
  }
}