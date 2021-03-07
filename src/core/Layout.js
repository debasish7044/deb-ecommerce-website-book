import React from 'react'
import Menu from './Menu'
import '../style.css'

const Layout = ({
  title = 'Title',
  description = 'Description',
  children,
  className,
}) => {
  return (
    <div className='pb-3'>
      <Menu />
      <div className='jumbotron' style={{ height: '10%' }}>
        <h2>{title}</h2>
        <div className='lead'>{description}</div>
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}

export default Layout
