import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import '../style/inquiry.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Inquiry() { 
  const productid = useSelector((state) => state.inqProduct.productid);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'
  const [productName, setProductName] = useState(''); // To store the product name

  const onSubmit = async (data) => {
    try {
      const inquiryData = {
        ...data,
        productName, // Include the product name in the submitted data
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/sendinquiry/send`, inquiryData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // If successful, show success alert and reset the form
      setAlertMessage('Data added successfully!');
      setAlertType('success');
      reset(); // Clears all the form fields
    } catch (error) {
      // If there's an error, show error alert
      setAlertMessage('Failed to add data.');
      setAlertType('error');
    }
  };

  useEffect(() => {
    const getAuthToken = () => {
      return localStorage.getItem('token');
    };

    const getproductname = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/product/productname?productid=${productid}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        });

        setProductName(response.data.productname); // Assuming the response has a 'productname' field
      } catch (error) {
        setAlertMessage('Something went wrong while fetching the product name.');
        setAlertType('error');
      }
    };

    if (productid) {
      getproductname();
    }
  }, [productid]);

  return (
    <div>
      {alertMessage && (
        <Alert severity={alertType} onClose={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}

      <form className="inquiry-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" value={productName} readOnly placeholder="Product Name" />

        <input type="text" placeholder="First name" {...register("firstName", { required: true, maxLength: 80 })} />
        <input type="text" placeholder="Last name" {...register("lastName", { required: true, maxLength: 100 })} />
        <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        <input type="tel" placeholder="Mobile number" {...register("mobileNumber", { required: true, minLength: 10, maxLength: 13 })} />
        <input type="number" onWheel={(e) => e.target.blur()} placeholder="Quantity" {...register("quantity", { required: true })} />

        <input type="submit" />
      </form>
    </div>
  );
}
