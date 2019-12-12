import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import Axios from '../../axios-orders'

export function* initIngredientsSaga(action) {
  try {
    const res = yield Axios.get('https://react-my-burger-9a4c1.firebaseio.com/ingredients.json')
    yield put(actions.setIngredients(res.data))
  } catch(e) {
    yield put(actions.fetchIngredientsFailed())
  }
}