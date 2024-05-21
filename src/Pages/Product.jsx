import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  
  // Construct the image URL
  const imageUrl = process.env.NODE_ENV === 'production'
    ? `https://mnrx-mern-e-commerce-backend-app-api.onrender.com/images/${product.image}`
    : `/images/${product.image}`;

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={{ ...product, image: imageUrl }} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
