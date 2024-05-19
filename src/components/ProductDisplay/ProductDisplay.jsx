import React, { useContext } from 'react';
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);


    // Check if product is defined
    if (!product) {
        return null; // or render a placeholder or loading state
    }


    // Set a default value for product rating if not provided
    const rating = product.rating || 0;


    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    {product.image && (
                        <>
                            <img src={product.image} alt="" />
                            <img src={product.image} alt="" />
                            <img src={product.image} alt="" />
                            <img src={product.image} alt="" />
                        </>
                    )}
                </div>
                <div className='productdisplay-img'>
                    {product.image && (
                        <img className='productdisplay-main-img' src={product.image} alt="" />
                    )}
                </div>
            </div>
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>
                <div className='productdisplay-right-stars'>
                    {/* Render star icons based on product.rating */}
                    {[...Array(rating)].map((_, index) => (
                        <img key={index} src={star_icon} alt="" />
                    ))}
                    {/* Render dull stars for remaining */}
                    {[...Array(5 - rating)].map((_, index) => (
                        <img key={index + rating} src={star_dull_icon} alt="" />
                    ))}
                    <p>({product.rating_count || 0})</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-old'>${product.old_price}</div>
                    <div className='productdisplay-right-price-new'>${product.new_price}</div>
                </div>
                <div className='productdisplay-right-description'>
                    {product.description}
                </div>
                <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-sizes'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXl</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>{product.category}</p>
                <p className='productdisplay-right-category'><span>Tags :</span>{product.tags}</p>
            </div>
        </div>
    );
}


export default ProductDisplay;


