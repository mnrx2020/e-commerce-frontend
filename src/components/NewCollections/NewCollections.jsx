import React, { useEffect, useState } from 'react';
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/newcollections")
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className='collections'>
        {newCollection.map((item, i) => {
          const imageUrl = `https://mnrx-mern-e-commerce-backend-app-api.onrender.com/images/${item.image}`;
          return <Item key={i} id={item.id} name={item.name} image={imageUrl} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  );
}

export default NewCollections;
