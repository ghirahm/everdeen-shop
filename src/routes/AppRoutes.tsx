import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import PrivateRoute from './PrivateRoute'; 

const AppRoutes: React.FC = () => {

    const [cart, setCart] = useState<{ title: string; price: number; quantity: number; image: string }[]>([]);

    const addToCart = (product: { title: string; price: number; quantity: number; image: string }) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.title === product.title);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (title: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.title !== title));
    };

    const handleCheckout = () => {
        alert("Proceeding to checkout...");
        setCart([]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage title='Everdeen Shop' description='We provide your daily needs. Lets go shopping!' button='Shop Now' navigation='/product' />} />
                    <Route path='product' element={<ProductPage addToCart={addToCart} />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route
                        path='cart'
                        element={
                            <PrivateRoute>
                                <CartPage
                                    items={cart}
                                    onRemove={removeFromCart}
                                    onCheckout={handleCheckout}
                                />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;