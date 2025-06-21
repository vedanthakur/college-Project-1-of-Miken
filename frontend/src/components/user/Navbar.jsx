import React, { useContext, useState } from 'react'
import {assets} from '../../assets/frontend_assets/assets.js'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
const Navbar = ({setShowLogin}) => {
 const [menu,setMenu]=useState("home")
 const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <div className=" navbar flex items-center justify-between px-10 py-6 bg-white shadow-md">
        <Link to={"/home"}>
      <h1 className="text-2xl font-bold text-gray-800">KhajaSathi</h1>
      </Link>
      <ul className="flex space-x-6 text-gray-700 font-medium cursor-pointer">
        <Link  to={"/home"} onClick={()=>setMenu("home")} className={menu==="home"?"active":""} >Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")}  className={menu==="menu"?"active":""}>Menu</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
      </ul>
      <div className="flex items-center space-x-4">
        {/* <img src={assets.search_icon} alt="Search" className="w-6 h-6 cursor-pointer" /> */}
        <div>My orders</div>
        <div className="relative">
          <Link to={"/cart"}>
          <img src={assets.basket_icon} alt="Basket" className="w-6 h-6 cursor-pointer" />
          </Link>
          <div className={`${getTotalCartAmount() ? "absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" : ""}`}></div>

        </div>
        <button onClick={()=>setShowLogin(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Sign in/up
        </button>
      </div>
    </div>
  )
}


export default Navbar
