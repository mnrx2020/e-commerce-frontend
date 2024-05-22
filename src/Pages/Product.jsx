import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product with ID:", productId);
      let foundProduct = all_product.find((e) => e.id === Number(productId));
      console.log("Found product in context:", foundProduct);
      if (!foundProduct) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/${productId}`);
          foundProduct = await response.json();
          console.log("Fetched product from backend:", foundProduct);
        } catch (error) {
          console.error("Error fetching product from backend:", error);
        }
      }
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [productId, all_product]);

  if (!product) {
    return <div>Loading...</div>; // Display loading state while fetching the product
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
