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
      let foundProduct = all_product.find((e) => e.id === Number(productId));
      if (!foundProduct) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/${productId}`);
        foundProduct = await response.json();
      }
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [productId, all_product]);

  return (
    <div>
      {product && <Breadcrum product={product} />}
      {product && <ProductDisplay product={product} />}
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
