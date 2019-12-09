import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,   // potential local UI state
  }

  componentDidMount = () => {
    this.props.onInitIngredients()
  }

  updatePurchasableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, cur) => acc + cur, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.props.ings) {
      burger =
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddedIngredient}
            ingredientRemoved={this.props.onRemovedIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchasableState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.price} />
        </Aux>
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddedIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onRemovedIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, Axios))