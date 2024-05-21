import React from 'react';
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrums = ({ product }) => {
  // Check if product is defined and has category and name properties
  if (!product || !product.category || !product.name) {
    return null; // or render a placeholder or loading state
  }

  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt='' /> SHOP <img src={arrow_icon} alt='' /> {product.category} <img src={arrow_icon} alt='' /> {product.name}
    </div>
  );
};

export default Breadcrums;
