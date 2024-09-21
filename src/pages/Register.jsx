import React from 'react';
import { useForm } from "react-hook-form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/LoginPage.css'
import axios from 'axios'

const Register = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API;

  const { register, handleSubmit } = useForm();
  
    const onSubmit = async(data)=>{
      try {
      const responce = await axios.post(`${apiUrl}/api/register`,data)
          console.log(responce)
    }
  catch (error) {
    alert(error)
  }
}

  return (
    <Container fluid className='LoginConatiner'>
      <Row className='mainwapperlogin'>
        <Col sm={6} className='loginmainwapper'>
          <div id='Loginwapper'>
            <h3 className='lableinput'>Register</h3>
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
          
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
