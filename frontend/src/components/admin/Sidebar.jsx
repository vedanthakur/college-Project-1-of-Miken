import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="h-full p-4 bg-cyan-50 text-white">
      <div className="space-y-4">
        <NavLink to={"/admin/add"} className="flex  bg-slate-500 items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <img src={assets.add_icon} alt="" className="w-6 h-6" />
          <p className="text-sm">Add Items</p>
        </NavLink>
        <NavLink to={"/admin/list"} className="flex  bg-slate-500 items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <img src={assets.order_icon} alt="" className="w-6 h-6" />
          <p className="text-sm">List Items</p>
        </NavLink>
        <NavLink to={"/admin/orders"} className="flex  bg-slate-500 items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <img src={assets.order_icon} alt="" className="w-6 h-6" />
          <p className="text-sm">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
