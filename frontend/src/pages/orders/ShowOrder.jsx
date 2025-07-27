import React, { useContext, useEffect, useState } from "react";
import "./ShowOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useParams } from "react-router-dom";

const ShowOrder = () => {
  const [order, setOrder] = useState({});
  const { orderId } = useParams();

  const { url, token } = useContext(StoreContext);

  // Fetch the order when the component mounts
  useEffect(() => {
    fetchOrder(token);
  }, [token]); // Empty dependency array means this runs once on mount

  // Function to fetch the order of order items from the backend
  const fetchOrder = async (token) => {
    try {
      const response = await axios.get(`${url}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const orderData = response.data.order
        setOrder(orderData);
      }
    } catch (error) {
      toast.error("Failed to connect to server or fetch order" + error);
    }
  };

  return (
    <div className="order add flex-col">
      <p>All orders order</p>
      <div className="order-table">
        {
          <div key={order._id} className="order-table-format">
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Total: {order.total_amount}$</p>
            {order.orderFoods.map((food) => (
              <div className="food-item" key={food.food_id}>
                <p>Quantity: {food.quantity}</p>
              </div>
            ))}
            <hr />
          </div>
        }
      </div>
    </div>
  );
};

export default ShowOrder;
