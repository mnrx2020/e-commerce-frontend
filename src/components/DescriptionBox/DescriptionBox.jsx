import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
      </div>
      <div className='descriptionbox-description'>
        <p>An e-commerce website is an online platform where businesses or individuals sell products or services to customers over the internet. These websites enable users to browse through various products, add items to their virtual shopping carts, and proceed to checkout to make purchases. E-commerce websites typically include features such as secure payment gateways, product catalogs, search functionality, customer reviews, and order tracking. They can range from small, independently operated online stores to large-scale marketplaces with millions of products from multiple vendors.</p>
        <p>An e-commerce website typically features a visually engaging homepage with banners, featured products, and special offers. It organizes products into categories and subcategories, displaying them in lists or grids with thumbnails, prices, and key features. Each product has a detailed page with high-quality images or videos, comprehensive descriptions, pricing details, availability, shipping options, customer reviews, and related product suggestions. The site includes a search bar for specific queries, a virtual shopping cart for reviewing and updating selections, and a checkout page for payment processing. Additionally, there is contact information for customer service, options for user account creation to manage orders and save information, and links to legal documents like privacy policies and terms of service.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
