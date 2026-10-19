import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter, setPriceFilter } from '../redux/cartSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { category, priceRange } = useSelector((state) => state.shop.filters);

  return (
    <aside style={{ padding: '20px', borderRight: '1px solid #ccc', width: '250px' }}>
      <h3>Filters</h3>
      <div style={{ margin: '15px 0' }}>
        <label>Category:</label>
        <select value={category} onChange={(e) => dispatch(setCategoryFilter(e.target.value))}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>
      <div>
        <label>Max Price: ₹{priceRange}</label>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          value={priceRange} 
          onChange={(e) => dispatch(setPriceFilter(Number(e.target.value)))} 
        />
      </div>
    </aside>
  );
}