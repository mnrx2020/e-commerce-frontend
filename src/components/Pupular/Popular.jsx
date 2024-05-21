import React, { useEffect, useState } from 'react';
import "./Popular.css";
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/popularinwomen`);
      const data = await response.json();
      const baseImageUrl = process.env.REACT_APP_BACKEND_URL + '/images/';
      const modifiedProducts = data.map(product => ({
        ...product,
        image: baseImageUrl + product.image
      }));
      setPopularProducts(modifiedProducts);
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className='popular-item'>
        {popularProducts.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
