import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  // const fetchList= async()=>{
  //   const response = await axios.get(`${url}/api/food/list`);
  //   if(response.data.sucess){
  //     setList(response.data.data);
  //   }
  //   else{
  //     toast.error("Error")
  //   }
  // }
  // useEffect(()=>{
  //   fetchList();
  // },[])

  // const removeFood = async (foodId) => {
  //   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  // await fetchList();
  // };
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <div className="w-64 ">
        <Sidebar />
      </div>
      <div className="p-4">
        <p className="text-xl font-semibold mb-4">All Food List</p>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 bg-gray-100 p-3 font-semibold text-sm text-gray-700">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {/* Table Rows  */}
          {/* {list.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-6 gap-4 items-center p-3 border-b hover:bg-gray-50"
      >
        <img
          src={`${url}/images/${item.image}`}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <p className="text-sm">{item.name}</p>
        <p className="text-sm">{item.category}</p>
        <p className="text-sm">Rs {item.price}</p>
        <button onClick={(item._id)=>removeFood()} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
          Delete
        </button>

      </div>
    ))}  */}
        </div>
      </div>
    </div>
  );
};

export default List;
