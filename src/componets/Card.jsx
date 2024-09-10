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
import { useDispatch } from 'react-redux';
import { updateinqproduct } from '../slices/inqProducts.js';

const Cards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const [prodata, setProdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      console.log(apiUrl)
      try {
        const response = await fetch(`${apiUrl}/api/product/get`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
          console.log(data)
        if (Array.isArray(data)) {
          setProdata(data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (err) {
        console.log(err)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errorss: {error}</p>;

  const handleBuyClick = (id) => {
    dispatch(updateinqproduct(id)); // Correct action to dispatch
    navigate('/inquiry');
  };

  return (
    <Container>
      <Row>
        {prodata.length > 0 ? (
          prodata.map((item, index) => (
            <Col sm={4} key={index} >
              <Card sx={{ maxWidth: 300, mb: 5, maxHeight: 350 }}>
                <CardMedia
                  sx={{
                    height: 200,
                    backgroundSize: 'contain',
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
                  <Button size="small" onClick={() => handleBuyClick(item._id)}>Buy</Button>
                  <Button size="small">Add to cart</Button>
                </CardActions>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Row>
    </Container>
  );
};

export default Cards;
