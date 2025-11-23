import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { initialPets, initialConsultations } from '../../data';

const Toast = ({ message, onDismiss, key }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss, key]);
 return (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-2xl transition-transform duration-300 ease-out z-50 translate-x-0">
            <p>{message}</p>
        </div>
    );
 };

const Layout = () => {
  const [pets, setPets] = useState(() => {
    const savedPets = localStorage.getItem('pets');
    return savedPets ? JSON.parse(savedPets) : initialPets;
  });

  const [consultations, setConsultations] = useState(() => {
    const savedAppointments = localStorage.getItem("vetAppointments");
    return savedAppointments ? JSON.parse(savedAppointments) : initialConsultations;
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem("vetAppointments", JSON.stringify(consultations));
  }, [consultations]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet context={{ pets, setPets, consultations, setConsultations, showToast }} />
      </main>
      <Footer />

      {toastMessage && <Toast key={toastKey} message={toastMessage} onDismiss={() => setToastMessage('')} />}

      {/* ================= CART MODAL START ================= */}
      <div
        id="cartModal"
        className="fixed inset-0 bg-black bg-opacity-40 hidden items-center justify-center z-50"
      >
        <div className="bg-white rounded-2xl shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 p-6 relative">
          <button
            id="closeCartModal"
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            🛒 Your Cart
          </h2>

          <div id="cartItemsContainer" className="space-y-4"></div>

          <p className="text-lg font-semibold text-gray-700 mt-4">
            Total: <span id="cartTotal" className="text-blue-600">$0</span>
          </p>

          <button
            id="checkoutBtn"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 w-full"
          >
            Checkout
          </button>
        </div>
      </div>
      {/* ================= CART MODAL END ================= */}
    </>
  );
};

export default Layout;
