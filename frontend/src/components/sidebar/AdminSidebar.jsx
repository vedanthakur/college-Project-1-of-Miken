import React from 'react'
import './AdminSidebar.css'
import { assets } from '../../assets/adminAssets/assets'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/admin/foods/create'  className="sidebar-option">
          <img src={assets.add_icon} alt=""  />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/admin/foods' className="sidebar-option">
          <img src={assets.order_icon} alt=""  />
          <p>List Items</p>
      </NavLink>
      
        <NavLink to='/admin/orders' className="sidebar-option">
          <img src={assets.add_icon} alt=""  />
          <p>Orders</p>
          </NavLink>
    </div>
    </div>
  )
}

export default AdminSidebar
