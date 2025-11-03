import React, { useState, useEffect } from 'react';
import Header from './components/MainApp/Header';
import Footer from './components/MainApp/Footer';
import HomePage from './components/MainApp/HomePage';
import MyPetsPage from './components/MainApp/MyPetsPage';
import VetDocPage from './components/MainApp/VetDocPage';
import CommunityPage from './components/MainApp/CommunityPage';
import ServicesPage from './components/MainApp/ServicesPage';
import ProfilePage from './components/MainApp/ProfilePage';
import AuthFlow from './components/Auth/AuthFlow';

function App() {
  const [page, setPage] = useState('auth'); // Default to auth flow
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);

  useEffect(() => {
    // Simulate initial data loading
    setPets([
      {
        id: 1,
        name: "Max",
        breed: "German Shepherd",
        dob: "2021-05-10",
        gender: "Male",
        photo: "https://placehold.co/600x400/c2b280/333333?text=Max",
        health: {
          vaccinations: [{ id: 1, name: 'Rabies', date: '2022-05-15', brand: 'Rabisin', clinic: 'City Vets' }],
          allergies: [],
          medications: [{ name: 'Heartworm Prev.', frequency: 'Monthly', nextDue: '2025-11-01' }]
        },
        reminders: [
          { type: 'Vet', date: '2025-10-23', note: 'Vaccination' },
          { type: 'Grooming', date: '2025-11-15', note: 'Full groom' }
        ],
        gallery: []
      },
      {
        id: 2,
        name: "Bella",
        breed: "Siamese",
        dob: "2023-01-15",
        gender: "Female",
        photo: "https://placehold.co/600x400/d1c4e9/333333?text=Bella",
        health: { vaccinations: [], allergies: ["Dairy"], medications: [] },
        reminders: [],
        gallery: []
      }
    ]);

    setVets([
      { id: 1, name: 'Dr. Emily Carter', specialty: 'General Care', city: 'Multan', rating: 5, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=EC' },
      { id: 2, name: 'Dr. Johnathan Lee', specialty: 'Dentistry', city: 'Multan', rating: 4, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=JL' },
      { id: 3, name: 'Dr. Sarah Khan', specialty: 'Surgery', city: 'Lahore', rating: 5, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=SK' },
    ]);

    setConsultations([
      { id: 1, vetId: 3, vetName: 'Dr. Sarah Khan', date: '2025-10-02', time: '10:00', reason: 'Checkup', status: 'Past' },
      { id: 2, vetId: 1, vetName: 'Dr. Emily Carter', date: '2025-09-05', time: '14:30', reason: 'Vaccination', status: 'Past' },
    ]);

    setCommunityPosts([
      { id: 1, userName: 'Alice', userAvatar: 'https://placehold.co/100x100/F472B6/FFFFFF?text=A', petPhoto: 'https://placehold.co/600x400/f9a8d4/333?text=Mochi', caption: 'Mochi enjoying the sunny spot on the carpet! ☀️ #catlife', likes: 125, comments: 12, liked: false },
      { id: 2, userName: 'Bob', userAvatar: 'https://placehold.co/100x100/60A5FA/FFFFFF?text=B', petPhoto: 'https://placehold.co/600x400/93c5fd/333?text=Rocky', caption: 'Rocky loves his new frisbee! We played for hours today.', likes: 88, comments: 5, liked: true },
      { id: 3, userName: 'Ahmad', userAvatar: 'https://placehold.co/100x100/FBBF24/FFFFFF?text=A', petPhoto: 'https://placehold.co/600x400/c2b280/333?text=Max', caption: 'Buddy just learned a new trick!', likes: 231, comments: 25, liked: false },
    ]);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage pets={pets} consultations={consultations} communityPosts={communityPosts} setPage={setPage} />;
      case 'my-pets':
        return <MyPetsPage pets={pets} setPets={setPets} />;
      case 'vet-doc':
        return <VetDocPage vets={vets} consultations={consultations} setConsultations={setConsultations} />;
      case 'community':
        return <CommunityPage communityPosts={communityPosts} setCommunityPosts={setCommunityPosts} />;
      case 'services':
        return <ServicesPage />;
      case 'profile':
        return <ProfilePage setPage={setPage} />;
      case 'auth':
      default:
        return <AuthFlow setPage={setPage} />;
    }
  };

  return (
    <div id="app" className="flex flex-col min-h-screen">
      {page !== 'auth' && <Header setPage={setPage} />}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      {page !== 'auth' && <Footer />}
    </div>
  );
}

export default App;