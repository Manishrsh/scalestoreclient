import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../style/AddProduct.css";
import axios from "axios";
import useAuth from "../hooks/auth";

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit } = useForm();
  useAuth()

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a .jpg files");
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('productName', data.productName);
      formData.append('productDescription', data.productDescription);
      formData.append('price', data.price);
      formData.append('quantity', data.quantity);

      const res = await axios.post('http://localhost:3000/product/add', formData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Product added successfully:", res.data);
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("There was an error uploading the product. Please try again.");
    }
  };

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  getAuthToken()
  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="image-wrapper">
          <label>Upload a .jpg File</label>
          <input type="file" accept=".jpg" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ marginTop: "20px", width: "100px" }}
            />
          )}
        </div>

        <div className="product-details-wrapper">
          <label>Name of Product</label>
          <input type="text" {...register("productName", { required: true })} />

          <label>Product Description</label>
          <textarea
            {...register("productDescription", { required: true })}
          ></textarea>

          <label>Price</label>
          <input type="number" {...register("price", { required: true })} />

          <label>Quantity/Stock Level</label>
          <input type="number" {...register("quantity", { required: true })} />
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
