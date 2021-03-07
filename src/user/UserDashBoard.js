import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import moment from 'moment'

const UserDashBoard = () => {
  const [history, setHistory] = useState([])

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  const {
    user: { _id, name, email, role },
  } = isAuthenticated()
  const token = isAuthenticated().token

  useEffect(() => {
    init(_id, token)
  }, [])

  const userLinks = () => {
    return (
      <div className='card bg-light mb-3'>
        <div className='card-header'>User Links</div>
        <div className='card-body'>
          <ul className='list-group'>
            <li className='list-group-item'>
              <Link className='nav-link' to='/cart'>
                {' '}
                My Cart{' '}
              </Link>
            </li>
            <li className='list-group-item'>
              <Link className='nav-link' to={`/profile/${_id}`}>
                {' '}
                Update Profile{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className='card bg-light mb-3'>
        <div className='card-header'>User Information</div>
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

  const purchasedHistory = () => {
    return (
      <div className='card bg-light mb-3'>
        <div className='card-header'>Purchase History</div>
        <div className='card-body'>
          <ul className='list-group'>
            <li className='list-group-item'>
              {history.map((h, index) => (
                <ul className='list-group'>
                  <li className='list-group-item mb-2'>
                    {h.products.map((p, index) => (
                      <div key={index}>
                        <div>Product Name: {p.name}</div>
                        <div>Product Pice: {p.price}</div>
                        <div>Product Pice: {moment(p.createdAt).fromNow()}</div>
                      </div>
                    ))}
                  </li>
                </ul>
              ))}
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
          <div className='col-md-3 col-sm-12'> {userLinks()} </div>
          <div className='col-md-9 col-sm-12'>
            {userInfo()}
            {purchasedHistory()}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default UserDashBoard
