import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(ing => 
      <li key={ing}>
        <span style={{textTransform: 'capitalize'}}>{ing}</span>: {props.ingredients[ing]}
      </li>
    )

  return (
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
      <Button 
        btnType="Danger" 
        clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button 
        btnType="Success" 
        clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )

}

export default OrderSummary