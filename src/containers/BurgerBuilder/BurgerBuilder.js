import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'

const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false)

  const dispatch = useDispatch()

  const ings = useSelector(state => state.burgerBuilder.ingredients)
  const price = useSelector(state => state.burgerBuilder.totalPrice)
  const error = useSelector(state => state.burgerBuilder.error)
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  const onAddedIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName))
  const onRemovedIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName))
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])  // kill re-render
  const onPurchaseInit = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, cur) => acc + cur, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onPurchaseInit()
    props.history.push('/checkout')
  }

  const disabledInfo = { ...ings }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />
  if (ings) {
    burger =
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onAddedIngredient}
          ingredientRemoved={onRemovedIngredient}
          disabled={disabledInfo}
          purchasable={updatePurchasableState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price} />
      </Aux>
    orderSummary = <OrderSummary
      ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} />
  }

  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler} >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  )
}

export default WithErrorHandler(BurgerBuilder, Axios)