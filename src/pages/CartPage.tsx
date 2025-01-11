import React from 'react';

import { useNavigate } from 'react-router-dom';
import Alert from '../utils/Alert';

interface CartProps {
    items: { title: string; price: number; quantity: number }[];
    onRemove: (title: string) => void;
    onCheckout: () => void;
    isCheckOut: string | null;
    setIsCheckOut: (value: string | null) => void;
}

const CartPage: React.FC<CartProps> = ({ items, onRemove, onCheckout, isCheckOut, setIsCheckOut }) => {

    const navigate = useNavigate();

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="flex justify-center items-center h-screen bg-white p-6">
            {
                isCheckOut && <Alert isError={isCheckOut} setIsError={() => setIsCheckOut(null)}/>
            }
            <div className="bg-white border-2 rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col gap-6">
                <h2 className="font-semibold text-2xl text-center text-slate-950 mb-4">Shopping Cart</h2>

                {items.length === 0 ? (
                    <p className="text-center text-gray-600">Nothing in Your Cart</p>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.title} className="flex justify-between items-center py-2 border-b border-slate-950">
                                <span className="text-slate-950">{item.title} (x{item.quantity})</span>
                                <span className="text-slate-950">${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => onRemove(item.title)}
                                    className="hover:underline transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-between mt-6 mb-4">
                    <span className="font-semibold text-lg text-slate-950">TOTAL</span>
                    <span className="font-semibold text-lg text-slate-950">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                    onClick={onCheckout}
                    className="w-full text-slate-950 rounded-lg font-semibold bg-white border-2 border-slate-950 text-[var(--color-secondary)] p-4 ease-in-out duration-300 hover:border-b-8 hover:border-[#ffaad1] focus:outline-none disabled:bg-gray-300"
                >
                    Checkout
                </button>
                <button
                    onClick={() => navigate('/product')}
                    className="w-full text-slate-950 rounded-lg font-semibold bg-white border-2 border-slate-950 text-[var(--color-secondary)] p-4 ease-in-out duration-300 hover:border-b-8 hover:border-[#ffaad1] focus:outline-none disabled:bg-gray-300"
                >
                    Back to Product
                </button>
            </div>
        </div>
    )
}

export default CartPage;