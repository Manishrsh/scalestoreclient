import './App.css'
import {Route , Routes , BrowserRouter , useLocation } from 'react-router-dom'
import Navbars from './componets/Navbars'
import Card from './componets/Card'
import Inquiry from './componets/Inquiry.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Register from './pages/Register.jsx'
import AddProduct from './pages/AddProduct.jsx'
import store  from './store/store.js'
import { Provider } from 'react-redux'
import Heathcheck from './componets/Heathcheck.jsx'



function App() {
  
  // Custom component to handle conditional rendering of Navbars
  const CustomAppWrapper = () => {
    const location = useLocation();
    
    // Define paths where you do NOT want to show the Navbars
    const hideNavOnPaths = ['/login', '/register'];
    
    // Check if the current path is one of the paths where Navbars should be hidden
    const shouldHideNav = hideNavOnPaths.includes(location.pathname);
    
    return (
      <>
        {!shouldHideNav && <Navbars />}
        <Routes>
          <Route path='/dashboard' element={<Card />} />
          <Route path='/heathcheck' element={<Heathcheck />} />
          <Route path='/inquiry' element={<Inquiry />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addproduct' element={<AddProduct />} />

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
