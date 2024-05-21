import React, { useEffect, useState } from 'react';
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from '../Item/Item';

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const baseImageUrl = process.env.REACT_APP_BACKEND_URL + '/images/';
    const modifiedProducts = data_product.map(product => ({
      ...product,
      image: baseImageUrl + product.image
    }));
    setProducts(modifiedProducts);
  }, []);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className='relatedproducts-item'>
        {products.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts;
