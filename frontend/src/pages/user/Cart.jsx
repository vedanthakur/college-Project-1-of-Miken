import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

import { useNavigate } from "react-router-dom";
import { food_list } from "../../assets/frontend_assets/assets";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-gray-700 border-b text-sm md:text-base">
            <p className="col-span-1">Item</p>
            <p className="col-span-1">Title</p>
            <p className="col-span-1">Price</p>
            <p className="col-span-1">Quantity</p>
            <p className="col-span-1">Total</p>
            <p className="col-span-1">Remove</p>
          </div>
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <>
                  <div
                    key={item._id}
                    className="grid grid-cols-6 gap-4 items-center p-4 border-b text-sm md:text-base"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded col-span-1"
                    />
                    <p className="col-span-1">{item.name}</p>
                    <p className="col-span-1">Rs{item.price}</p>
                    <p className="col-span-1">{cartItems[item._id]}</p>
                    <p className="col-span-1">
                      Rs{item.price * cartItems[item._id]}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="col-span-1 text-red-500 hover:text-red-700 text-lg"
                    >
                      ×
                    </button>
                  </div>
                  <hr />
                </>
              );
            }
          })}
        </div>

        {/* Cart Total + Promo Code Side-by-Side */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between gap-6 max-w-6xl mx-auto">
          {/* Cart Total */}
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
              onClick={() => navigate("/order")}
              className="mt-6 w-56 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
