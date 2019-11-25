import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log('[OrderSummary.js] did update!')
  // }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(ing => 
        <li key={ing}>
          <span style={{textTransform: 'capitalize'}}>{ing}</span>: {this.props.ingredients[ing]}
        </li>
      )
  
    return (
      <Aux>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>
            {ingredientsSummary}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout?</p>
        <Button 
          btnType="Danger" 
          clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button 
          btnType="Success" 
          clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary