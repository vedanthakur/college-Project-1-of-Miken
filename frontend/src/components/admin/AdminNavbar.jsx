import React from 'react'
import { assets } from '../../assets/admin_assets/assets'

const AdminNavbar = () => {
  return (
    <div className=' flex justify-between items-center p-2'>
      <h1 className='text-3xl font-bold'>Khaja Sathi</h1>
      <img className='' src={assets.profile_image} alt="" />
    </div>
  )
}

export default AdminNavbar
