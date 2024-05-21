import React from 'react'
import "./RelatedProducts.css"
import data_product from "../Assets/data"
import Item from '../Item/Item'


const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className='relatedproducts-item'>
        {data_product.map((item,i)=>{
          const imageUrl = `${process.env.REACT_APP_API_URL_PRODUCTION}/images/${item.image}`;
            return <Item key={i} id={item.id} name={item.name} image={imageUrl} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}


export default RelatedProducts


