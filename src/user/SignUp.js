import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
import { signup } from '../auth/index'

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
    error: '',
  })

  const { name, email, password, success, error } = values
  console.log(error)

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    setValues({ error: false })
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        let err = data.error
        err = err.replace(
          '11000 duplicate key error collection: myFirstDatabase.users index:',
          ''
        )
        setValues({ ...values, error: err, success: false })
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          success: true,
          error: '',
        })
      }
    })
  }

  const signUpForm = () => (
    <form action=''>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('name')}
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          onChange={handleChange('email')}
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        Already Registered ? go to <Link to='signin'> sign in</Link>
      </div>
      <button onClick={clickSubmit} className='button btn btn-primary'>
        Submit
      </button>
    </form>
  )

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Your account has been created Please <Link to='signin'> sign in</Link>
    </div>
  )

  return (
    <Layout
      title='Sign Up'
      description='Sign Up React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {' '}
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  )
}

export default SignUp
