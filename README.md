# 🛍️ Redux Shopping Cart

A modern, feature-rich shopping cart application built with **React**, **Redux Toolkit**, and **Material UI**. This project demonstrates advanced state management, responsive design, and a smooth user experience with real-time cart updates, discounts, and local storage persistence.

## ✨ Features

- **Redux Toolkit** for efficient state management
- **Add to Cart** with quantity selector (+/- buttons)
- **20% Discount** automatically applied when buying 2 or more items
- **Buy Now** option (direct checkout modal)
- **Search Bar** – filter products by name or description
- **Auto-scrolling Offer Marquee** for products on sale
- **Glassmorphism UI** with smooth animations and hover effects
- **Local Storage** – cart persists across page reloads
- **Loading Skeletons** for better perceived performance
- **Toast Notifications** (Snackbar) for add/remove actions
- **Responsive Design** – works on desktop, tablet, and mobile

## 🛠️ Technologies Used

- **React 18** – UI library
- **Redux Toolkit** – state management
- **Material UI (MUI)** – component library and styling
- **React Redux** – connect React with Redux
- **LocalStorage** – persist cart data

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rudrajit01/24BCY70262-7b-Rudrajit-Pramanik.git
cd 24BCY70262-7b-Rudrajit-Pramanik
npm install
🚀 Usage
Start the development server:

bash
npm start
Open http://localhost:3000 in your browser.

Browse products, adjust quantity, and add to cart.

Use the search bar to find specific items.

Cart shows subtotal, discount, and total price.

Click Buy Now to open the checkout summary modal.

Cart data remains after refreshing the page.

📂 Project Structure
text
src/
├── app/
│   └── store.js                 # Redux store configuration
├── components/
│   ├── Cart.js                  # Shopping cart component
│   ├── CheckoutModal.js         # Checkout summary modal
│   ├── OfferMarquee.js          # Auto-scrolling offer banner
│   └── ProductList.js           # Product grid with filters
├── data/
│   └── products.js              # Product data (name, price, image, etc.)
├── features/
│   └── cart/
│       └── cartSlice.js         # Redux slice for cart actions
├── App.js                       # Main app with header, search bar, layout
├── index.css                    # Global styles (animated gradient)
└── index.js                     # Entry point with Redux provider
🔧 Redux State Management
cartSlice.js contains reducers: addItem, removeItem, updateQuantity, clearCart.

addItem now accepts a quantity parameter, allowing bulk addition.

Store subscribes to changes and saves cart to localStorage.

🎨 Customization
Colors & Themes: Modify createTheme in index.js or App.js.

Products: Edit src/data/products.js to add/change products.

Discount Logic: Adjust the 20% rule in Cart.js and CheckoutModal.js.

📸 Screenshots
(Add your own screenshots here for better visibility)

🤝 Contributing
This is a personal project, but suggestions and feedback are welcome! Feel free to fork and improve.

📄 License
This project is open-source and available under the MIT License.

👨‍💻 Author
Rudrajit Pramanik – GitHub
