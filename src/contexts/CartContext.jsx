import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("marketCart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("marketCart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(item => item.title === product.title);
            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        alert("Item added to cart!");
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const increaseQuantity = (index) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart[index].quantity += 1;
            return updatedCart;
        });
    };

    const decreaseQuantity = (index) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            if (updatedCart[index].quantity > 1) {
                updatedCart[index].quantity -= 1;
            } else {
                // Remove the item if quantity is 1
                return updatedCart.filter((_, i) => i !== index);
            }
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
