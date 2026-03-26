import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';

const CheckoutModal = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const discountApplied = totalQuantity >= 2;
  const discountedTotal = discountApplied ? totalPrice * 0.8 : totalPrice;

  const handleConfirmOrder = () => {
    // অর্ডার কনফার্ম হলে কার্ট খালি করুন এবং মোডাল বন্ধ করুন
    dispatch(clearCart());
    onClose();
    alert('🎉 Order placed successfully! Thank you for shopping with Rudro.');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Order Summary</DialogTitle>
      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <List disablePadding>
              {cartItems.map((item, index) => (
                <ListItem key={item.id} disableGutters sx={{ py: 1 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} x $${item.price}`}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    ${item.price * item.quantity}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2">Subtotal</Typography>
              <Typography variant="subtitle2">${totalPrice}</Typography>
            </Box>
            {discountApplied && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'green' }}>
                <Typography variant="body2">Discount (20%)</Typography>
                <Typography variant="body2">-${(totalPrice * 0.2).toFixed(2)}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color={discountApplied ? 'primary' : 'inherit'}>
                ${discountedTotal.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleConfirmOrder}
          disabled={cartItems.length === 0}
          sx={{ borderRadius: 40, px: 3 }}
        >
          Confirm Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;