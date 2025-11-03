import React from 'react';

const HomePage = ({ pets, consultations, communityPosts, setPage }) => {
  const mainPet = pets[0];
  const userName = "User"; // Replace with actual user data
  const nextReminder = mainPet?.reminders.find(r => new Date(r.date) > new Date());

  const findNextReminder = () => {
    if (!mainPet) return null;
    const upcomingReminders = mainPet.reminders.filter(r => new Date(r.date) > new Date());
    if (upcomingReminders.length === 0) return null;
    return upcomingReminders.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  };

  const daysUntil = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = Math.abs(targetDate - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const createOverviewCard = (icon, title, value, page, view, color) => {
    return (
      <div className={`p-4 rounded-2xl shadow-lg ${color}`}>
        <div className="flex items-center justify-between">
          <div className="text-2xl">{icon}</div>
          <button onClick={() => setPage(page, view)} className="text-sm font-semibold">View</button>
        </div>
        <div className="mt-2">
          <div className="text-sm">{title}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    );
  };

  return (
    <div id="home" className="page-content">
      {pets.length === 0 ? (
        <div id="home-empty-state" className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to PetCare!</h1>
          <p className="text-slate-500 mb-6">No pets yet? Let's add your furry friend and get started! 🐶💖</p>
          <button onClick={() => setPage('my-pets', 'add-pet-form')} className="shortcut-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
            Add Your First Pet
          </button>
        </div>
      ) : (
        <div id="home-dashboard">
          <div id="home-hero-section" className="bg-gradient-to-br from-sky-100 to-amber-50 p-8 rounded-3xl shadow-lg mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Welcome back, {userName}! 🐕</h1>
                <p className="text-lg text-slate-600 mt-2">Your pet’s world, all in one place.</p>
                {nextReminder && (
                  <div className="mt-4 bg-yellow-100 text-yellow-800 text-sm font-semibold p-3 rounded-xl inline-block shadow">
                    <strong>Reminder:</strong> {mainPet.name} is due for a {nextReminder.note.toLowerCase()} in {daysUntil(nextReminder.date)} days.
                  </div>
                )}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button onClick={() => setPage('my-pets')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors">View {mainPet.name}'s Profile</button>
                  <button onClick={() => setPage('vet-doc', 'find-vet')} className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-full transition-colors">Book a Vet Visit</button>
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
            {createOverviewCard('🐾', 'Your Pets', `${pets.length} Profiles`, 'my-pets', null, 'bg-sky-100 text-sky-800')}
            {createOverviewCard('💉', 'Next Reminder', nextReminder ? `${daysUntil(nextReminder.date)} days` : 'All caught up!', 'my-pets', null, 'bg-yellow-100 text-yellow-800')}
            {createOverviewCard('🩺', 'Recent Vet Visit', consultations.length > 0 ? `Dr. ${consultations[0].vetName.split(' ').pop()}` : 'None yet', 'vet-doc', 'consultations-vet', 'bg-red-100 text-red-800')}
            {createOverviewCard('💬', 'Community', `${communityPosts.length} new posts`, 'community', null, 'bg-green-100 text-green-800')}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;