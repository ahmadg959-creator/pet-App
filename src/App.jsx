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
import CommunityPage from './components/MainApp/CommunityPage';
import VetDocPage from './components/MainApp/VetDocPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-pets" element={<MyPetsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/vet-doc" element={<VetDocPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
