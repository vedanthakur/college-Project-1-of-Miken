import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
const ExploreMenu = ({ category, setCategory }) => {

  return (
    <div className='flex flex-col gap-5' id='explore-menu'>
      <h1 className='text-gray-700 text-2xl'>Explore Our menu</h1>
      <p className='max-w-80'>Choose from a diverse menu featuring a delectable array of dishes. Our aim is to serve healthy and tasty meals</p>
      <div className='flex justify-between items-center gap-[30px] text-center explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index}>
              <img
                src={item.menu_image}
                className={`sm:h-24 sm:w-24 md:h-32 md:w-32 w-44 h-44 rounded-full ${category === item.menu_name ? "active" : ""}`}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr className='mt-8 border-t-2 border-gray-200 w-full' />
    </div>
  )
}

export default ExploreMenu
