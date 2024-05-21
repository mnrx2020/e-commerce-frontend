import React, { useEffect, useState } from 'react';
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newcollections`);
      const data = await response.json();
      const baseImageUrl = process.env.REACT_APP_BACKEND_URL + '/images/';
      const modifiedProducts = data.map(product => ({
        ...product,
        image: baseImageUrl + product.image
      }));
      setNewCollection(modifiedProducts);
    };

    fetchNewCollections();
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className='collections'>
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
