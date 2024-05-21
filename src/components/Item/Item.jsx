import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, new_price, old_price }) => {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://mnrx-mern-e-commerce-backend-app-api.onrender.com/images/'
    : 'http://localhost:4000/images/';
  
  const imageUrl = baseUrl + image;

  return (
    <div className='item'>
      <Link to={`/product/${id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={imageUrl} alt={name} />
      </Link>
      <p>{name}</p>
      <div className='item-prices'>
        <div className='item-price-new'>${new_price}</div>
        <div className='item-price-old'>${old_price}</div>
      </div>
    </div>
  );
}

export default Item;
