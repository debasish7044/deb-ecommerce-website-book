import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link, Redirect } from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {
  const { user, token } = isAuthenticated()

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    qty: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })

  const {
    name,
    description,
    price,
    category,
    shipping,
    qty,
    loading,
    error,
    categories,
    createdProduct,
    redirectToProfile,
    formData,
  } = values

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)

    setValues({ ...values, [name]: value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          category: '',
          shipping: '',
          qty: '',
          photo: '',
          loading: false,
          error: '',
          redirectToProfile: true,
          createdProduct: data.name,
        })
      }
    })
  }

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label htmlFor=''>Post A Product Photo</label>
        <input
          type='file'
          className='form-control p-1'
          name='photo'
          accept='image/*'
          onChange={handleChange('photo')}
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Product Name'
          value={name}
          onChange={handleChange('name')}
        />
      </div>
      <div className='form-group'>
        <textarea
          className='form-control'
          placeholder='Describe your product...'
          value={description}
          onChange={handleChange('description')}
        />
      </div>
      <div className='form-group'>
        <input
          type='number'
          className='form-control'
          placeholder='Product Price'
          value={price}
          onChange={handleChange('price')}
        />
      </div>
      <div className='form-group'>
        <select
          className='form-control'
          onChange={handleChange('category')}
          value={category}
        >
          <option>Choose Category...</option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              )
            })}
        </select>
      </div>

      <div className='form-group'>
        <input
          type='number'
          className='form-control'
          placeholder='Product quantity'
          value={qty}
          onChange={handleChange('qty')}
        />
      </div>
      <div className='form-group'>
        <select
          className='form-control'
          onChange={handleChange('shipping')}
          value={shipping}
        >
          <option>Choose Shipping...</option>
          <option value='0'>Yes</option>
          <option value='1'>No</option>
        </select>
      </div>
      <button className='btn btn-outline-primary mb-2'>Create Product</button>
    </form>
  )

  const redirectToHome = () => {
    if (redirectToProfile) {
      return <Redirect to='/' />
    }
  }

  const showSuccess = () => {
    return (
      <div
        className='alert alert-info'
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <h5>{createdProduct} product has been created</h5>
      </div>
    )
  }
  const showError = () => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        <h5>{error}</h5>
      </div>
    )
  }
  const showLoading = () => {
    return (
      loading && (
        <div className='alert alert-success'>
          <h2>Loading...</h2>
        </div>
      )
    )
  }

  const goBack = () => (
    <div className='mb-5'>
      <Link to='/admin/dashboard'>
        <div className='text-warning'>Go Back to Dashboard</div>
      </Link>
    </div>
  )

  return (
    <Layout
      title='Add a new Category'
      description={`Hi, ${user.name}  Ready to add a new Product`}
      className='container'
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
          {redirectToHome()}
        </div>
      </div>
    </Layout>
  )
}

export default AddProduct
