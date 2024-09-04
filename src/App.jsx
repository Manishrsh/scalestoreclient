import "./App.css";
import { Route, Routes, BrowserRouter, useLocation, Navigate } from "react-router-dom";
import Navbars from "./componets/Navbars";
import Card from "./componets/Card";
import Inquiry from "./componets/Inquiry.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import Heathcheck from "./componets/Heathcheck.jsx";
import Check from "./componets/Check.jsx";
import Page404 from "./pages/Page404.jsx";
import ProtectedRoute from "./utils/Protected.route.jsx";

function App() {
  const CustomAppWrapper = () => {
    const location = useLocation();
    const hideNavOnPaths = ["/login", "/register"];
    const shouldHideNav = hideNavOnPaths.includes(location.pathname);

    return (
      <>
        {!shouldHideNav && <Navbars />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Card />} />}
          />
          <Route
            path="/heathcheck"
            element={<ProtectedRoute element={<Heathcheck />} />}
          />
          <Route
            path="/inquiry"
            element={<ProtectedRoute element={<Inquiry />} />}
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute element={<AddProduct />} requiredRole="admin" />
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={'/dashboard'}/>
            }
          />
          <Route
            path="/check"
            element={
              <Check/>
            }
          />    
          {/* Catch-all Route for 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomAppWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
