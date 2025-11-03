import React, { useState } from 'react';

const VetDocPage = ({ vets, consultations, setConsultations }) => {
  const [view, setView] = useState('menu'); // menu, find-vet, consultations-vet, ask-vet
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [rating, setRating] = useState(0);

  const handleBooking = (newConsultation) => {
    setConsultations([newConsultation, ...consultations]);
    // In a real app, you would likely show a confirmation modal
    alert('Appointment requested!');
  };

  const filteredVets = vets.filter(vet =>
    vet.city.toLowerCase().includes(city.toLowerCase()) &&
    (specialty === '' || vet.specialty === specialty) &&
    vet.rating >= rating
  );

  return (
    <div id="vet-doc" className="page-content">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Veterinary Services</h1>
        {view !== 'menu' && (
          <button onClick={() => setView('menu')} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span>Back to Menu</span>
          </button>
        )}
      </div>

      {view === 'menu' && (
        <div id="vet-doc-menu-view" className="vet-view grid grid-cols-1 md:grid-cols-3 gap-8">
          <button onClick={() => setView('find-vet')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">🔍</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Find a Vet</h2>
            <p className="text-slate-500 mt-1">Search for verified vets by location and specialty.</p>
          </button>
          <button onClick={() => setView('consultations-vet')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">🧾</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">My Consultations</h2>
            <p className="text-slate-500 mt-1">View your past and upcoming appointments.</p>
          </button>
          <button onClick={() => setView('ask-vet')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">💬</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Ask a Vet (AI)</h2>
            <p className="text-slate-500 mt-1">Get quick answers to general pet questions.</p>
          </button>
        </div>
      )}

      {view === 'find-vet' && (
        <div id="find-vet-view" className="vet-view">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="City (e.g., Multan)" value={city} onChange={(e) => setCity(e.target.value)} className="md:col-span-2 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                <option value="">All Specialties</option>
                <option>General Care</option>
                <option>Dentistry</option>
                <option>Surgery</option>
                <option>Dermatology</option>
              </select>
              <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                <option value="0">Any Rating</option>
                <option value="4">4 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
                <option value="2">2 Stars & Up</option>
              </select>
            </div>
          </div>
          <div id="vet-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVets.map(vet => (
              <div key={vet.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
                <img src={vet.photo} alt={vet.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-200" />
                <h3 className="text-xl font-bold text-slate-800">{vet.name}</h3>
                <p className="text-slate-500">{vet.specialty}</p>
                <div className="my-3 flex items-center gap-1">
                  {'★'.repeat(vet.rating)}{'☆'.repeat(5 - vet.rating)}
                  <span className="text-xs text-slate-500 ml-1">({vet.rating}.0)</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{vet.city}</p>
                <button onClick={() => handleBooking({ id: Date.now(), vetId: vet.id, vetName: vet.name, date: '2025-12-25', time: '12:00', reason: 'Holiday Checkup', status: 'Upcoming' })} className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors">Book</button>
              </div>
            ))}
          </div>
          {filteredVets.length === 0 && <p className="text-center text-slate-500 py-12">No veterinarians found matching your criteria.</p>}
        </div>
      )}

      {view === 'consultations-vet' && (
        <div id="consultations-vet-view" className="vet-view">
          <div id="consultations-content-area">
            <h2 class="text-3xl font-bold text-slate-800 mb-4">Upcoming</h2>
            {consultations.filter(c => c.status === 'Upcoming').map(c => (
              <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4 flex justify-between items-center">
                <div>
                  <p className="font-bold">{c.vetName}</p>
                  <p className="text-sm text-slate-500">{new Date(c.date + 'T' + c.time).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-sm text-slate-500">Reason: {c.reason}</p>
                </div>
                <span className="text-blue-600 font-medium bg-blue-100 text-xs py-1 px-3 rounded-full">{c.status}</span>
              </div>
            ))}
            {consultations.filter(c => c.status === 'Upcoming').length === 0 && <p className="text-slate-500 mb-8">No upcoming appointments.</p>}

            <h2 className="text-3xl font-bold text-slate-800 mt-8 mb-4">Past</h2>
            {consultations.filter(c => c.status === 'Past').map(c => (
              <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4 flex justify-between items-center opacity-70">
                <div>
                  <p className="font-bold">{c.vetName}</p>
                  <p className="text-sm text-slate-500">{new Date(c.date + 'T' + c.time).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <span className="text-slate-600 font-medium bg-slate-200 text-xs py-1 px-3 rounded-full">{c.status}</span>
              </div>
            ))}
            {consultations.filter(c => c.status === 'Past').length === 0 && <p className="text-slate-500">No past appointments.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default VetDocPage;