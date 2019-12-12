import { delay } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'
import * as actions from '../actions/index'
import Axios from 'axios'  // not from the Axios instance, because it uses another baseURL

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token")  // testable sagas
  yield call([localStorage, "removeItem"], "expirationDate")
  yield call([localStorage, "removeItem"], "userId")
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.authLogout())
}

export function* authSaga(action) {
  yield put(actions.authStart())

  const authData = yield {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDebRAL6ggFfMkdex96E_O3WLN35UZ9bSk'
  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDebRAL6ggFfMkdex96E_O3WLN35UZ9bSk'
  }
  try {
    const res = yield Axios.post(url, authData)   // yield waits for response either promise is fullfilled or rejected
    const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000)
    yield localStorage.setItem('token', res.data.idToken)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', res.data.localId)
    yield put(actions.authSuccess(res.data))
    yield put(actions.checkAuthTimeout(res.data.expiresIn))
  } catch (e) {
    yield put(actions.authFail(e.response.data.error))   // error is from Axios
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.authLogout())
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
    if (expirationDate > new Date()) {
      const authData = yield {
        idToken: token,
        localId: localStorage.getItem('userId')
      }
      yield put(actions.authSuccess(authData))
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    } else {
      yield put(actions.authLogout())
    }
  }
}