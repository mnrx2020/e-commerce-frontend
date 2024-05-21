import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, new_price, old_price }) => {
  // Check if the image is a full URL or an imported image
  const isFullUrl = typeof image === 'string' && (image.startsWith("http://") || image.startsWith("https://"));
  const imageUrl = isFullUrl ? image : image.default || image; // For imported images, `image` would be an object

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
