import React, { useState, useEffect } from 'react'
import { getCategories } from './apiCore'
import Card from './Card'
import { list } from './apiCore'

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  })

  const { categories, category, search, results, searched } = data

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    getCategories().then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error)
          } else {
            setData({
              ...response,
              results: response,
              searched: true,
            })
          }
        }
      )
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    loadCategories()
    searchData()
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false })
  }

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit} className='mb-5'>
        <span className='input-group-text'>
          <div className='input-group-prepend'>
            <select
              onChange={handleChange('category')}
              className='btn mr-2 form-control'
            >
              <option> Category...</option>
              {categories &&
                categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <input
            onChange={handleChange('search')}
            type='search'
            className='form-control'
            placeholder='Search'
          />

          <button type='submit' className='btn btn-primary ml-2'>
            <i className='fas fa-search'></i>
          </button>
        </span>
      </form>
    )
  }

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return (
        <div className='alert alert-primary' role='alert'>
          {`Matched ${results.length} found`}
        </div>
      )
    }
    if (searched && results.length === 0) {
      return (
        <div className='alert alert-warning' role='alert'>
          No result found
        </div>
      )
    }
  }

  return (
    <>
      {searchForm()}
      {searchMessage(searched, results)}
      <div className='row'>
        {results &&
          results.map((product, index) => {
            return (
              <div className='col-sm-12 col-md-4' key={index}>
                <Card product={product} />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Search
