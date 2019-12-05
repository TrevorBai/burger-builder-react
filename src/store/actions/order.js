import * as actionTypes from './actionTypes'
import Axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const puchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    Axios.post('/orders.json', orderData)
      .then(res => {
        // this.setState({ loading: false })
        // console.log(res.data.name)  // check if id is in it?
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(e => {
        // this.setState({ loading: false })
        dispatch(puchaseBurgerFail(e))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    Axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = []
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        // this.setState({ loading: false, orders: fetchedOrders })
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(e => {
        dispatch(fetchOrdersFail(e))
        // this.setState({ loading: false })
      })
  }
}