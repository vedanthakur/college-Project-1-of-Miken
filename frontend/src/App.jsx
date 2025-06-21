
import React, { useState } from 'react'
import {  Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/user/Home'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './components/admin/AdminLogin'
import RiderLogin from './components/rider/RiderLogin'
import RiderDashboard from './pages/rider/RiderDashboard'
import Navbar from './components/user/Navbar'
import AdminNavbar from './components/admin/AdminNavbar'
import RiderNavbar from './components/rider/RiderNavbar'
import Cart from './pages/user/Cart'
import PlaceOrder from './pages/user/PlaceOrder'
import Footer from './components/user/Footer'
import LoginPopup from './components/user/LoginPopup'
import Payment from './pages/user/Payment'
import Add from './components/admin/Add'
import List from './components/admin/List'
import Orders from './components/admin/Orders'
import { ToastContainer} from 'react-toastify';
import LandingPage from './pages/user/LandingPage'
const AppLayout = () => {
  const location = useLocation()
  const [showLogin, setShowLogin] = useState(false)
  const [setShowLoginRider,setSetShowLoginRider]=useState(false)
const url = "http://localhost:4000"
  const renderNavbar = () => {
  if (
    location.pathname === '/' || 
    location.pathname === '/admin/login' || 
    location.pathname === '/rider/login'
  ) {
    return null;
  } else if (location.pathname.startsWith('/admin')) {
    return <AdminNavbar />;
  } else if (location.pathname.startsWith('/rider')) {
    return <RiderNavbar setSetShowLoginRider={setSetShowLoginRider} />;
  } else {
    return <Navbar setShowLogin={setShowLogin} />;
  }
};

  const showFooter = !location.pathname.startsWith('/admin') &&
                   !location.pathname.startsWith('/rider') &&
                   location.pathname !== '/';


  return (
    <div>
      <ToastContainer/>
      
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {renderNavbar()}
      
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/add' element={<Add/>} url={url} />
        <Route path='/admin/list' element={<List/>}  url={url}/>
        <Route path='/admin/orders' element={<Orders/>} url={url} />
        <Route path='/rider' element={<RiderDashboard />} />
        <Route path='/rider/login' element={<RiderLogin />} />
        <Route path='/payment' element={<Payment/>}/>
      </Routes>
      {showFooter && <Footer />}
      
    </div>
  )
}

const App = () => {
  return (<AppLayout />)
}

export default App
