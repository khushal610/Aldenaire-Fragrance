import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Forms/Login.jsx'
import About from './components/About/About.jsx'
import ShopProducts from './components/Shop/ShopProducts.jsx'
import Registration from './components/Forms/Registration.jsx'
import Admin from './components/Admin/Admin.jsx'
import Products from './components/Admin/Products.jsx'
import Order from './components/Admin/Order.jsx'
import UserInfo from './components/Admin/UserInfo.jsx'
import Feedback from './components/Admin/Feedback.jsx'
import ForgotPassword from './components/Forms/ForgotPassword.jsx'
import UserProfile from './components/User/UserProfile.jsx'
import Cart from './components/Shop/Cart.jsx'
import Contact from './components/Contact/Contact.jsx'
import OrderForm from './components/Forms/OrderForm.jsx'
import Contact_query from './components/Admin/Contact_query.jsx'
import ProfileDetails from './components/User/ProfileDetails.jsx'
import UserOrders from './components/User/UserOrders.jsx'
import UserFeedback from './components/User/UserFeedback.jsx'
import Manage_products from './components/Admin/Manage_products.jsx'
import FeedbackFormUI from './components/Forms/FeedbackFormUI.jsx'
import SellReport from './components/Admin/SellReport.jsx'
import AddAdmin from './components/Admin/AddAdmin.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='/about' element={<About />} />
      <Route path='/shop-products' element={<ShopProducts />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/profile' element={<UserProfile />} >
        <Route index element={<Navigate to="/profile/details" />} />
        <Route path='/profile/details' element={<ProfileDetails />} />
        <Route path='/profile/orders' element={<UserOrders />} />
        <Route path='/profile/feedback' element={<UserFeedback />} />
      </Route>
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/order-form' element={<OrderForm />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/feedback' element={<FeedbackFormUI />} />
      <Route path='/admin' element={<Admin />} >
          <Route index element={<Navigate to={"/admin/product"} />} />
          <Route path='/admin/product' element={<Products />} />
          <Route path='/admin/manage-products' element={<Manage_products />} />
          <Route path='/admin/orders' element={<Order />} />
          <Route path='/admin/users' element={<UserInfo />} />
          <Route path='/admin/feedback' element={<Feedback />} />
          <Route path='/admin/contact-query' element={<Contact_query />} />
          <Route path='/admin/sell-report' element={<SellReport />} />
          <Route path='/admin/add-new-admin' element={<AddAdmin />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>    
    <RouterProvider router={router}/>
  // </React.StrictMode>,
)
