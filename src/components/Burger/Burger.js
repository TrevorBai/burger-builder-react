import React from 'react'
// import { withRouter } from 'react-router-dom'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = props => {

  let transformedIngredients = Object.keys(props.ingredients)
    .map(
      ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, index) => 
          <BurgerIngredient key={ingredient + index} type={ingredient} />
        )
      }
    )
    .reduce((acc, cur) => acc.concat(cur), [])  // props.ingredients could be empty array, so [] is necessary
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

// export default withRouter(Burger)
export default Burger