import React, { useEffect } from 'react'
import axios from 'axios'

const Check = () => {
    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api`)
                console.log(res.data) // Use res.data to get the response body
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        getdata()
    }, [])

    return (
        <div>Check</div>
    )
}

export default Check
