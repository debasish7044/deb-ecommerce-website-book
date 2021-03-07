import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/index'
import { getBrainTreeClientToken, processPayment, createOrder } from './apiCore'
import { emptyCard, itemTotal } from './cartHelpers'
import { Link } from 'react-router-dom'
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'

const CheckOut = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    loading: false,
  })

  const { address } = data

  // const { clientToken, success, error, instance } = data
  // console.log(clientToken, success, error, instance)

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBrainTreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
        setData({ ...data, error: data.error })
      } else {
        console.log(data)
        setData({ clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    itemTotal()
    setData({ clientToken: data.clientToken })
    getTotal()
    getToken(userId, token)
  }, [products])

  const handleAddress = (event) => {
    return setData({ ...data, address: event.target.value })
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const showCheckOutButton = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin' className='btn btn-outline-primary mt-3 '>
        Not Registered ? sign in
      </Link>
    )
  }

  const buy = () => {
    setData({ loading: true })

    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(),
        }

        processPayment(userId, token, paymentData)
          .then((response) => {
            const createOrderData = {
              products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: address,
            }
            createOrder(userId, token, createOrderData)
            setData({
              ...data,
              success: response.success,
              loading: false,
              clientToken: null,
              address: '',
            })
            emptyCard(() => {
              console.log('cart is empty')
            })
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log('error: ', error)
        setData({ ...data, error: error.message, loading: false })
      })
  }

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='form-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-success btn-block'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  )

  const showError = (error) => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    )
  }

  const showSuccess = (success) => {
    return (
      <div
        className='alert alert-success'
        style={{ display: success ? '' : 'none' }}
      >
        <div>Thank You .. Your payment has been success</div>
      </div>
    )
  }

  const showLoading = (loading) => {
    loading && (
      <div class='spinner-border text-info' role='status'>
        <span class='sr-only'>Loading...</span>
      </div>
    )
  }

  return (
    <div>
      <h5>
        Total: <i className='fas fa-rupee-sign mr-1'></i>
        {getTotal()}
      </h5>
      {showSuccess(data.success)}
      {showLoading(data.loading)}
      {showError(data.error)}
      {showCheckOutButton()}
    </div>
  )
}

export default CheckOut
