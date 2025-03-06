import React from 'react';
import Cart from './Cart';
import Footer from './Footer';
import CartNavbar from './CartNavbar';
export default function CartPage({ cart = [], setCart }) {
  return (
    <div>
    <CartNavbar/>
      <h2>Your Cart</h2>
      {cart.length === 0 ?  (
  <div style={{ textAlign: 'center' }}>
    <img src="/assets/empty.png" alt="Your cart is empty"  style={{ maxWidth: '400px', width: '80%', margin: '20px auto' }} />
    <h3>Your cart is empty....</h3>
  </div>
): <Cart cartItems={cart} setCart={setCart} />}
      <br />
      <br />
      <Footer />
    </div>
  );
}
