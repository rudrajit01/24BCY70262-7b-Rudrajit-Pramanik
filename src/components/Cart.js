import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  Alert,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckoutModal from './CheckoutModal'; // মোডাল ইম্পোর্ট

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutOpen, setCheckoutOpen] = useState(false); // মোডাল স্টেট

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const originalTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountApplied = totalQuantity >= 2;
  const discountedTotal = discountApplied ? originalTotal * 0.8 : originalTotal;

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          Your bag is empty.
        </Typography>
      ) : (
        <>
          <List disablePadding>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem disableGutters sx={{ py: 1 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price}`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ color: 'text.secondary' }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      style={{ width: 50, textAlign: 'center', padding: '6px', borderRadius: 8, border: '1px solid #ddd' }}
                    />
                    <Typography sx={{ minWidth: 50, textAlign: 'right', fontWeight: 500 }}>
                      ${item.price * item.quantity}
                    </Typography>
                    <IconButton edge="end" onClick={() => dispatch(removeItem(item.id))} size="small">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < cartItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />

          {discountApplied && (
            <Alert severity="success" sx={{ mb: 2 }}>
              ✨ 20% discount applied (minimum 2 items) ✨
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={500}>Subtotal</Typography>
            <Typography variant="subtitle1" fontWeight={500}>${originalTotal}</Typography>
          </Box>

          {discountApplied && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'green' }}>
              <Typography variant="body2" fontWeight={500}>Discount (20%)</Typography>
              <Typography variant="body2" fontWeight={500}>-${(originalTotal * 0.2).toFixed(2)}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>Total</Typography>
            <Typography variant="subtitle1" fontWeight={600} color={discountApplied ? 'primary' : 'inherit'}>
              ${discountedTotal.toFixed(2)}
            </Typography>
          </Box>

          {/* দুই বাটন – Buy Now এবং Clear Cart */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={() => setCheckoutOpen(true)}
              sx={{ borderRadius: 40, py: 1.5 }}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              size="large"
              onClick={() => dispatch(clearCart())}
              sx={{ borderRadius: 40, py: 1.5 }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}

      {/* চেকআউট মোডাল */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </Box>
  );
};

export default Cart;