import React, { useEffect, useState } from 'react';

import ServiceCard from './ServiceCard';
import CommunityPost from './CommunityPost';
import QuickOverviewCard from './QuickOverviewCard';

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [petOfTheWeek, setPetOfTheWeek] = useState({});

  useEffect(() => {
    // Mock data
    setPets([
        {
            id: 1,
            name: "Max",
            breed: "German Shepherd",
            dob: "2021-05-10",
            photo: "https://placehold.co/600x400/c2b280/333333?text=Max",
            health: { 
                medications: [{ name: 'Heartworm Prev.', frequency: 'Monthly', nextDue: '2025-11-01'}]
            },
            reminders: [
                { type: 'Vet', date: '2025-10-23', note: 'Vaccination' },
                { type: 'Grooming', date: '2025-11-15', note: 'Full groom' }
            ]
        },
        {
            id: 2,
            name: "Bella",
            breed: "Siamese",
            dob: "2023-01-15",
            photo: "https://placehold.co/600x400/d1c4e9/333333?text=Bella",
            health: { medications: [] },
            reminders: []
        }
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

    setPetOfTheWeek({ name: 'Bella', owner: 'Ahmad', photo: 'https://placehold.co/600x400/d1c4e9/333?text=Bella' });
  }, []);

  return (
    <div id="home" className="page-content">
      {pets.length === 0 ? (
        <div id="home-empty-state" className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to PetCare!</h1>
          <p className="text-slate-500 mb-6">No pets yet? Let's add your furry friend and get started! 🐶💖</p>
          <button data-page="my-pets" data-view="add-pet-form" className="shortcut-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
              Add Your First Pet
          </button>
        </div>
      ) : (
        <div id="home-dashboard">
          {/* Hero Section */}
          <div id="home-hero-section" className="bg-gradient-to-br from-sky-100 to-amber-50 p-8 rounded-3xl shadow-lg mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Welcome back, Ahmad! 🐕</h1>
                    <p className="text-lg text-slate-600 mt-2">Your pet’s world, all in one place.</p>
                    {pets[0]?.reminders && pets[0].reminders.length > 0 &&
                    <div className="mt-4 bg-yellow-100 text-yellow-800 text-sm font-semibold p-3 rounded-xl inline-block shadow">
                        <strong>Reminder:</strong> {pets[0].name} is due for a {pets[0].reminders[0].note.toLowerCase()} next week.
                    </div>}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button data-pet-id={pets[0]?.id} className="view-pet-profile-btn bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors">View {pets[0]?.name}'s Profile</button>
                        <button data-page="vet-doc" data-view="find-vet" className="shortcut-btn bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-full transition-colors">Book a Vet Visit</button>
                    </div>
                </div>
                <div className="relative w-48 h-48 flex-shrink-0">
                    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                       <path fill="#FDBF60" d="M100 180 C 60 180, 60 120, 100 120 C 140 120, 140 180, 100 180 Z" />
                       <path fill="#333" d="M100 120 Q 80 110, 70 90 T 70 60 Q 80 40, 100 40 Q 120 40, 130 60 T 130 90 Q 120 110, 100 120 Z" />
                       <circle className="blinking-eye" fill="white" cx="85" cy="75" r="8" />
                       <circle fill="black" cx="85" cy="75" r="4" />
                       <circle className="blinking-eye" fill="white" cx="115" cy="75" r="8" />
                       <circle fill="black" cx="115" cy="75" r="4" />
                       <path fill="none" stroke="black" strokeWidth="3" d="M95 95 Q 100 105, 105 95" />
                    </svg>
                </div>
            </div>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <QuickOverviewCard icon='🐾' title='Your Pets' value={`${pets.length} Profiles`} page='my-pets' colorClass='bg-sky-100 text-sky-800' />
              <QuickOverviewCard icon='💉' title='Next Reminder' value={pets[0]?.reminders ? `${Math.ceil(Math.abs(new Date(pets[0].reminders[0].date) - new Date()) / (1000 * 60 * 60 * 24))} days` : 'All caught up!'} page='my-pets' colorClass='bg-yellow-100 text-yellow-800' />
              <QuickOverviewCard icon='🩺' title='Recent Vet Visit' value={consultations.length > 0 ? `Dr. ${consultations[0].vetName.split(' ').pop()}` : 'None yet'} page='vet-doc' view='consultations-vet' colorClass='bg-red-100 text-red-800' />
              <QuickOverviewCard icon='💬' title='Community' value={`${communityPosts.length} new posts`} page='community' colorClass='bg-green-100 text-green-800' />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                   {/* Community Highlight Section */}
                  <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">Community Highlights</h2>
                      <div id="home-community-highlight" className="space-y-4">
                          {communityPosts.slice(0, 2).map(post => <CommunityPost key={post.id} post={post} />)}
                      </div>
                      <div className="mt-4 text-center">
                          <button data-page="community" className="shortcut-btn bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-full transition-colors">View More Posts</button>
                      </div>
                  </div>
                  
                   {/* Vet & Services Snapshot */}
                   <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">Find Help Nearby</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                           <ServiceCard icon='🧭' title='Find Nearby Vet' subtitle='⭐ 4.9 / 5 trusted vets' page='vet-doc' view='find-vet' />
                           <ServiceCard icon='🧼' title='Book a Groomer' subtitle='Top-rated groomers' page='services' view='grooming' />
                           <ServiceCard icon='🛒' title='Shop Products' subtitle='Vet-approved items' page='services' view='marketplace' />
                      </div>
                   </div>
              </div>
              {/* Sidebar Column */}
              <div className="space-y-8">
                  {/* Daily Tip / Fun Fact */}
                  <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">🐾 Daily Tip</h2>
                      <div id="home-daily-tip" className="bg-white rounded-2xl shadow-lg p-6">
                          <p className="text-slate-700">Remember to always keep fresh water available for your pets, especially during hot weather.</p>
                      </div>
                  </div>
                   {/* Pet of the Week */}
                   <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">🏅 Pet of the Week</h2>
                      <div id="home-pet-of-the-week" className="bg-white rounded-2xl shadow-lg p-6">
                          <img src={petOfTheWeek.photo} className="w-full h-32 object-cover rounded-xl mb-3 shadow-md" />
                          <h3 className="text-lg font-bold text-slate-800">{petOfTheWeek.name} - Most Loved Smile!</h3>
                          <button className="mt-3 text-sm bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-1 px-4 rounded-full transition-colors shortcut-btn" data-page="community">Nominate Your Pet</button>
                      </div>
                   </div>
              </div>
          </div>

           {/* Final CTA */}
           <div className="mt-16 text-center bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Keep your pet happy, healthy, and famous!</h2>
              <p className="text-slate-500 mb-6">It all starts with creating a profile for your best friend.</p>
              <div className="flex justify-center gap-4">
                  <button data-page="my-pets" data-view="add-pet-form" className="shortcut-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors">Add Your Pet Now</button>
                  <button data-page="community" className="shortcut-btn bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors">Join the Community</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
