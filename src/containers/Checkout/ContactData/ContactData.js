import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
            value: 'fastest',
            displayValue: 'Fastest'
            },
            {
            value: 'cheapest',
            displayValue: 'Cheapest'
            }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true // dummy one
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()
    // console.log(this.props.ingredients)

    this.setState({ loading: true })

    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      // formData.push({
      //   name: formElementIdentifier,
      //   value: this.state.orderForm[formElementIdentifier].value
      // })
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  checkValidatity = (value, rules) => {
    let isValid = true
    if (!rules) {  // Redundent double security 
      return true
    }
    
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid
    }
    
    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value)
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidatity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement
    // console.log(updatedFormElement)

    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid })
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = <form onSubmit={this.orderHandler}>
      {formElementsArray.map(formElement => (
        <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig ={formElement.config.elementConfig} 
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          // valueType={formElement.config.elementConfig.type}
          errorMessage={`Please enter a valid ${formElement.config.elementConfig.type}!`}
          changed={(event) => this.inputChangedHandler(event, formElement.id)} />
      ))}
      <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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