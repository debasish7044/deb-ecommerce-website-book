import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import UserDashBoard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashboard'
import Profile from './user/Profile'
import PrivateRoute from './auth/privateRoute'
import AdminRoute from './auth/adminRoute'
import Orders from './admin/Orders'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import ManageProducts from './admin/ManageProducts'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <PrivateRoute path='/user/dashboard' exact component={UserDashBoard} />
        <PrivateRoute path='/profile/:userId' exact component={Profile} />
        <PrivateRoute path='/admin/products' exact component={ManageProducts} />
        <PrivateRoute
          path='/admin/product/update/:productId'
          exact
          component={UpdateProduct}
        />
        <AdminRoute path='/admin/orders' exact component={Orders} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
        <Route path='/product/:productId' exact component={Product} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
