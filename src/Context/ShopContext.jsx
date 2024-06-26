import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {

    const getDefaultCart = () => {
        let cart = {};
        for (let index = 0; index <= 300; index++) {
            cart[index] = 0;
        }
        return cart;
    }

    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        // Load cart data from local storage, if available
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });

    // Save cart data to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/allproducts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => setAll_product(data))
            .catch((error) => console.error('Error fetching products:', error));

        if (localStorage.getItem("auth-token")) {
            fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/getcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => setCartItems(data))
                .catch((error) => console.error('Error fetching cart items:', error));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem("auth-token")) {
            fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem("auth-token")) {
            fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error removing from cart:', error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;