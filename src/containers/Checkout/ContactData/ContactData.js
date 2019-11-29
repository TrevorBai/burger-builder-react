import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()
    // console.log(this.props.ingredients)

    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Trevor Bai',
        address: {
          street: '30 Mohawk Rd. E',
          zipCode: '2kci1l',
          country: 'Canada'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    Axios.post('/orders.json', order)
      .then(res => {
        this.setState({
          loading: false
        })
        this.props.history.push('/')  
      })
      .catch(e => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    let form = <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"></input>
        <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData