import * as actionTypes from './actions'

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {  
          ...state.ingredients,   // copy one more layer
          [action.ingredientName]: ++state.ingredients[action.ingredientName] 
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,   // copy one more layer
          [action.ingredientName]: --state.ingredients[action.ingredientName]
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    default:
      return state
  }
}

export default reducer
