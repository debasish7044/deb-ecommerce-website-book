import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = (c) => () => {
    // return category id index index or -1
    const currentCategoryId = checked.indexOf(c)
    const newCheckedCategoryId = [...checked]

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }

    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return categories.map((category, index) => (
    <div
      key={index}
      onChange={handleToggle(category._id)}
      value={checked.indexOf(category._id === -1)}
      className='list-styled'
    >
      <input type='checkbox' className='form-check-input' />
      <label className='form-check-label'>{category.name}</label>
    </div>
  ))
}

export default Checkbox
