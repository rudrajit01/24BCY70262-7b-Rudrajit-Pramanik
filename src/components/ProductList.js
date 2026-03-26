import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Skeleton,
  Box,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { products } from '../data/products';

const ProductList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ফিল্টার পণ্য (নাম বা বিবরণ অনুযায়ী)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty
    }));
    setSnackbar({
      open: true,
      message: `${qty} x ${product.name} added to cart!`,
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // স্কেলটন কার্ড
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          sx={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2,
            textAlign: 'center',
          }}
        >
          <Skeleton variant="rectangular" height={180} sx={{ mb: 2, borderRadius: 2 }} />
          <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={28} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 40 }} />
        </Card>
      </Grid>
    ));
  };

  if (loading) {
    return (
      <Grid container spacing={4}>
        {renderSkeletons()}
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={4}>
        {filteredProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ py: 4, color: 'text.secondary' }}>
              No products found. Try a different search term.
            </Typography>
          </Grid>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  p: 2,
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {product.isOffer && (
                  <Chip
                    label="🔥 Offer"
                    color="error"
                    size="small"
                    sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
                  />
                )}
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 180, objectFit: 'contain', mb: 2 }}
                />
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 500, mb: 2 }}>
                    ${product.price}
                  </Typography>

                  {/* Quantity Selector */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(product.id, -1)}
                      sx={{ border: '1px solid #ddd', borderRadius: 1 }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <TextField
                      size="small"
                      type="number"
                      value={quantities[product.id] || 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1) {
                          setQuantities(prev => ({ ...prev, [product.id]: val }));
                        }
                      }}
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      sx={{ width: 60 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(product.id, 1)}
                      sx={{ border: '1px solid #ddd', borderRadius: 1 }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      borderRadius: 40,
                      px: 4,
                      transition: 'transform 0.2s',
                      '&:active': { transform: 'scale(0.98)' },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Snackbar নোটিফিকেশন */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductList;