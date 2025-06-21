import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';

const Payment = () => {
      const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div>
        <div>
            <h1 className=''>Totle ammount 
                :{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</h1>
        </div>
      <div>
        <button className='text-white bg-blue-900 text-2xl hover:bg-gray-500'>Pay via esewa</button>
      </div>
      <div>
        <button className=' bg-blue-700 text-2xl mt-7'>Pay via Khalti</button>
      </div>
    </div>
  )
}

export default Payment
