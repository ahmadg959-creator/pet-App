import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.1; // 10% tax
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + taxAmount;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/marketplace" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Items</h2>
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div key={item.id || index} className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                    <img src={item.image} alt={item.title} className="w-full sm:w-28 h-28 rounded-lg object-cover shadow" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <p className="text-blue-600 font-bold text-lg mt-1">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button onClick={() => decreaseQuantity(index)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg text-xl">-</button>
                        <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(index)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg text-xl">+</button>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 transition-colors" title="Remove Item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-28">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Order Summary</h2>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes ({taxRate * 100}%)</span>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center font-bold text-xl text-gray-800">
                    <span>Order Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
                  Proceed to Checkout
                </button>
                <Link to="/marketplace" className="mt-4 inline-block text-center w-full text-blue-600 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
