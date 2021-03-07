import React from 'react'
import { API } from '../config'

const ProductImage = ({ item, url, className }) => {
  return (
    <div className='product-image p-4'>
      <img
        className={className}
        src={`${API}/${url}/photo/${item._id}`}
        alt={`${item.name}`}
      />
    </div>
  )
}

export default ProductImage
