import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, new_price, old_price }) => {
  // Check if the image URL is already a full URL or just a filename
  const isFullUrl = image.startsWith("http://") || image.startsWith("https://");
  const baseImageUrl = isFullUrl ? "" : "https://mnrx-mern-e-commerce-backend-app-api.onrender.com/images/";
  
  // Construct the full image URL
  const imageUrl = `${baseImageUrl}${image}`;

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
