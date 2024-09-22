import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import "../style/AddProduct.css";
import axios from "axios";
import useAuth from "../hooks/auth";


const AddProduct = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
      alert("Please upload a .jpg file");
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

      const res = await axios.post(`${apiUrl}/api/product/add`, formData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Product added successfully:", res.data);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("There was an error uploading the product. Please try again.");
    }
  };

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

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
          <input type="text" {...register("productName", { required: true, maxLength: 80 })} />
          {errors.productName && (
            <Alert severity="error">Product Name is required and must be under 80 characters.</Alert>
          )}

          <label>Product Description</label>
          <textarea {...register("productDescription", { required: true, maxLength: 100 })}></textarea>
          {errors.productDescription && (
            <Alert severity="error">Product Description is required and must be under 100 characters.</Alert>
          )}

          <label>Price</label>
          <input type="number" {...register("price", { required: true })} />
          {errors.price && (
            <Alert severity="error">Price is required.</Alert>
          )}

          <label>Quantity/Stock Level</label>
          <input type="number" {...register("quantity", { required: true })} />
          {errors.quantity && (
            <Alert severity="error">Quantity is required.</Alert>
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
