import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { getCart } from './cartHelpers'
import Card from './Card'
import CheckOut from './CheckOut'

const Cart = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getCart())
  }, [])

  const showItems = (items) => {
    return (
      <div>
        <h3>Your cart has {items.length} items</h3>
        <hr />
        {items.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              showAddToCardButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
            />
          )
        })}
      </div>
    )
  }

  const noCartItemsMessage = () => {
    return (
      <div className='alert alert-warning' role='alert'>
        No cart item found. Continue <Link to='/shop'>shopping</Link>
      </div>
    )
  }

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout and continue shopping'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          {items.length > 0 ? showItems(items) : noCartItemsMessage()}
        </div>
        <div className='col-sm-12 col-md-6'>
          <h3> Your Cart Summary </h3>
          <hr />
          <CheckOut products={items} />
        </div>
      </div>
    </Layout>
  )
}

export default Cart
