import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OfferMarquee from './components/OfferMarquee';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: -0.5,
              background: 'linear-gradient(90deg, #0071e3, #e73c7e, #f5b042, #0071e3)',
              backgroundSize: '300% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'shimmer 3s linear infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '0% 0%' },
                '100%': { backgroundPosition: '300% 0%' },
              },
              '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s' },
            }}
          >
            Shop with Rudro
          </Typography>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />
        </Toolbar>
      </AppBar>

      {/* ২০% ডিসকাউন্ট প্রোমো ব্যানার */}
      <Alert severity="info" sx={{ borderRadius: 0 }}>
        🎉 Buy 2 or more products & get <strong>20% OFF</strong> on total! 🎉
      </Alert>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* আকর্ষণীয় সার্চ বার (অটোস্ক্রোলের উপরে) */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="🔍 Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 6,
                backgroundColor: 'rgba(255,255,255,0.9)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 0 0 2px #0071e3',
                },
              },
            }}
          />
        </Box>

        <OfferMarquee />
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <ProductList searchTerm={searchTerm} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <Cart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;