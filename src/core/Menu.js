import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/index'
import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#fff' }
  }
}

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs d-flex  d-block d-sm-flex justify-content-md-start justify-content-center bg-info align-items-center p-2 '>
        <li className='nav-item'>
          <Link className='nav-link' to='/' style={isActive(history, '/')}>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            to='/shop'
            style={isActive(history, '/shop')}
          >
            Shop
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            to='/cart'
            style={isActive(history, '/cart')}
          >
            Cart{' '}
            <sup>
              {' '}
              <small className='cart-badge p-1'>{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/user/dashboard'
              style={isActive(history, '/user/dashboard')}
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/admin/dashboard'
              style={isActive(history, '/admin/dashboard')}
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() ? (
          <>
            <li className='nav-item'>
              <span
                className='nav-link'
                style={{ cursor: 'pointer', color: '#fff' }}
                onClick={() =>
                  signout(() => {
                    history.push('/signin')
                  })
                }
              >
                Sign Out
              </span>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/signin'
                style={isActive(history, '/signin')}
              >
                Sign In
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/signup'
                style={isActive(history, '/signup')}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default withRouter(Menu)
