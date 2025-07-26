import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
  // State to store the order of order items
  const [order, setOrder] = useState([]);
  // State to track which order item is currently being edited (stores its _id)
  const [editingorderId, setEditingorderId] = useState(null);
  // State to store the price value in the input field during editing
  const [editedPrice, setEditedPrice] = useState('');

  // Fetch the order when the component mounts
  useEffect(() => {
    fetchOrder();
  }, []); // Empty dependency array means this runs once on mount

  // Function to fetch the order of order items from the backend
  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      console.log(response.data)
      if (response.data.success) {
        setOrder(response.data);
      } else {
        toast.error('Error fetching order order');
      }
    } catch (error) {
      console.error('Error fetching order order:', error);
      toast.error('Failed to connect to server or fetch order');
    }
  };

  // Function to remove a order item
  const removeOrder = async (orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/remove`, { id: orderId });
      await fetchOrder(); // Re-fetch the order after removal
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error removing order');
      }
    } catch (error) {
      console.error('Error removing order:', error);
      toast.error('Failed to remove order item');
    }
  };

  // Function to handle the click on the "Edit" button
  const handleEditClick = (item) => {
    setEditingorderId(item._id); // Set the ID of the item being edited
    setEditedPrice(item.price.toString()); // Set the initial price in the input field
  };

  // Function to handle the change in the price input field
  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value); // Update the editedPrice state
  };

  // Function to handle the click on the "Save" button
  const handleSaveClick = async (orderId) => {
    // Validate the price input
    const priceValue = parseFloat(editedPrice);
    if (isNaN(priceValue) || priceValue < 0) {
      toast.error('Please enter a valid positive number for the price.');
      return; // Stop the function if validation fails
    }

    try {
      // Send a request to update the price.
      // Assuming your backend has an endpoint like /api/order/updatePrice
      // You might need to adjust the endpoint and method (e.g., PUT) based on your backend API.
      const response = await axios.post(`${url}/api/order/updatePrice`, {
        id: orderId,
        price: priceValue,
      });

      // Log the full response for debugging purposes
      console.log('Backend response for price update:', response);

      if (response.data.success) {
        toast.success(response.data.message || 'Price updated successfully!');
        setEditingorderId(null); // Exit editing mode
        setEditedPrice(''); // Clear the edited price state
        fetchOrder(); // Re-fetch the order to show the updated price
      } else {
        // If backend indicates failure but no specific message, provide a generic one
        toast.error(response.data.message || 'Failed to update price: Server reported an issue.');
      }
    } catch (error) {
      console.error('Error updating price:', error);
      // Provide more specific error messages based on the type of error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        toast.error(`Failed to update price: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        toast.error('Failed to update price: No response from server. Check network connection or backend server status.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        toast.error(`Failed to update price: ${error.message}`);
      }
    }
  };



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
        {order.length > 0 ? (
          order.map((item, index) => (
            <div key={item._id} className='order-table-format'>
              <p>{item.name}</p>
              <p>{item.address}</p>
              <p>{item.phone}</p>
              <p>{item.total_amount}</p>
              {item.orderFodds.map(food =>
                <>
                  <p>{food.food_id}</p>
                  <p>{food.food_quantity}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No order items found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
