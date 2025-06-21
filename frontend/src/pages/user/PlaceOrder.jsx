import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <form className="flex flex-col lg:flex-row items-start justify-between gap-10 mt-10 px-4">
      <div className="w-full lg:w-1/2">
        <p className="text-2xl font-semibold mb-10">Delivery Information</p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input type="text" placeholder="First name" required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="Last name" required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <input type="email" placeholder="Your email" required className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="text" placeholder="Your street" required className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input type="text" placeholder="Your city" value={"Kathmadnu"} required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="Your state" value={"Bagmati"} required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input type="text" placeholder="Zip code" value={44600} required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="Your country" value="Nepal" readOnly className="w-full md:w-1/2 px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed" />
        </div>
        <input type="tel" placeholder="Your phone" required className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>

      <div className="mt-8 flex flex-col lg:flex-row justify-between gap-6 max-w-6xl mx-auto w-full lg:w-1/2">
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-xl font-bold mb-4">Cart Total</h2>
          <div className="space-y-3 text-sm md:text-base">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>Rs{getTotalCartAmount}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>Rs{getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <p>Total</p>
                <p>
                  Rs{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
                </p>
              </div>
            </div>
          <button
            type="submit"
            onClick={()=>navigate('/payment')}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            PROCEED TO Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
