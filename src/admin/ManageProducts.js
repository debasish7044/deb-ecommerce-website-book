import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'

const ManageProducts = () => {
  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }
  const destroyProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Layout
      title='Manage Your Products'
      description={`You have total ${products.length} product`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-sm-12 col-md-10 offset-md-1'>
          <div>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'>
                    No
                  </th>
                  <th scope='col' className='text-center'>
                    Product Name
                  </th>
                  <th scope='col' className='text-center'></th>
                </tr>
              </thead>
              {products.map((product, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <th className='text-center' scope='row'>
                        {index + 1}
                      </th>
                      <td className='text-center' style={{ width: '50%' }}>
                        {product.name}
                      </td>
                      <td>
                        <div className='text-center'>
                          <Link
                            to={`/admin/product/update/${product._id}`}
                            type='button'
                            className='btn btn-success'
                          >
                            <i className='fas fa-edit'></i>
                          </Link>
                          <button
                            type='button'
                            className='btn btn-danger'
                            onClick={() => destroyProduct(product._id)}
                          >
                            <i className='far fa-trash-alt'></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ManageProducts
