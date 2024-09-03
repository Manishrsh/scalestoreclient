import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updaterole } from '../slices/userroleslice.js';
import { useEffect } from 'react';
import { login } from '../slices/authSlice.js';

// Define the function but don't export it immediatelys
const useAuth =  () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        
    const getauth = async()=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/user-info`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const userrole = response.data.role; // Corrected to match the role key

        dispatch(updaterole(userrole));
        dispatch(login())

        console.log('User Role:', userrole); // Now properly accesses the role
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}
getauth()
},[])
};

// Example functional component to use the function

    


export default useAuth;
