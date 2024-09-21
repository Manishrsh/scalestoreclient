import axios from 'axios'
import React from 'react'

const MyOrders = () => {
    const getdata = ()=>{
        const data = axios.get(`${import.meta.env.VITE_BACKEND_API}/api/constumerorders`)   
        console.log(data)
    }
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders