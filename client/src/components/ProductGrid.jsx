import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 850 },
  { id: 2, name: 'Cotton T-Shirt', category: 'Clothing', price: 450 },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 999 },
];

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { category, priceRange } = useSelector((state) => state.shop.filters);

  // useMemo for high performance array filtering
  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesPrice = product.price <= priceRange;
      return matchesCategory && matchesPrice;
    });
  }, [category, priceRange]);

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  return (
    <main style={{ padding: '20px', flex: 1 }}>
      <h2>Product Grid</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
}