import * as actionTypes from './actionTypes'
import Axios from '../../axios-orders'

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  }
}

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    Axios.get('https://react-my-burger-9a4c1.firebaseio.com/ingredients.json')
      .then(res => {
        // this.setState({ ingredients: res.data })
        dispatch(setIngredients(res.data))
      })
      .catch(e => {
        // this.setState({ error: true })
        dispatch(fetchIngredientsFailed())
      })
  }
}