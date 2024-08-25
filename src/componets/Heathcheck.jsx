import React from 'react'
import axios from 'axios'

const Heathcheck = () => {
    const getAuthToken = () => {
        return localStorage.getItem('token');
      };
      const token = getAuthToken()
    // Verify token by making a request to a protected route
    const checklogin = async()=>{
    const protectedResponse = await axios.get('http://localhost:3000/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(protectedResponse)
    }

    checklogin()
  return (
    <div>Heathchecksss</div>
  )
}

export default Heathcheck