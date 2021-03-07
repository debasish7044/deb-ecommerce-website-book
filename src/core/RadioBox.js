import React, { useState, Fragment } from 'react'

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setValue(event.target.value)
  }

  return (
    <Fragment>
      {prices.map((price, index) => (
        <div key={index}>
          <input
            type='radio'
            className='ml-2'
            onChange={handleChange}
            value={`${price._id}`}
            name={price}
          />
          <label className='form-check-label ml-2'>{price.name}</label>
        </div>
      ))}
    </Fragment>
  )
}

export default RadioBox
