import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const productBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error)
        setLoading(false)
      } else {
        setProductsBySell(data)
        setLoading(false)
      }
    })
  }
  const productByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error)
        setLoading(false)
      } else {
        setProductsByArrival(data)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    productBySell()
    productByArrival()
  }, [])

  const errorMessage = () => {
    return (
      error && (
        <div className='alert alert-danger'>
          <div>Products are load to failed</div>
        </div>
      )
    )
  }

  const showLoading = () => {
    return (
      loading && (
        <div className='spinner-border text-info'>
          <span className='sr-only'>Loading...</span>
        </div>
      )
    )
  }

  return (
    <Layout
      title='HomePage'
      description='Node React E-commerce App'
      className='container-fluid'
    >
      <Search />
      <h2 className='mb-4'>New Arrivals</h2>
      {errorMessage()}
      {showLoading()}
      <div className='row'>
        {productsByArrival.map((product, index) => {
          return (
            <div className='col-sm-12 col-md-4' key={index}>
              <Card item={product} url='product' product={product} />
            </div>
          )
        })}
      </div>
      <hr />
      <h2 className='mb-4'>Best Seller</h2>
      {showLoading()}
      <div className='row'>
        {productsBySell.map((product, index) => {
          return (
            <div className='col-sm-12 col-md-4' key={index}>
              <Card item={product} url='product' product={product} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Home
