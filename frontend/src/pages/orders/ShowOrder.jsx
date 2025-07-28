import React, { useContext, useEffect, useState } from 'react';
import './ListOrders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';

const ShowOrder = () => {
  const [order, setOrder] = useState({});
  const {orderId} = useParams()

  const { url, token, foodList } = useContext(StoreContext);

  // Fetch the order when the component mounts
  useEffect(() => {
    fetchOrder(token);
  }, [token]); // Empty dependency array means this runs once on mount

  // Function to fetch the order of order items from the backend
  const fetchOrder = async (token) => {
    try {
      const response = await axios.get(`${url}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Error fetching order order:', error);
      toast.error('Failed to connect to server or fetch order');
    }
  };



  if (!order.orderFoods) {
    return (
      <div className='order add flex-col'>
        <p>Loading order details...</p>
      </div>
    );
  }


  return (
    <div className='order add flex-col'>
      <p>All orders order</p>
      <div className="order-table">
        <div className="order-table-format title">
          <b>Name</b>
          <b>Address</b>
          <b>Phone</b>
          <b>Total amount</b>
        </div>
        {    
          <div key={order._id} className='order-table-format'>
              <p>Name: {order.name}</p>
              <p>Address: {order.address}</p>
              <p>Phone: {order.phone}</p>
              <p>Total: {order.total_amount}$</p>
              
              
              {foodList.map((item) => {
                const orderedFood = order.orderFoods.find(food => food.food_id === item._id);
                return orderedFood && (
                  <div key={item._id}>
                    <div className='cart-items-title cart-items-item'>
                      <img src={url + "/images/" + item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{orderedFood.quantity}</p>
                      <p>${orderedFood.quantity * item.price}</p>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <hr />
            </div>
        }
      </div>
    </div>
  );
};

export default ShowOrder;
