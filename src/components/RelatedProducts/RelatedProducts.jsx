import React from 'react';
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from '../Item/Item';

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className='relatedproducts-item'>
        {data_product.map((item, i) => {
          // Check if the image URL is already a full URL or just a filename
          const isFullUrl = item.image.startsWith("http://") || item.image.startsWith("https://");
          const baseImageUrl = isFullUrl ? "" : "https://mnrx-mern-e-commerce-backend-app-api.onrender.com/images/";
          const imageUrl = `${baseImageUrl}${item.image}`;

          console.log(`Rendering product: ${item.name}, Image URL: ${imageUrl}`);

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

export default RelatedProducts;
