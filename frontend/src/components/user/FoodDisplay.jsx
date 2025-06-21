import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "./FoodItem";
import { assets } from "../../assets/frontend_assets/assets";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredList = food_list?.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <div id="food-display" className="px-4 sm:px-6 md:px-10 py-6">
      <h2 className="font-bold text-2xl sm:text-3xl mb-6 text-gray-800 text-center sm:text-left">
        Top Dishes Near You
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredList?.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
