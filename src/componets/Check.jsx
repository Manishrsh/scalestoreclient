import React, { useEffect } from 'react'
import axios from 'axios'

const Check = () => {
    useEffect(()=>{
         const getdata = async()=>{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/`)
            console.log(res)
         }
         getdata()
    },[])
  return (
    <div>Check</div>
  )
}

export default Check