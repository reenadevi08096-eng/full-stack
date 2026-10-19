import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, toggleCart, removeFromCart } from './redux/cartSlice';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import PostManager from './components/PostManager';

export default function App() {
  const dispatch = useDispatch();
  const { darkMode, cart, isCartOpen } = useSelector((state) => state.shop);

  return (
    <div style={{ 
      background: darkMode ? '#121212' : '#f8f9fa', 
      color: darkMode ? '#ffffff' : '#212529', 
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      position: 'relative'
    }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 30px', 
        borderBottom: '1px solid #444',
        background: darkMode ? '#1e1e1e' : '#ffffff'
      }}>
        <h1 style={{ margin: 0, fontSize: '22px' }}>Fullstack Master Dashboard</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={() => dispatch(toggleTheme())}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          
          <button 
            onClick={() => dispatch(toggleCart())}
            style={{ padding: '8px 15px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            🛒 Cart ({cart.length})
          </button>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ProductGrid />
          <PostManager />
        </div>
      </div>

      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '350px',
          height: '100vh',
          background: darkMode ? '#1e1e1e' : '#ffffff',
          boxShadow: '-5px 0 15px rgba(0,0,0,0.3)',
          padding: '20px',
          boxSizing: 'border-box',
          zIndex: 1000,
          overflowY: 'auto',
          color: darkMode ? '#fff' : '#000'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
            <h2 style={{ margin: 0 }}>Your Cart</h2>
            <button 
              onClick={() => dispatch(toggleCart())}
              style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: darkMode ? '#fff' : '#000' }}
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p style={{ marginTop: '20px', textAlign: 'center', color: '#888' }}>Cart is empty.</p>
          ) : (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #555', borderRadius: '6px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>₹{item.price}</p>
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}