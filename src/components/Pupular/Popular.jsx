import React, { useEffect, useState } from 'react';
import "./Popular.css";
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PRODUCTION : process.env.REACT_APP_API_URL_LOCAL;
    fetch(`${apiUrl}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className='popular-item'>
        {popularProducts.map((item, i) => {
          const baseImageUrl = process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_API_URL_PRODUCTION
          : process.env.REACT_APP_API_URL_LOCAL;
        const imageUrl = `${baseImageUrl}/${item.image}`;
          return (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={imageUrl} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
