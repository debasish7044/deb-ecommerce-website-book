import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

const Product = ({ match }) => {
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false)

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        console.log(error)
      } else {
        setProduct(data)
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProducts(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = match.params.productId
    loadSingleProduct(productId)
  }, [match])

  return (
    <Layout
      title={product.name}
      description={`${
        product && product.description && product.description.substring(0, 80)
      }...`}
      className='container-fluid'
    >
      <div className='row'>
        {product && product.description && (
          <div className='col-sm-12 col-md-8'>
            <Card
              key={product._id}
              item={product}
              url='product'
              product={product}
              showViewProductButton={false}
            />
          </div>
        )}

        {relatedProducts &&
          relatedProducts.map((product, index) => (
            <div className='col-sm-12 col-md-4' key={product._id}>
              <h4>Related Products</h4>
              <Card product={product} />
            </div>
          ))}
      </div>
    </Layout>
  )
}

export default Product
