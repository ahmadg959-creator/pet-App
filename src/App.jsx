import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/MainApp/Layout';
import HomePage from './components/MainApp/HomePage';
import MyPetsPage from './components/MainApp/MyPetsPage';
import ProfilePage from './components/MainApp/ProfilePage';
import ServicesPage from './components/MainApp/ServicesPage';
import CommunityPage from './components/MainApp/CommunityPage.jsx?v=1';
import VetDocPage from './components/MainApp/VetDocPage';
import Marketplace from './components/MainApp/Marketplace';
import CartPage from './components/MainApp/CartPage';

import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-pets/:petId" element={<MyPetsPage />} />
            <Route path="/my-pets" element={<MyPetsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/vet-doc" element={<VetDocPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
