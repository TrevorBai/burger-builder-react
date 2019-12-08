import * as actionTypes from './actionTypes'
import Axios from 'axios'  // not from the Axios instance, because it uses another baseURL 

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDebRAL6ggFfMkdex96E_O3WLN35UZ9bSk'
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDebRAL6ggFfMkdex96E_O3WLN35UZ9bSk'
    }

    Axios.post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', res.data.localId)

        dispatch(authSuccess(res.data))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(e => {
        dispatch(authFail(e.response.data.error))   // error is from Axios
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(authLogout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        const authData = {
          idToken: token,
          localId: localStorage.getItem('userId')
        }
        dispatch(authSuccess(authData))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
      } else {
        dispatch(authLogout())
      }
    }
  }
}