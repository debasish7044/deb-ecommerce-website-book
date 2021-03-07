import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticated()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        return setError(true)
      } else {
        setError('')
        setSuccess(true)
      }
    })
  }

  const showSuccess = () => {
    if (success) {
      return <h5 className='text-success'>{name} category has been created</h5>
    }
  }
  const showError = () => {
    if (success) {
      return <h5 className='text-danger'>{error}</h5>
    }
  }

  const goBack = () => (
    <div style={{ marginTop: '1rem' }}>
      <Link to='/admin/dashboard'>
        <div className='text-warning'>Go Back to Dashboard</div>
      </Link>
    </div>
  )

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-primary'>Create Category</button>
    </form>
  )

  return (
    <>
      <Layout
        title='Add a new Category'
        description={`Hi, ${user.name}  Ready to add a new Category`}
        className='container'
      >
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            {' '}
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AddCategory
