import React from 'react';
import { Box, Card, CardMedia, Typography, Chip } from '@mui/material';
import { products } from '../data/products';
const OfferMarquee = () => {
  const offerProducts = products.filter(p => p.isOffer);

  if (offerProducts.length === 0) return null;

  const renderProductCard = (product) => (
    <Card
      key={product.id}
      sx={{
        minWidth: 200,
        mx: 1,
        p: 1,
        textAlign: 'center',
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ height: 100, objectFit: 'contain', mb: 1 }}
      />
      <Typography variant="body2" fontWeight={500}>
        {product.name}
      </Typography>
      <Typography variant="body1" color="primary" fontWeight="bold">
        ${product.price}
      </Typography>
      <Chip label="Sale" size="small" color="error" sx={{ mt: 0.5 }} />
    </Card>
  );

  const content = (
    <>
      {offerProducts.map(renderProductCard)}
      {offerProducts.map(renderProductCard)} {/* দ্বিতীয়বার কপি */}
    </>
  );

  return (
    <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap', mb: 4, bgcolor: '#f5f5f5', py: 2, borderRadius: 3 }}>
      <Box
        sx={{
          display: 'inline-flex',
          animation: 'scroll 20s linear infinite',
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default OfferMarquee;