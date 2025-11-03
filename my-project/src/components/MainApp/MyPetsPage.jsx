import React, { useState } from 'react';

const MyPetsPage = ({ pets, setPets }) => {
  const [view, setView] = useState('dashboard'); // dashboard, form, detail
  const [selectedPet, setSelectedPet] = useState(null);

  const showPetDetailView = (petId) => {
    const pet = pets.find(p => p.id === petId);
    setSelectedPet(pet);
    setView('detail');
  };

  const calculateAge = (dob) => {
    if (!dob) return 'Unknown';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddPet = (newPet) => {
    setPets([newPet, ...pets]);
    setView('dashboard');
  };

  return (
    <div id="my-pets" className="page-content">
      {view === 'dashboard' && (
        <div id="pet-dashboard-view" className="pet-view">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">My Pets</h1>
            <button onClick={() => setView('form')} className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
              <span>Add Pet</span>
            </button>
          </div>

          {pets.length === 0 ? (
            <div id="no-pets-message" className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <p className="text-xl font-semibold text-slate-700 mt-4 mb-2">No Pets Yet</p>
              <p className="text-slate-500 mb-6">Add your furry, scaly, or feathery friends to get started!</p>
              <button onClick={() => setView('form')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors">Add Your First Pet</button>
            </div>
          ) : (
            <div id="pet-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pets.map(pet => (
                <div key={pet.id} onClick={() => showPetDetailView(pet.id)} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                  <div className="h-48 bg-slate-200">
                    <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-slate-800">{pet.name}</h3>
                    <p className="text-slate-500">{pet.breed}</p>
                    <div className="flex items-center justify-between text-sm mt-4 text-slate-600">
                      <span className="bg-slate-100 rounded-full px-3 py-1">{pet.gender}</span>
                      <span className="bg-slate-100 rounded-full px-3 py-1">{calculateAge(pet.dob)} years old</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'form' && (
        <AddPetForm setView={setView} handleAddPet={handleAddPet} />
      )}

      {view === 'detail' && (
        <PetDetailView pet={selectedPet} setView={setView} />
      )}
    </div>
  );
};

const AddPetForm = ({ setView, handleAddPet }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [photo, setPhoto] = useState('https://placehold.co/128x128/e2e8f0/94a3b8?text=Pet');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = {
      id: Date.now(),
      name,
      breed,
      dob,
      gender,
      photo,
      health: { vaccinations: [], allergies: [], medications: [] },
      reminders: [],
      gallery: []
    };
    handleAddPet(newPet);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="add-pet-form-view" className="pet-view">
      <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8 text-center">Add a New Pet</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <div className="flex flex-col items-center mb-6">
          <img src={photo} className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 mb-4" alt="Pet photo preview" />
          <label htmlFor="pet-photo" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-full text-sm transition-colors">
            Upload Photo
          </label>
          <input type="file" id="pet-photo" onChange={handlePhotoChange} className="hidden" accept="image/*" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="pet-name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" id="pet-name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Buddy" />
          </div>
          <div>
            <label htmlFor="pet-breed" className="block text-sm font-medium text-slate-700 mb-1">Breed</label>
            <input type="text" id="pet-breed" value={breed} onChange={(e) => setBreed(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Golden Retriever" />
          </div>
          <div>
            <label htmlFor="pet-dob" className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
            <input type="date" id="pet-dob" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center"><input type="radio" name="pet-gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span className="ml-2 text-slate-800">Male</span></label>
              <label className="flex items-center"><input type="radio" name="pet-gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span className="ml-2 text-slate-800">Female</span></label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-8">
          <button type="button" onClick={() => setView('dashboard')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Save Pet</button>
        </div>
      </form>
    </div>
  );
};

const PetDetailView = ({ pet, setView }) => {
  const calculateAge = (dob) => {
    if (!dob) return 'Unknown';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div id="pet-detail-view" className="pet-view">
      <button onClick={() => setView('dashboard')} className="mb-6 inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        Back to My Pets
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8">
        <img src={pet.photo} alt={pet.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white ring-4 ring-blue-500 flex-shrink-0" />
        <div className="text-center md:text-left w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">{pet.name}</h1>
          <p className="text-xl text-slate-500 mt-1">{pet.breed}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm mt-4 text-slate-600">
            <span className="bg-slate-100 rounded-full px-4 py-1.5">{pet.gender}</span>
            <span className="bg-slate-100 rounded-full px-4 py-1.5">{calculateAge(pet.dob)} years old</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPetsPage;