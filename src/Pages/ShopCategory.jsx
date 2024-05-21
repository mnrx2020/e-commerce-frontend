import React, { useEffect, useState } from 'react';
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PRODUCTION : process.env.REACT_APP_API_URL_LOCAL}/newcollections`)
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className='collections'>
        {newCollection.map((item, i) => {
          // Construct the full image URL based on the environment
          const baseImageUrl = process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_API_URL_PRODUCTION
            : process.env.REACT_APP_API_URL_LOCAL;
          const imageUrl = `${baseImageUrl}/${item.image}`;

          return <Item key={i} id={item.id} name={item.name} image={imageUrl} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  );
}

export default NewCollections;
