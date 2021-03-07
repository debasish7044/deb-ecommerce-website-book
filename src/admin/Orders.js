import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin'
// import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [statusValues, setStatusValues] = useState([])

  const { user, token } = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOrders(data)
      }
    })
  }
  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setStatusValues(data)
      }
    })
  }

  const handleStatusChange = (e, orderId) => {
    e.preventDefault()
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('status update failed')
      } else {
        loadOrders()
      }
    })
  }

  useEffect(() => {
    loadOrders()
    loadStatusValues()
  }, [orders])

  const showStatus = (order) => {
    return (
      <div className='form-group'>
        <div className='mark mb-4'>Status: {order.status}</div>
        <select
          className='form-control'
          onChange={(e) => handleStatusChange(e, order._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const showOrderMessage = (orders) => {
    return orders.length === 0 ? (
      <div className='alert alert-warning'>
        <div>No Order is there</div>
      </div>
    ) : (
      <div className='alert alert-info'>
        <div>Orders {orders.length} is Found</div>
      </div>
    )
  }

  return (
    <Layout
      title='Order list'
      description='Manage your order items'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-sm-12 col-md-8 offset-md-2'>
          {showOrderMessage(orders)}
          {orders.map((order, index) => {
            return (
              <div className='mt-5' key={index}>
                <ul className='list-group'>
                  <li className='list-group-item bg-light p-2'>
                    Order Id: {order._id}
                  </li>
                  <li className='list-group-item'>{showStatus(order)}</li>
                  <li className='list-group-item'>
                    <strong>Address</strong>:{order.address}
                  </li>
                  <li className='list-group-item'>
                    <strong>Amount</strong>:{order.amount}
                  </li>
                  <li className='list-group-item'>
                    {' '}
                    <strong>Order By</strong>:{order.user.name}
                  </li>
                  <li className='list-group-item'>
                    <strong>Order On</strong>:{order.user.name}
                  </li>
                  <li className='list-group-item'>
                    <strong>Total Products</strong>:{order.products.length}
                  </li>
                </ul>

                {order.products.map((product, index) => {
                  return (
                    <ul className='list-group mt-2' key={index}>
                      <li className='list-group-item bg-light p-2'>
                        Product Id: {product._id}
                      </li>

                      <li className='list-group-item'>
                        <strong>Product Name</strong>:{product.name}
                      </li>

                      <li className='list-group-item'>
                        <strong>Product Price</strong>:{product.price}
                      </li>
                      <li className='list-group-item'>
                        <strong>Product Total</strong>:{product.count}
                      </li>
                    </ul>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Orders
