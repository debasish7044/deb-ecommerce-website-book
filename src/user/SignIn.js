import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Link, Redirect } from 'react-router-dom'
import { signin } from '../auth/index'
import { authenticate, isAuthenticated } from '../auth/index'

const SignIn = () => {
  const { user } = isAuthenticated()

  const [values, setValues] = useState({
    email: 'debasishd989@gmail.com',
    password: '123456',
    loading: false,
    error: false,
    redirectToReferer: false,
  })

  const { email, password, loading, error, redirectToReferer } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()

    setValues({ error: false, loading: true })

    signin({ email, password }).then((data) => {
      if (data.error) {
        let err = data.error
        err = err.replace(
          '11000 duplicate key error collection: myFirstDatabase.users index:',
          ''
        )
        setValues({
          ...values,
          error: err,
          loading: false,
          redirectToReferer: false,
        })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferer: true,
          })
        })
      }
    })
  }

  const signInForm = () => (
    <form action=''>
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
        Don't have and account yet ? go to <Link to='signup'> sign up</Link>
      </div>
      <button onClick={clickSubmit} className='button btn btn-primary '>
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
  const showLoading = () =>
    loading && (
      <div className='alert-info'>
        <h2>Loading...</h2>
      </div>
    )

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />
      } else {
        return <Redirect to='/user/dashboard' />
      }
    }
  }

  if (user && user.role === 0) {
    return <Redirect to='/user/dashboard' />
  }

  return (
    <Layout
      title='Sign Up'
      description='Sign Up React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {' '}
      {showError()}
      {showLoading()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  )
}

export default SignIn
