import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/LoginPage.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updaterole } from '../slices/userroleslice.js';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice.js';


const LoginPage = () => {

  const { register, handleSubmit } = useForm();
  const [Userrole, setUserrole] = useState('customer');
  const dispatch = useDispatch(); // Get the dispatch function

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/login', data);
      localStorage.setItem('token', res.data.token);
      console.log(res)
      dispatch(login());

      const userrole = res.data.userrole;
      console.log(userrole)
      setUserrole(userrole);  // Update the local state
      dispatch(updaterole(userrole));
        // Dispatch the action to update Redux state
      navigate('/dashboard')
    } catch (error) {
      alert(error);
    }
  };

  console.log(Userrole); // This will show the updated role in the console

  return (
    <Container fluid className='LoginConatiner'>
      <Row className='mainwapperlogin'>
        <Col sm={6} className='loginmainwapper'>
          <div id='Loginwapper'>
            <h3 className='lableinput'>Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
              <label htmlFor="" className='lableinput'>Username</label>
              <input className='input' {...register("email")} placeholder='Username' /><br />
              <label htmlFor="" className='lableinput'>Password</label>
              <input className='input' type='password' {...register("password")} placeholder='Password' /><br />
              <input type="submit" id='submitBtn' />
            </form>
          </div>
        </Col>
        <Col sm={6} className='d-none d-sm-block imageWapper'>
          {/* Image or other content here */}
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
