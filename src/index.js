import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './app/store';
import App from './App';
import './index.css';
// কাস্টম থিম তৈরি করুন
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // নীল
    },
    secondary: {
      main: '#dc004e', // গোলাপি
    },
    background: {
      default: '#f5f5f5', // হালকা ধূসর ব্যাকগ্রাউন্ড
      paper: '#ffffff',   // কার্ড ও পেপারের জন্য সাদা
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shape: {
    borderRadius: 12, // গোলাকার কোণ
  },
});

const saveCartToLocalStorage = () => {
  try {
    const serializedCart = JSON.stringify(store.getState().cart.items);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error("Could not save cart", err);
  }
};

store.subscribe(saveCartToLocalStorage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* স্ট্যান্ডার্ড CSS রিসেট */}
      <App />
    </ThemeProvider>
  </Provider>
);