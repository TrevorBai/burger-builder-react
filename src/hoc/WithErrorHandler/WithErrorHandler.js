import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const WithErrorHandler = (WrappedComponent, Axios) => {
  return class extends Component {  // just return an anonymous class
    constructor(props) {
      super(props)

      this.reqInterceptor = Axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })

      this.resInterceptor = Axios.interceptors.response.use(res => res, error => {
        this.setState({ error })
      })

      this.state = {
        error: null
      }
    }

    // // componentWillMount is executed before its children components are loaded
    // UNSAFE_componentWillMount = () => {
    //   this.reqInterceptor = Axios.interceptors.request.use(req => {
    //     this.setState({ error: null })
    //     return req
    //   })

    //   this.resInterceptor = Axios.interceptors.response.use(res => res, error => {
    //     this.setState({ error })
    //   })
    // }

    componentWillUnmount = () => {
      // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor)
      Axios.interceptors.request.eject(this.reqInterceptor)
      Axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler} >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default WithErrorHandler