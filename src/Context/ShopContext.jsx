import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const getDefaultCart = () => {
        let cart = {};
        for (let index = 0; index <= 300; index++) {
            cart[index] = 0;
        }
        return cart;
    };

    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const baseImageUrl = process.env.REACT_APP_BACKEND_URL + '/images/';
        
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/allproducts");
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                const modifiedProducts = data.map(product => ({
                    ...product,
                    image: product.image.startsWith('http') ? product.image : baseImageUrl + product.image
                }));
                setAll_product(modifiedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCartItems = async () => {
            if (localStorage.getItem("auth-token")) {
                try {
                    const response = await fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/getcart", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "auth-token": `${localStorage.getItem("auth-token")}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({})
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    const data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchProducts();
        fetchCartItems();
    }, []);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem("auth-token")) {
            try {
                const response = await fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/addtocart", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "itemId": itemId })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem("auth-token")) {
            try {
                const response = await fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/removefromcart", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "itemId": itemId })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
