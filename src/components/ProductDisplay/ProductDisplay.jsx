import React, { useContext } from 'react';
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    if (!product) {
        return null; // or render a placeholder or loading state
    }

    const rating = product.rating || 0;

    // Construct the image URL
    const imageUrl = process.env.NODE_ENV === 'production'
        ? `https://mnrx-mern-e-commerce-backend-app-api.onrender.com/images/${product.image}`
        : `/images/${product.image}`;

    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    {product.image && (
                        <>
                            <img src={imageUrl} alt="" />
                            <img src={imageUrl} alt="" />
                            <img src={imageUrl} alt="" />
                            <img src={imageUrl} alt="" />
                        </>
                    )}
                </div>
                <div className='productdisplay-img'>
                    {product.image && (
                        <img className='productdisplay-main-img' src={imageUrl} alt="" />
                    )}
                </div>
            </div>
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>
                <div className='productdisplay-right-stars'>
                    {[...Array(rating)].map((_, index) => (
                        <img key={index} src={star_icon} alt="" />
                    ))}
                    {[...Array(5 - rating)].map((_, index) => (
                        <img key={index + rating} src={star_dull_icon} alt="" />
                    ))}
                    <p>({product.rating_count || 0})</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-old'>${product.old_price}</div>
                    <div className='productdisplay-right-price-new'>${product.new_price}</div>
                </div>
                <div className='productdisplay-right-btn'>
                    <button onClick={() => { addToCart(product.id); window.scrollTo(0, 0); }}>Add to Cart</button>
                    <button>Buy Now</button>
                </div>
                <div className='productdisplay-right-hr'></div>
                <div className='productdisplay-right-details'>
                    <p>Brand: {product.brand}</p>
                    <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
                    <p>Category: {product.category}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
