import React, { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer relative flex flex-col">
      <div className="h-48 sm:h-52 md:h-56 w-full overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />

        <div className="absolute bottom-2 right-2">
          {!cartItems[id] ? (
            <button onClick={() => addToCart(id)}>
              <img src={assets.add_icon_white} alt="Add" className="h-8 w-8" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow">
              <button onClick={() => removeFromCart(id)}>
                <img
                  src={assets.remove_icon_red}
                  alt="Remove"
                  className="h-5 w-5"
                />
              </button>
              <p className="text-sm font-semibold">{cartItems[id]}</p>
              <button onClick={() => addToCart(id)}>
                <img
                  src={assets.add_icon_green}
                  alt="Add"
                  className="h-5 w-5"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-base sm:text-lg text-gray-800">
            {name}
          </p>
          <img src={assets.rating_starts} alt="Rating" className="h-4" />
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-md font-bold text-green-600">Rs {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
