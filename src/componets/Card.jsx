import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../hooks/auth.js'


const Cards = () => {
  const [data, setData] = useState([]);
    const Navigate = useNavigate()
  useEffect(() => {
    const getproductdata = async()=>{
      try{
    const res = await axios.get('http://localhost:3000/product/get',{
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
      setData(res.data)
    console.log("Product added successfully:", res);
  } catch (error) {
    console.error("Error uploading product:", error);
    alert("There was an error uploading the product. Please try again.");
  }
}

getproductdata()
  },[])

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const clickbye = ()=>{
    Navigate('/inquiry')
  }
  useAuth()
  
  return (
    <Container>
      <Row>
        {data.map((item, index) => (
          <Col sm={4} key={index}>
            <Card sx={{ maxWidth: 345, margin: '0 auto' }}> {/* Centers the Card within the Col */}
              <CardMedia
                sx={{
                  height: 200,
                  backgroundSize: 'contain', // Ensures the image fits within the container
                }}
                image={item.imageUrl}
                title={item.productname}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.productname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.productdis}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={clickbye}>Buy</Button>
                <Button size="small">Add to cart</Button>
              </CardActions>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
