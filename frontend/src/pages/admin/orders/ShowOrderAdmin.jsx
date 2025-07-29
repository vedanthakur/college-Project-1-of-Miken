import React, { useContext, useEffect, useState } from "react";
import "./ListOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/StoreContext";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Select from 'react-select';

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const orderStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Processing', label: 'Processing' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Ready For Pickup', label: 'Ready For Pickup' },
  { value: 'Out For Delivery', label: 'Out For Delivery' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Rejected', label: 'Rejected' }
];

const ShowOrderAdmin = () => {
  const [order, setOrder] = useState({});
  const {orderId} = useParams();

  const { url, token, foodList } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrder = async (token) => {
      try {
        const response = await axios.get(`${url}/api/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setOrder(response.data.order);
        }
      } catch (error) {
        toast.error("Failed to connect to server or fetch order" + error);
      }
    };
    fetchOrder(token);
  }, [token, url, orderId]);

  const handleStatusChange = async (selectedOption) => {
    try {
      const response = await axios.patch(
        `${url}/api/order/${orderId}/status`,
        { order_status: selectedOption.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrder({ ...order, order_status: selectedOption.value });
        toast.success('Order status updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update order status: ' + error.message);
    }
  };

  if (!order.orderFoods) {
    return (
      <div className="order add flex-col">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="order add flex-col">
      <p>All orders order</p>
      <div className="order-table">
        <div className="order-table-format title">
          <b>Name</b>
          <b>Address</b>
          <b>Phone</b>
          <b>Total amount</b>
        </div>
        {
          <div key={order._id} className="order-table-format">
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Total: {order.total_amount}$</p>
            <div className="status-update-container">
              <p>Order Status:</p>
              <Select
                options={orderStatusOptions}
                value={orderStatusOptions.find(option => option.value === order.order_status)}
                onChange={handleStatusChange}
                className="status-select"
              />
            </div>

            {foodList.map((item) => {
              const orderedFood = order.orderFoods.find(
                (food) => food.food_id === item._id
              );
              return (
                orderedFood && (
                  <div key={item._id}>
                    <div className="cart-items-title cart-items-item">
                      <img src={url + "/images/" + item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{orderedFood.quantity}</p>
                      <p>${orderedFood.quantity * item.price}</p>
                    </div>
                    <hr />
                  </div>
                )
              );
            })}
            <hr />
          </div>
        }
      </div>

      {order.location && (
        <div className="map-container">
          <h3>Delivery Location</h3>
          <MapContainer 
            center={[order.location.latitude, order.location.longitude]} 
            zoom={13} 
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
              position={[order.location.latitude, order.location.longitude]}
              icon={markerIcon}
            >
              <Popup>
                Delivery Address: {order.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default ShowOrderAdmin;