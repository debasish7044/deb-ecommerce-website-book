import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'

const adminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className='card bg-light '>
        <div className='card-header'>Admin Links</div>
        <div className='card-body p-2'>
          <ul className='list-group'>
            <li className='list-group-item'>
              <Link className='nav-link' to='/create/category'>
                {' '}
                Create Category{' '}
              </Link>
            </li>
            <li className='list-group-item'>
              <Link className='nav-link' to='/create/product'>
                {' '}
                Create Product{' '}
              </Link>
            </li>
            <li className='list-group-item'>
              <Link className='nav-link' to='/admin/orders'>
                {' '}
                View Orders{' '}
              </Link>
            </li>
            <li className='list-group-item'>
              <Link className='nav-link' to='/admin/products'>
                {' '}
                Manage Products{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className='card bg-light mb-3'>
        <div className='card-header'>Admin Information</div>
        <div className='card-body'>
          <ul className='list-group'>
            <li className='list-group-item'>{name}</li>
            <li className='list-group-item'>{email}</li>
            <li className='list-group-item'>
              {role ? 'Admin' : 'Registered User'}
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Layout
        title='Dashboard'
        description={`Welcome ${name}`}
        className='container'
      >
        <div className='row'>
          <div className='col-md-3 col-sm-12'>{adminLinks()}</div>
          <div className='col-md-9 col-sm-12 mt-4 mt-md-0'>{adminInfo()}</div>
        </div>
      </Layout>
    </div>
  )
}

export default adminDashBoard
