import React, { useEffect } from 'react'
import axios from 'axios'

const Check = () => {
    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(`https://manishsofbackend.scalestore.shop/api/product/get`)
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
