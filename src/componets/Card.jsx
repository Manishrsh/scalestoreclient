import React from 'react';
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
import useFetchData from '../hooks/fetch.js';
import useAuth from '../hooks/auth.js';

const Cards = () => {
  const navigate = useNavigate();
  useAuth(); // Custom hook for authentication

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const { data, loading, error } = useFetchData(`${process.env.BACKEND_API}/product/get`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleBuyClick = () => {
    navigate('/inquiry');
  };

  return (
    <Container>
      <Row>
        {data && data.map((item, index) => (
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
                <Button size="small" onClick={handleBuyClick}>Buy</Button>
                <Button size="small">Add to carts</Button>
              </CardActions>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
