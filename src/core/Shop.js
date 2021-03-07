import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import { prices } from './fixedPrices'
import RadioBox from './RadioBox'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState([])
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])
  console.log(filteredResults)

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  const loadFilteredResult = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }
  const loadMore = (newFilters) => {
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMore}
          className='btn btn-warning mb-5 mt-3 text-center'
        >
          Load More
        </button>
      )
    )
  }

  useEffect(() => {
    loadFilteredResult()
    init()
  }, [])

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    loadFilteredResult(myFilters.filters)
    setMyFilters(newFilters)
  }

  // const errorMessage = () => {
  //   return (

  //     <div className='alert alert-danger' style={{ error ? '' : 'd-none'}}>
  //         <div>{error}</div>
  //       </div>

  //   )
  // }

  return (
    <Layout
      title='Shop Page'
      description='Search and find books for you'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3 col-sm-12 '>
          <h5>Filter by Category</h5>
          {/* {errorMessage()} */}
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>
          <h5>Filter by Price</h5>
          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, 'price')}
          />
        </div>
        <div className='col-md-9 col-sm-12 mt-md-0 mt-4'>
          <div className='row'>
            {filteredResults &&
              filteredResults.map((product, index) => (
                <div className='col-sm-12 col-md-4' key={index}>
                  <Card product={product} />
                </div>
              ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  )
}

export default Shop
