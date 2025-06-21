import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { assets, url } from "../../assets/admin_assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";
const Add = ({url}) => {
  
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler= async(event)=>{
    event.preventDefault();
    const formData =new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);
   const response = await axios.post(`${url}/api/food/add`,formData);
   if(response.data.sucess){
    setData({
      name: "",
    description: "",
    price: "",
    category: "Salad",

    })
    setImage(false);
    toast.success(response.data.message)
   }
   else{

    toast.error(response.data.message)
   }

  }

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="bg-amber-100 w-full items-center ml-10 pl-10">
        <form onSubmit={onSubmitHandler} className="flex-col">
          <div>
            <p>Upload image</p>
            <label htmlFor="image">
              <img
                src={previewUrl || assets.upload_area}
                alt="preview"
                className="w-40 h-40 object-cover cursor-pointer border"
              />
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              id="image"
              hidden
              required
            />
          </div>

          <div>
            <p>Product name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              className="border border-red-300"
              name="name"
              placeholder="type here"
            />
          </div>

          <div>
            <p>Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              className="border border-red-300"
              rows={6}
              placeholder="write content here"
            ></textarea>
          </div>

          <div>
            <div>
              <p>Product category</p>
              <select
                onChange={onChangeHandler}
                value={data.category}
                name="category"
                className="border border-red-300"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="pure-veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodeles">Noodles</option>
              </select>
            </div>
            <div>
              <p>Product Price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="Rs200"
                className="border border-red-300"
              />
            </div>
          </div>

          <button className="bg-cyan-300 text-black hover:bg-amber-100 mt-2 w-20">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
