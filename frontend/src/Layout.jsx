import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function Layout() {
  return (
    <>
        <Header />
        <div className='pt-20'>
          <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Layout
