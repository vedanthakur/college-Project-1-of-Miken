import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import SideBar from '../../components/admin/Sidebar'

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <div className="w-64 ">
        <SideBar />
      
      </div>
    </div>
  )
}

export default AdminDashboard
