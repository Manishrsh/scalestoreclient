import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { updaterole } from "../slices/userroleslice.js";
import { login } from "../slices/authSlice.js";
import { Alert } from "@mui/material";

const ProtectedRoute = ({ element, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [useRole, setuserRole] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAuth = async () => {
      
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user-info`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
          console.log(response.data.role)
         const userrole = response.data.role;
         setuserRole(userrole)
          console.log(userrole)
        if (!userrole) {
          setError("User role not defined");
          return;
        }

        dispatch(updaterole(userrole));
        dispatch(login()); // Optional: If you need to update the global state with login status
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to authenticate");
      } finally {
        setLoading(false);
      }
    };

    getAuth();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching user info
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>; // Show the error message if there's an issue
  }
  console.log(useRole)
 if(requiredRole=='admin'){
  if (!useRole || (useRole !== requiredRole)) {
    return <Navigate to="/not-authorized" />;
  }
}

  return element;
};

export default ProtectedRoute;
