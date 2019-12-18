import React from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

// with CamelCase, React assumes it not to be a component, hence not breaking linting rules (call Hooks in a callback)
const withErrorHandler = (WrappedComponent, Axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(Axios)
    
    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={clearError} >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
  }
}

export default withErrorHandler