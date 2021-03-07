import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ProductImage from './ProductImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCardButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const showViewButton = () => {
    return (
      showViewProductButton && (
        <Link
          to={`/product/${product._id}`}
          className='btn btn-outline-primary mt-3 mr-2'
        >
          View Product
        </Link>
      )
    )
  }

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value)

    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showAddToCart = (showAddToCardButton) => {
    return (
      showAddToCardButton && (
        <Link
          to='/'
          onClick={addToCart}
          className='btn btn-outline-warning mt-3 '
        >
          Add to Card
        </Link>
      )
    )
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-pill badge-info p-2 mt-2'>In Stock</span>
    ) : (
      <span className={'badge badge-pill badge-warning p-2'}>Out of Stock</span>
    )
  }

  const showCardUpdate = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='input-group mb-3 mt-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Adjust Quantity</span>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    )
  }

  const showRemoveProduct = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Link
          to='/'
          onClick={() => removeItem(product._id)}
          className='btn btn-outline-danger mt-3 '
        >
          remove Product
        </Link>
      )
    )
  }

  return (
    <div className='card mb-5'>
      <div className='card-header name' style={{ fontSize: '1.2rem' }}>
        {product.name && product.name.substring(0, 17)}..
      </div>
      <ProductImage item={product} url='product' className='card-image-top' />
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <p>{!showViewProductButton && product.description}</p>
        {showViewProductButton && <p>{product.description}..</p>}
        <div className='p-1 black-10'>
          <i className='fas fa-rupee-sign mr-1'></i>
          {product.price}
        </div>
        <div className='p-1 black-9'>
          Category:{' '}
          {product.category.name && product.category.name.substring(0, 10)}
        </div>
        <div className='p-1 black-8'>
          Added on {moment(product.createdAt).fromNow()}
        </div>
        {showStock(product.qty)}
        <br />
        {showViewButton()}
        {showRemoveProduct(showRemoveProductButton)}
        {showAddToCart(showAddToCardButton)}
        {showCardUpdate(cartUpdate)}
      </div>
    </div>
  )
}

export default Card
