import React from 'react';
import "./RelatedProducts.css";
import Item from '../Item/Item';
import data_product from "../Assets/data"


const RelatedProducts = () => {
  // Assuming `data_product` contains an array of related product objects with `id`, `name`, `image`, `new_price`, and `old_price` properties
  // Assuming `backendURL` is the URL of your backend server

  const backendURL = "https://mnrx-mern-e-commerce-backend-app-api.onrender.com";

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className='relatedproducts-item'>
        {/* Map over the related products and render an `Item` component for each product */}
        {data_product.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={`${backendURL}/images/${item.image}`} 
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
