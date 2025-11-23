import React, { useState, useEffect } from 'react';
// For the growth chart.
// You'll need to install these:
// npm install chart.js react-chartjs-2
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

 const initialPets = [
    {
        id: 1,
        name: "Max",
        breed: "German Shepherd",
        dob: "2021-05-10",
        gender: "Male",
        photo: "https://placehold.co/600x400/c2b280/333333?text=Max",
        health: {
            vaccinations: [ { id: 1, name: 'Rabies', brand: 'Rabisin', date: '2024-05-15', clinic: 'City Vets', status: 'completed', nextDue: 
 '2025-05-15' }],
            deworming: [ { id: 1, name: 'Drontal', date: '2024-08-01', clinic: 'Home', status: 'completed', nextDue: '2024-11-01' } ],
            medications: [{ id: 1, name: 'Heartworm Prev.', dosage: '1 tablet', frequency: 'Monthly', startDate: '2024-01-01', endDate: null, status: 'active', notes: 'With food' }],
            medicalStatus: {
                allergies: 'Pollen, Chicken',
       
          conditions: 'Slight hip dysplasia',
                microchip: '985112009876543',
                bloodType: 'DEA 1.1+'
            },
            medicalHistory: [
                { id: 1, date: '2023-02-20', title: 'Broken Paw', vet: 'Dr. Smith', notes: 'Cast applied for 4 weeks.' }
            ]
        },
        growth: [
            { id: 1, date: '2021-07-10', weight_kg: 5.2, height_cm: 30, notes: 'First checkup', photo: 'https://placehold.co/100x100/c2b280/333333?text=5kg' },
            { id: 2, date: '2022-01-10', weight_kg: 15.8, height_cm: 55, notes: 'Growing fast!', photo: 'https://placehold.co/100x100/c2b280/333333?text=15kg' },
            
 { id: 3, date: '2022-05-15', weight_kg: 25.0, height_cm: 62, notes: 'Vet visit', photo: 'https://placehold.co/100x100/c2b280/333333?text=25kg' }
        ],
        reminders: [
            { id: 1, title: 'Annual Vaccination', type: 'Vet', date: '2025-10-23', time: '14:30', repeat: 'None', notes: 'Rabies and booster shots.', status: 'pending' },
            { id: 2, title: 'Full Grooming', type: 'Grooming', date: '2025-11-15', time: '11:00', repeat: 'None', notes: 'Ask for summer cut.', status: 'pending' },
   
          { id: 3, title: 'Heartworm Pill', type: 'Medication', date: '2025-09-01', time: '08:00', repeat: 'Monthly', notes: '', status: 'completed' }
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
        health: { 
            vaccinations: [],
            deworming: [],
            medications: [],
            medicalStatus: {
                allergies: 'Dairy',
               
  conditions: '',
                microchip: '',
                bloodType: ''
            },
            medicalHistory: [],
        },
        growth: [],
        reminders: [],
        gallery: []
    
 }
];

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
 const MyPetsPage = () => {
    const [pets, setPets] = useState(initialPets);
    const [view, setView] = useState('dashboard');
 // dashboard, add-pet, pet-detail
    const [selectedPetId, setSelectedPetId] = useState(null);
 // State for Reminder Modal and Toast
    const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
    const [editingReminder, setEditingReminder] = useState(null);
 const [petForReminder, setPetForReminder] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastKey, setToastKey] = useState(0);
 const selectedPet = pets.find(p => p.id === selectedPetId);

    const handleAddPet = (newPetData) => {
        const newPet = {
            ...newPetData,
            id: Date.now(),
            health: { 
                vaccinations: [], 
                deworming: [], 
                medications: [], 
                medicalHistory: [], 
                medicalStatus: { 
                    allergies: '',
                    conditions: '', 
                    microchip: '', 
                    bloodType: '' 
                } 
            },
            growth: [],
     
        reminders: [],
            gallery: []
        };
 setPets([...pets, newPet]);
        setView('dashboard');
    };

    const handleUpdatePet = (updatedPet) => {
        setPets(pets.map(p => p.id === updatedPet.id ? updatedPet : p));
 };

    const showToast = (message) => {
        setToastMessage(message);
        setToastKey(prevKey => prevKey + 1);
 // Re-trigger the toast animation
    };

    const handleOpenReminderModal = (pet, reminder = null) => {
        setPetForReminder(pet);
 setEditingReminder(reminder);
        setIsReminderModalOpen(true);
    };

    const handleSaveReminder = (reminderData) => {
        if (!petForReminder) return;
 let updatedReminders;
        if (editingReminder) {
            // Editing existing reminder
            updatedReminders = petForReminder.reminders.map(r => r.id === editingReminder.id ? { ...r, ...reminderData } : r);
 showToast('Reminder updated!');
        } else {
            // Adding new reminder
            const newReminder = { ...reminderData, id: Date.now(), status: 'pending' };
 updatedReminders = [...(petForReminder.reminders || []), newReminder];
            showToast('Reminder added!');
        }

        handleUpdatePet({ ...petForReminder, reminders: updatedReminders });
 setIsReminderModalOpen(false);
    };

    const showDashboard = () => {
        setView('dashboard');
        setSelectedPetId(null);
    };
 const showAddPetForm = () => setView('add-pet');

    const showPetDetail = (petId) => {
        setSelectedPetId(petId);
 setView('pet-detail');
    };

    return (
        <>
            <div id="my-pets-content">
                {view === 'dashboard' && <PetDashboard pets={pets} onAddPet={showAddPetForm} onSelectPet={showPetDetail} />}
                {view === 'add-pet' && <AddPetForm onAddPet={handleAddPet} onCancel={showDashboard} />}
                {view === 'pet-detail' && selectedPet && <PetDetailView pet={selectedPet} onUpdatePet={handleUpdatePet} onBack={showDashboard} onOpenReminderModal={handleOpenReminderModal} showToast={showToast} />}
  
           </div>
            {isReminderModalOpen && (
                <ReminderModal isOpen={isReminderModalOpen} onClose={() => setIsReminderModalOpen(false)} onSave={handleSaveReminder} existingReminder={editingReminder} />
            )}
            {toastMessage && <Toast key={toastKey} message={toastMessage} onDismiss={() => setToastMessage('')} />}
        </>
    );
 };

const PetDashboard = ({ pets, onAddPet, onSelectPet }) => {
    const calculateAge = (dob) => {
        if(!dob) return 'Unknown';
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
        <div id="pet-dashboard-view" className="pet-view">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">My Pets</h1>
                {pets.length > 0 && (
                    <button onClick={onAddPet} className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 
 px-5 rounded-full transition-colors flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        <span>Add Pet</span>
               
      </button>
                )}
            </div>
            
            {pets.length > 0 ? (
                <div id="pet-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 
    {pets.map(pet => (
                        <div key={pet.id} onClick={() => onSelectPet(pet.id)} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                            <div className="h-48 bg-slate-200">
                            
     <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 
 className="text-2xl font-bold text-slate-800">{pet.name}</h3>
                                <p className="text-slate-500">{pet.breed}</p>
                                <div className="flex items-center justify-between text-sm mt-4 text-slate-600">
                           
          <span className="bg-slate-100 rounded-full px-3 py-1">{pet.gender}</span>
                                    <span className="bg-slate-100 rounded-full px-3 py-1">{calculateAge(pet.dob)} years old</span>
                                </div>
             
                </div>
                        </div>
                    ))}
                </div>
            ) : (
           
      <div id="no-pets-message" className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <p className="text-xl 
 font-semibold text-slate-700 mt-4 mb-2">No Pets Yet</p>
                    <p className="text-slate-500 mb-6">Add your furry, scaly, or feathery friends to get started!</p>
                    <button onClick={onAddPet} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors">Add Your First Pet</button>
                </div>
            )}
    
     </div>
    );
};
 const AddPetForm = ({ onAddPet, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        dob: '',
        gender: 'Male',
        photo: 'https://placehold.co/128x128/e2e8f0/94a3b8?text=Pet'
    });
 const handleChange = (e) => {
        const { id, value, name } = e.target;
 setFormData(prev => ({ ...prev, [id || name]: value }));
    };
 const handlePhotoChange = (e) => {
        const file = e.target.files[0];
 if (file) {
            const reader = new FileReader();
 reader.onload = (e) => {
                setFormData(prev => ({ ...prev, photo: e.target.result }));
 };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
 onAddPet(formData);
    };

    return (
        <div id="add-pet-form-view" className="pet-view">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8 text-center">Add a New Pet</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
                <div className="flex flex-col items-center mb-6">
                    <img id="photo-preview" src={formData.photo} className="w-32 h-32 
 rounded-full object-cover border-4 border-slate-200 mb-4" alt="Pet photo preview" />
                    <label htmlFor="pet-photo" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-full text-sm transition-colors">
                        Upload Photo
                    </label>
                
     <input type="file" id="pet-photo" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
     
                    <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Buddy" />
                    </div>
                    <div>
                        
 <label htmlFor="breed" className="block text-sm font-medium text-slate-700 mb-1">Breed</label>
                        <input type="text" id="breed" value={formData.breed} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Golden Retriever" />
                    </div>
                    <div>
            
             <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                        <input type="date" id="dob" value={formData.dob} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    </div>
                    <div>
 
                        <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center"><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span 
 className="ml-2 text-slate-800">Male</span></label>
                            <label className="flex items-center"><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span className="ml-2 text-slate-800">Female</span></label>
                        </div>
                    </div>
         
        </div>
                
                <div className="flex items-center justify-end gap-4 mt-8">
                    <button type="button" onClick={onCancel} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold 
 py-3 px-6 rounded-lg transition-colors">Save Pet</button>
                </div>
            </form>
        </div>
    );
 };

const PetDetailView = ({ pet, onUpdatePet, onBack, onOpenReminderModal, showToast }) => {
    const [activeTab, setActiveTab] = useState('health');
 const [bio, setBio] = useState('');
    const [isBioLoading, setIsBioLoading] = useState(false);
 const calculateAge = (dob) => {
        if(!dob) return 'Unknown';
 const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
 const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
 }
        return age;
    };
 const callGeminiAPI = async (userPrompt, systemInstruction) => {
        // This is a mock function.
        // In a real app, you'd fetch from your backend.
        console.log("Calling Gemini API with prompt:", userPrompt);
 return new Promise(resolve => setTimeout(() => {
            resolve(`Hi, I'm ${pet.name}! I'm a fun-loving ${pet.breed}. I love long walks on the beach and chasing squirrels. I'm a good boy/girl and I love my human!`);
        }, 1500));
 };

    const generateBio = async () => {
        setIsBioLoading(true);
        setBio('');
 const systemInstruction = "You are a creative pet biographer. Write a short, fun, and heartwarming personality bio for a pet in the first person (from the pet's perspective). The bio should be one paragraph and capture a unique personality.";
 const userPrompt = `My name is ${pet.name}, I'm a ${calculateAge(pet.dob)} year old ${pet.breed}. Write my personality bio.`;
 const generatedBio = await callGeminiAPI(userPrompt, systemInstruction);
        setBio(generatedBio);
        setIsBioLoading(false);
    };

    return (
        <div id="pet-detail-view" className="pet-view">
            <button onClick={onBack} className="mb-6 inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              
   Back to My Pets
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8">
                <img src={pet.photo} alt={pet.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white ring-4 ring-blue-500 flex-shrink-0" />
                <div 
 className="text-center md:text-left w-full">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">{pet.name}</h1>
                    <p className="text-xl text-slate-500 mt-1">{pet.breed}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm mt-4 text-slate-600">
                       
  <span className="bg-slate-100 rounded-full px-4 py-1.5">{pet.gender}</span>
                        <span className="bg-slate-100 rounded-full px-4 py-1.5">{calculateAge(pet.dob)} years old</span>
                    </div>
                    <div className="mt-4">
                        
 <button onClick={generateBio} disabled={isBioLoading} className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2 disabled:bg-purple-300">
                            ✨ {isBioLoading ?
 'Generating...' : 'Generate Personality Bio'}
                        </button>
                    </div>
                </div>
            </div>

            {bio && (
          
       <div id="pet-bio-container" className="bg-purple-50 border border-purple-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">About {pet.name}</h3>
                    <p id="pet-bio-content" className="text-purple-800 leading-relaxed">{bio}</p>
                </div>
            )}
           
 
            <div className="border-b border-slate-200 mb-6">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    <button onClick={() => setActiveTab('health')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'health' ?
 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Health Records</button>
                    <button onClick={() => setActiveTab('growth')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'growth' ?
 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Growth Tracker</button>
                    <button onClick={() => setActiveTab('reminders')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reminders' ?
 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Reminders</button>
                    <button onClick={() => setActiveTab('gallery')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'gallery' ?
 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Media Gallery</button>
                </nav>
            </div>

            <div id="tab-content-container">
                {activeTab === 'health' && <HealthTab pet={pet} onUpdatePet={onUpdatePet} callGeminiAPI={callGeminiAPI} showToast={showToast} />}
                
                {activeTab === 'growth' && <GrowthTab pet={pet} onUpdatePet={onUpdatePet} callGeminiAPI={callGeminiAPI} />}
       
                 {activeTab === 'reminders' && <RemindersTab pet={pet} onUpdatePet={onUpdatePet} callGeminiAPI={callGeminiAPI} onOpenModal={onOpenReminderModal} />}
                {activeTab === 'gallery' && <div className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8"><p className="text-center text-slate-500">Editing for Media Gallery coming soon!</p></div>}
            </div>
        </div>
    );
 };

const GrowthTab = ({ pet, onUpdatePet, callGeminiAPI }) => {
    const [showForm, setShowForm] = useState(false);
 const [editingEntry, setEditingEntry] = useState(null);
    const [analysis, setAnalysis] = useState('');
    const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

 const calculateAgeAtDate = (dob, eventDate) => {
        if (!dob || !eventDate) return 'Unknown';
 const birthDate = new Date(dob);
        const gTargetDate = new Date(eventDate);
        let gYears = gTargetDate.getFullYear() - birthDate.getFullYear();
 let gMonths = gTargetDate.getMonth() - birthDate.getMonth();
        let gDays = gTargetDate.getDate() - birthDate.getDate();
 if (gDays < 0) {
            gMonths--;
 const gPrevMonth = new Date(gTargetDate.getFullYear(), gTargetDate.getMonth(), 0);
            gDays += gPrevMonth.getDate();
 }
        if (gMonths < 0) {
            gYears--;
 gMonths += 12;
        }
        
        let gResult = [];
 if (gYears > 0) gResult.push(`${gYears}y`);
        if (gMonths > 0) gResult.push(`${gMonths}m`);
 if (gYears === 0 && gMonths === 0 && gDays > 0) gResult.push(`${gDays}d`);
        if (gResult.length === 0) return 'Newborn';
 return gResult.join(' ');
    };

    const handleAnalyzeGrowth = async () => {
        if (!pet.growth || pet.growth.length < 2) {
            alert("Not enough growth data to analyze. Please add at least two entries.");
 return;
        }
        setIsAnalysisLoading(true);
        setAnalysis('');
 const systemInstruction = "You are a friendly veterinary assistant. Analyze the pet's growth data (date, weight in kg) and provide a one-paragraph summary (under 75 words) about their weight trend. Conclude with one piece of friendly, general advice on diet or exercise. Address the owner directly.";
 const growthDataString = pet.growth
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(g => `Date: ${g.date}, Weight: ${g.weight_kg || 'N/A'} kg`)
            .join('; ');
 const userPrompt = `My pet is ${pet.name}, a ${pet.breed}. Here is their growth data: [${growthDataString}].

 Please analyze their weight trend and provide a summary and one piece of advice.`;

        const analysisText = await callGeminiAPI(userPrompt, systemInstruction);
 setAnalysis(analysisText);
        setIsAnalysisLoading(false);
    };

    const handleSaveEntry = (entryData) => {
        let updatedGrowth;
 if (editingEntry) {
            updatedGrowth = pet.growth.map(g => g.id === editingEntry.id ? { ...g, ...entryData } : g);
 } else {
            const newEntry = { ...entryData, id: Date.now() };
 updatedGrowth = [...(pet.growth || []), newEntry];
        }
        onUpdatePet({ ...pet, growth: updatedGrowth });
        setShowForm(false);
 setEditingEntry(null);
    };

    const handleDeleteEntry = (entryId) => {
        if (window.confirm('Are you sure you want to delete this growth entry?')) {
            const updatedGrowth = pet.growth.filter(g => g.id !== entryId);
 onUpdatePet({ ...pet, growth: updatedGrowth });
        }
    };

    const sortedGrowth = pet.growth ?
 [...pet.growth].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
 // Chart.js data and options
    const chartData = {
        labels: (pet.growth || []).sort((a, b) => new Date(a.date) - new Date(b.date)).map(g => g.date),
        datasets: [
            {
                label: 'Weight (kg)',
                data: (pet.growth || []).sort((a, b) => new Date(a.date) - new Date(b.date)).map(g => g.weight_kg),
  
               borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                yAxisID: 'yWeight',
                tension: 0.3
            },
  
           {
                label: 'Height (cm)',
                data: (pet.growth || []).sort((a, b) => new Date(a.date) - new Date(b.date)).map(g => g.height_cm),
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
       
          fill: false,
                yAxisID: 'yHeight',
                tension: 0.3,
                borderDash: [5, 5]
            }
        ]
    };
 const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
            x: { title: { display: true, text: 'Date' } },
            yWeight: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Weight (kg)', color: '#3b82f6' } },
     
        yHeight: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'Height (cm)', color: '#8b5cf6' }, grid: { drawOnChartArea: false } }
        }
    };
 return (
        <div id="tab-growth" className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-slate-800">Growth Tracker</h3>
                <div className="flex-shrink-0 flex gap-2">
                    <button onClick={handleAnalyzeGrowth} disabled={isAnalysisLoading} className="text-sm bg-purple-100 
 text-purple-700 font-semibold py-2 px-4 rounded-full hover:bg-purple-200 flex items-center gap-2 disabled:bg-purple-200 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2l4.487.653a1 1 0 01.557 1.705l-3.248 3.165.766 4.47a1 1 0 01-1.45 1.054L12 15.01l-4.007 2.107a1 
 1 0 01-1.45-1.054l.766-4.47-3.248-3.165a1 1 0 01.557-1.705l4.487-.653L11.033 2.744A1 1 0 0112 2z" clipRule="evenodd" /></svg>
                        {isAnalysisLoading ?
 'Analyzing...' : 'Analyze Growth'}
                    </button>
                    <button onClick={() => { setEditingEntry(null);
 setShowForm(true); }} className="text-sm bg-blue-100 text-blue-600 font-semibold py-2 px-4 rounded-full hover:bg-blue-200 flex items-center gap-2"> {/* show-add-growth-form-btn */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        Add Entry
     
                </button>
                </div>
            </div>

            {showForm && <GrowthForm onSave={handleSaveEntry} onCancel={() => { setShowForm(false);
 setEditingEntry(null); }} existingEntry={editingEntry} />}
            {/* growth-analysis-loader */}
            {isAnalysisLoading && <div className="flex justify-center my-2"><div className="loader" style={{ borderTopColor: '#7e22ce' }}></div></div>}
            {analysis && (
                <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Growth 
 Analysis</h3>
                    <p className="text-purple-800 leading-relaxed">{analysis}</p>
                </div>
            )}

            <div className="mb-8 p-4 bg-slate-50 rounded-lg h-64 md:h-80 relative card">
                {(pet.growth && pet.growth.length > 0) ?
 <Line options={chartOptions} data={chartData} /> : <p className="text-center text-slate-500 pt-24">No growth data to display chart.</p>}
            </div>

            <div className="space-y-4">
                {sortedGrowth.length > 0 ?
 sortedGrowth.map(g => (
                    <div key={g.id} className="p-4 bg-white rounded-lg border flex items-start gap-4">
                        <img src={g.photo || 'https://placehold.co/64x64/e2e8f0/94a3b8?text=Photo'} alt="Growth" className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200 flex-shrink-0" />
                        <div className="flex-1">
         
                    <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-sm text-slate-500">{g.date} ({calculateAgeAtDate(pet.dob, g.date)})</div>
     
                                <div className="text-lg font-semibold text-slate-800">{g.weight_kg ?? '-'} kg • {g.height_cm ?? '-'} cm</div>
                                    <div className="text-sm text-slate-500 mt-1">{g.notes || 'No notes'}</div>
                
                 </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div>
            
                             <button onClick={() => { setEditingEntry(g);
 setShowForm(true); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-1 px-3 rounded-full">Edit</button>
                                        <button onClick={() => handleDeleteEntry(g.id)} className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-1 px-3 rounded-full ml-2">Delete</button>
                                    </div>
   
                              </div>
                            </div>
                        </div>
                   
  </div>
                )) : <p className="text-slate-500 text-center py-8">No growth data yet.</p>}
            </div>
        </div>
    );
 };

const GrowthForm = ({ onSave, onCancel, existingEntry }) => {
    const [formData, setFormData] = useState({
        date: '', weight_kg: '', height_cm: '', notes: '', photo: 'https://placehold.co/64x64/e2e8f0/94a3b8?text=Photo'
    });
 useEffect(() => {
        if (existingEntry) {
            setFormData({
                date: existingEntry.date || '',
                weight_kg: existingEntry.weight_kg || '',
                height_cm: existingEntry.height_cm || '',
                notes: existingEntry.notes || 
 '',
                photo: existingEntry.photo || 'https://placehold.co/64x64/e2e8f0/94a3b8?text=Photo'
            });
        }
    }, [existingEntry]);
 const handleChange = (e) => {
        const { id, value } = e.target;
 setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
 if (file) {
            const reader = new FileReader();
 reader.onload = (event) => setFormData(prev => ({ ...prev, photo: event.target.result }));
            reader.readAsDataURL(file);
        }
    };
 const handleSubmit = (e) => {
        e.preventDefault();
 if (!formData.date || (!formData.weight_kg && !formData.height_cm)) {
            alert('Please enter a date and at least weight or height.');
 return;
        }
        onSave({
            ...formData,
            weight_kg: parseFloat(formData.weight_kg) || null,
            height_cm: parseFloat(formData.height_cm) || null,
        });
 };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-slate-50 rounded-xl border card">
            <h4 className="text-lg font-semibold mb-3">{existingEntry ? 'Edit' : 'Add New'} Growth Entry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="date" id="date" value={formData.date} onChange={handleChange} required className="p-2 border rounded-md w-full" />
                <input type="number" 
 step="0.1" id="weight_kg" value={formData.weight_kg} onChange={handleChange} placeholder="Weight (kg)" className="p-2 border rounded-md w-full" />
                <input type="number" step="0.1" id="height_cm" value={formData.height_cm} onChange={handleChange} placeholder="Height (cm)" className="p-2 border rounded-md w-full" />
                <input type="text" id="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (e.g., vet checkup)" className="p-2 border rounded-md w-full md:col-span-2" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
   
              <div className="flex items-center gap-3">
                    <img src={formData.photo} className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200" alt="Growth" />
                    <label htmlFor="new-growth-photo" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-full text-sm transition-colors">Upload Photo</label>
                    <input type="file" id="new-growth-photo" 
 onChange={handlePhotoChange} className="hidden" accept="image/*" />
                </div>
                <div className="flex-grow flex justify-end gap-4 mt-4 sm:mt-0">
                    <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
                    <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save Entry</button>
 
                </div>
            </div>
        </form>
    );
 };

const RemindersTab = ({ pet, onUpdatePet, callGeminiAPI, onOpenModal }) => {
    // State for AI suggestions
    const [isAISuggesting, setIsAISuggesting] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [selectedSuggestions, setSelectedSuggestions] = useState(new Set());

    const [filter, setFilter] = useState('Upcoming');
 const getReminderIcon = (type) => ({'Vet': '💉','Grooming': '✂️','Medication': '💊','Feeding': '🍖','Walk': '🦮','Growth': '🌱','Other': '🔔'}[type] || '🔔');
 const calculateAge = (dob) => {
        if(!dob) return 'Unknown';
 const ageDiffMs = Date.now() - new Date(dob).getTime();
        return Math.abs(new Date(ageDiffMs).getUTCFullYear() - 1970);
    };
 const getReminderStatus = (reminder) => {
        const today = new Date();
 today.setHours(0, 0, 0, 0);
        const reminderDateTime = new Date(`${reminder.date}T${reminder.time || '00:00:00'}`);
 if (reminder.status === 'completed') return { text: 'Completed', classes: 'bg-green-100 text-green-800' };
 if (reminderDateTime < today && reminder.status === 'pending') return { text: 'Missed', classes: 'bg-red-100 text-red-800' };
 if (reminder.status === 'missed') return { text: 'Missed', classes: 'bg-red-100 text-red-800' };
        return { text: 'Pending', classes: 'bg-blue-100 text-blue-800' };
 };

    const handleComplete = (reminderId) => {
        const reminder = pet.reminders.find(r => r.id === reminderId);
 if (!reminder) return;

        let updatedReminders = pet.reminders.map(r => r.id === reminderId ? { ...r, status: 'completed' } : r);
 if (reminder.repeat !== 'None') {
            const newReminder = { ...reminder, id: Date.now(), status: 'pending' };
 const currentDate = new Date(`${reminder.date}T${reminder.time || '00:00'}`);
            if (reminder.repeat === 'Daily') currentDate.setDate(currentDate.getDate() + 1);
 else if (reminder.repeat === 'Weekly') currentDate.setDate(currentDate.getDate() + 7);
            else if (reminder.repeat === 'Monthly') currentDate.setMonth(currentDate.getMonth() + 1);
            newReminder.date = currentDate.toISOString().split('T')[0];
            updatedReminders.push(newReminder);
 }

        onUpdatePet({ ...pet, reminders: updatedReminders });
    };
 const handleDelete = (reminderId) => {
        if (window.confirm('Are you sure you want to delete this reminder?')) {
            const updatedReminders = pet.reminders.filter(r => r.id !== reminderId);
 onUpdatePet({ ...pet, reminders: updatedReminders });
        }
    };
 const filteredReminders = (pet.reminders || [])
        .filter(r => {
            const status = getReminderStatus(r).text;
            if (filter === 'All') return true;
            if (filter === 'Upcoming') return status === 'Pending';
            return status === filter;
        })
        .sort((a, b) => 
 new Date(a.date) - new Date(b.date));

    const handleSuggestReminders = async () => {
        setIsAISuggesting(true);
 setAiSuggestions([]);

        const healthSummary = `Vaccinations: ${pet.health.vaccinations.length > 0 ? pet.health.vaccinations.map(v => `${v.name} on ${v.date}`).join(', ') : 'None.'}`;
 const growthSummary = `Growth: ${pet.growth.length > 0 ? `Last entry on ${pet.growth[pet.growth.length - 1].date} was ${pet.growth[pet.growth.length - 1].weight_kg}kg.` : 'No data.'}`;
 const existingReminders = `Existing Reminders: ${pet.reminders.length > 0 ? pet.reminders.filter(r => r.status === 'pending').map(r => r.title).join(', ') : 'None pending.'}`;
 const systemInstruction = `You are a helpful pet care assistant. Analyze the pet's info and records.

 Suggest 3-5 concise, actionable reminders. Format EACH reminder as a single line starting with a dash.

 Example: - Schedule annual vet checkup. Do not use markdown or numbering.`;
 const userPrompt = `My pet is ${pet.name}, a ${calculateAge(pet.dob)} year old ${pet.breed}. 
        ${healthSummary}. 
        ${growthSummary}. 
        ${existingReminders}.

 Please suggest a few important reminders.`;

        const suggestionsText = await callGeminiAPI(userPrompt, systemInstruction);
 if (suggestionsText && suggestionsText.includes('-')) {
            const suggestions = suggestionsText.split('\n').filter(s => s.startsWith('-')).map(s => s.substring(1).trim());
 setAiSuggestions(suggestions);
        } else {
            setAiSuggestions([suggestionsText || "Could not generate suggestions."]);
 // Show raw response if format is unexpected
        }
        setIsAISuggesting(false);
 };

    const handleToggleSuggestion = (suggestion) => {
        setSelectedSuggestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(suggestion)) {
                newSet.delete(suggestion);
            } else {
                newSet.add(suggestion);
        
     }
            return newSet;
        });
 };

    const handleAddSelectedSuggestions = () => {
        const today = new Date();
 const defaultDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];

        const newReminders = Array.from(selectedSuggestions).map(title => {
            let type = 'Other';
            if (title.toLowerCase().includes('vet') || title.toLowerCase().includes('checkup') || title.toLowerCase().includes('vaccin')) type = 'Vet';
            if (title.toLowerCase().includes('groom')) type = 'Grooming';
            if (title.toLowerCase().includes('medica') || title.toLowerCase().includes('pill')) type = 'Medication';
            if (title.toLowerCase().includes('weigh') || title.toLowerCase().includes('growth')) type = 'Growth';

 
            return { id: Date.now() + Math.random(), title, type, date: defaultDate, time: '09:00', repeat: 'None', notes: 'Generated by AI suggestion.', status: 'pending' };
        });
 onUpdatePet({ ...pet, reminders: [...pet.reminders, ...newReminders] });

        // Reset AI state
        setAiSuggestions([]);
        setSelectedSuggestions(new Set());
 };

    return (
        <div id="tab-reminders" className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-slate-800">Reminders for {pet.name}</h3>
                <div className="flex-shrink-0 flex gap-2">
                    <button onClick={handleSuggestReminders} disabled={isAISuggesting} 
 className="text-sm bg-purple-100 text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-purple-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                        ✨ {isAISuggesting ? 'Thinking...' : 'Suggest Reminders'}
                    </button>
                    <button onClick={() => onOpenModal(pet, null)} className="text-sm bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 flex items-center gap-2">
   
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        Add Reminder
                    </button>
   
              </div>
            </div>

            {(isAISuggesting ||
 aiSuggestions.length > 0) && (
                <div id="ai-suggestion-card" className="bg-purple-50 border border-purple-200 p-6 rounded-2xl mb-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">AI Suggestions</h3>
                    {isAISuggesting && (
                        <div className="flex 
 justify-center"><div className="loader" style={{ borderTopColor: '#7e22ce' }}></div></div>
                    )}
                    {!isAISuggesting && aiSuggestions.length > 0 && (
                        <div id="ai-suggestion-content" className="text-purple-800 leading-relaxed">
                      
       {aiSuggestions.map((s, index) => (
                                <label key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                                    <input type="checkbox" onChange={() => handleToggleSuggestion(s)} checked={selectedSuggestions.has(s)} className="ai-suggestion-checkbox h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded" />
 
                                    <span className="text-purple-900">{s}</span>
                                </label>
                            ))}
    
                     </div>
                    )}
                    {aiSuggestions.length > 0 && !isAISuggesting && (
                        <div className="flex justify-end mt-4">
       
                      <button onClick={handleAddSelectedSuggestions} disabled={selectedSuggestions.size === 0} className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2 disabled:opacity-60">
                                + Add Selected
                            
 </button>
                        </div>
                    )}
                </div>
            )}

            <div className="mb-4 bg-slate-100 p-1.5 rounded-full flex flex-wrap items-center">
         
        {['Upcoming', 'All', 'Completed', 'Missed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`py-2 px-4 font-medium text-sm rounded-full transition-colors duration-200 ${filter === f ?
 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
           
      {filteredReminders.length > 0 ? filteredReminders.map(r => {
                    const status = getReminderStatus(r);

                    const today = new Date(); today.setHours(0,0,0,0);
                    const threeDaysFromNow = new Date(today); threeDaysFromNow.setDate(today.getDate() + 3);
              
       const reminderDateOnly = new Date(r.date + 'T00:00:00');
                    let highlightClass = 'border-l-transparent';
                    if (status.text === 'Pending' && reminderDateOnly >= today && reminderDateOnly <= threeDaysFromNow) {
                        highlightClass = 'border-l-yellow-400';
       
              }

                    let displayTime = '';
                    if (r.time) {
                        let [hours, minutes] = r.time.split(':');
              
           const ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12 || 12;
                        displayTime = `${hours}:${minutes} ${ampm}`;
                    }
    
                 return (
                        <div key={r.id} className={`bg-white border border-slate-200 rounded-lg p-4 flex items-start gap-4 hover:shadow-md border-l-4 ${highlightClass}`}>
                            <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">{getReminderIcon(r.type)}</div>
          
                   <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                                    <h4 className="text-lg font-bold text-slate-800">{r.title}</h4>
    
                                 <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${status.classes}`}>{status.text}</span>
                                </div>
                              
   <p className="text-sm font-medium text-blue-600 mb-2">{r.date} at {displayTime} {r.repeat !== 'None' ?
 `(${r.repeat})` : ''}</p>
                                <p className="text-sm text-slate-600">{r.notes ||
 'No notes.'}</p>
                            </div>
                            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                                {/* ##### THIS IS THE FIXED LINE ##### */}
                                {status.text !== 'Completed' && <button onClick={() => handleComplete(r.id)} title="Mark Done" className="text-slate-400 hover:text-green-500 p-2 rounded-full hover:bg-green-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>}
                                <button onClick={() => onOpenModal(pet, r)} title="Edit" className="text-slate-400 hover:text-blue-500 p-2 rounded-full hover:bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg></button>
   
                              <button onClick={() => handleDelete(r.id)} title="Delete" className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
       
                      </div>
                        </div>
                    );
 }) : (
                    <p className="text-slate-500 text-center py-12">
                        <span className="text-4xl mb-4 block">🗓️</span>
                        {filter === 'Upcoming' && 'No upcoming reminders!'}
                  
       {filter === 'Completed' && 'No completed reminders yet.'}
                        {filter === 'Missed' && 'No missed reminders.'}
                        {filter === 'All' && 'No reminders set. Add one to get started!'}
                    </p>
  
               )}
            </div>
        </div>
    );
 };

const ReminderModal = ({ isOpen, onClose, onSave, existingReminder }) => {
    const [formData, setFormData] = useState({
        title: '', type: 'Vet', repeat: 'None', date: '', time: '', notes: ''
    });
 useEffect(() => {
        if (existingReminder) {
            setFormData({
                title: existingReminder.title || '',
                type: existingReminder.type || 'Vet',
                repeat: existingReminder.repeat || 'None',
                date: existingReminder.date || 
 '',
                time: existingReminder.time || '',
                notes: existingReminder.notes || ''
            });
        } else {
            setFormData({ title: '', type: 'Vet', repeat: 'None', date: '', time: '', notes: '' });
        }
    }, [existingReminder, isOpen]);
 if (!isOpen) return null;

    const handleChange = (e) => {
        const { id, value } = e.target;
 setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
 if (!formData.title || !formData.date || !formData.time) {
            alert('Title, Date, and Time are required.');
 return;
        }
        onSave(formData);
    };
 return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative modal-enter-active">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">{existingReminder ? 'Edit' : 'Add'} Reminder</h3>
                <form onSubmit={handleSubmit}>
                   
  <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input type="text" id="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 
 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Annual Checkup" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
              
                   <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                <select id="type" value={formData.type} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                               
      <option value="Vet">💉 Vet Visit</option>
                                    <option value="Grooming">✂️ Grooming</option>
                                    <option value="Medication">💊 Medication</option>
                
                     <option value="Feeding">🍖 Feeding</option>
                                    <option value="Walk">🦮 Walk</option>
                                    <option value="Growth">🌱 Growth Check</option>
 
                                    <option value="Other">🔔 Other</option>
                                </select>
                            </div>
   
                          <div>
                                <label htmlFor="repeat" className="block text-sm font-medium text-slate-700 mb-1">Repeat</label>
                                <select id="repeat" value={formData.repeat} onChange={handleChange} className="w-full 
 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                                    <option value="None">None</option>
                                    <option value="Daily">Daily</option>
                  
                   <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
            
                 </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
    
                             <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                <input type="date" id="date" value={formData.date} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                   
          </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                         
        <input type="time" id="time" value={formData.time} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                            </div>
                        </div>
                        <div>
  
                           <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                            <textarea id="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Fasting required after midnight."></textarea>
                      
   </div>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors">Cancel</button>
                   
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
 };

const Toast = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);
 return (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-2xl transition-transform duration-300 ease-out z-50 translate-x-0">
            <p>{message}</p>
        </div>
    );
 };

const getHealthStatusBadge = (record) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today
    
    const recordDate = record.date ? new Date(record.date + 'T00:00:00') : null;
    const nextDueDate = record.nextDue ? new Date(record.nextDue + 'T00:00:00') : null;

    // 1. Scheduled
    if (record.status === 'scheduled') {
        if (recordDate && recordDate < today) {
            return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Missed</span>;
        }
        return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Scheduled</span>;
    }
    
    // 2. Completed
    if (record.status === 'completed') {
        if (nextDueDate && nextDueDate <= today) {
            return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800">Overdue</span>;
        }
        return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">Completed</span>;
    }

    return null; // Default case
};

const HealthTab = ({ pet, onUpdatePet, callGeminiAPI, showToast }) => {
    // This component now acts as a container for the new sections
    return (
        <div id="tab-health" className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-12">
            <VaccinationsSection pet={pet} onUpdatePet={onUpdatePet} showToast={showToast} />
            <DewormingSection pet={pet} onUpdatePet={onUpdatePet} showToast={showToast} />
            <MedicationsSection pet={pet} onUpdatePet={onUpdatePet} showToast={showToast} />
            <MedicalHistoryStatusSection pet={pet} onUpdatePet={onUpdatePet} showToast={showToast} />
            <AIHealthSummarySection pet={pet} callGeminiAPI={callGeminiAPI} />
        </div>
    );
};

const VaccinationsSection = ({ pet, onUpdatePet, showToast }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingVaccine, setEditingVaccine] = useState(null);

    const handleSave = (formData) => {
        const record = { ...formData, id: editingVaccine ? editingVaccine.id : Date.now() };

        let updatedVaccinations;
        if (editingVaccine) {
            updatedVaccinations = pet.health.vaccinations.map(v => v.id === record.id ? record : v);
            showToast('Vaccination record updated!');
        } else {
            updatedVaccinations = [...(pet.health.vaccinations || []), record];
            showToast('Vaccination record added!');
        }
        
        onUpdatePet({ ...pet, health: { ...pet.health, vaccinations: updatedVaccinations } });
        setShowForm(false);
        setEditingVaccine(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this vaccination record?')) {
            const updatedVaccinations = pet.health.vaccinations.filter(v => v.id !== id);
            onUpdatePet({ ...pet, health: { ...pet.health, vaccinations: updatedVaccinations } });
            showToast('Vaccination record deleted!');
        }
    };

    const handleEdit = (vaccine) => {
        setEditingVaccine(vaccine);
        setShowForm(true);
    };
    
    const sortedVaccinations = (pet.health.vaccinations || []).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">💉 Vaccination</h3>
                <button onClick={() => { setEditingVaccine(null); setShowForm(!showForm); }} className="toggle-form-btn text-sm bg-blue-100 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-200">
                    {showForm ? 'Cancel' : '+ Add Record'}
                </button>
            </div>

            {showForm && <VaccineForm existingRecord={editingVaccine} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingVaccine(null); }} />}

            <div className="overflow-x-auto">
                <table id="vaccination-table" className={`min-w-full text-sm text-left text-slate-600 ${sortedVaccinations.length === 0 ? 'hidden' : ''}`}>
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th scope="col" className="px-4 py-3">Name / Brand</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                            <th scope="col" className="px-4 py-3">Clinic</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Next Due</th>
                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedVaccinations.map(v => (
                            <tr key={v.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-900">{v.name} / {v.brand || 'N/A'}</td>
                                <td className="px-4 py-3">{v.date}</td>
                                <td className="px-4 py-3">{v.clinic || 'N/A'}</td>
                                <td className="px-4 py-3">{getHealthStatusBadge(v)}</td>
                                <td className="px-4 py-3">{v.nextDue || 'N/A'}</td>
                                <td className="px-4 py-3 text-right">
                                    <button onClick={() => handleEdit(v)} className="font-medium text-blue-600 hover:underline mr-3">Edit</button>
                                    <button onClick={() => handleDelete(v.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {sortedVaccinations.length === 0 && !showForm && (
                <p id="no-vaccinations-message" className="text-slate-500 text-sm py-4">No vaccination records.</p>
            )}
        </section>
    );
};

const VaccineForm = ({ existingRecord, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '', brand: '', date: '', clinic: '', status: 'completed', nextDue: ''
    });

    useEffect(() => {
        if (existingRecord) {
            setFormData(existingRecord);
        } else {
             setFormData({ name: '', brand: '', date: '', clinic: '', status: 'completed', nextDue: '' });
        }
    }, [existingRecord]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.date) {
            onSave(formData);
        } else {
            alert('Vaccine Name and Date are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{existingRecord ? 'Edit' : 'Add'} Vaccination</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Vaccine Name" className="p-2 border rounded-md w-full" required />
                <input type="text" id="brand" value={formData.brand} onChange={handleChange} placeholder="Brand Name" className="p-2 border rounded-md w-full" />
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" title="Date Administered" required />
                <input type="text" id="clinic" value={formData.clinic} onChange={handleChange} placeholder="Clinic/Doctor Name" className="p-2 border rounded-md w-full" />
                <select id="status" value={formData.status} onChange={handleChange} className="p-2 border rounded-md w-full bg-white">
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                </select>
                <input type="date" id="nextDue" value={formData.nextDue} onChange={handleChange} className="p-2 border rounded-md w-full" title="Next Due Date" />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const DewormingSection = ({ pet, onUpdatePet, showToast }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingDeworm, setEditingDeworm] = useState(null);

    const handleSave = (formData) => {
        const record = { ...formData, id: editingDeworm ? editingDeworm.id : Date.now() };

        let updatedDeworming;
        if (editingDeworm) {
            updatedDeworming = pet.health.deworming.map(d => d.id === record.id ? record : d);
            showToast('Deworming record updated!');
        } else {
            updatedDeworming = [...(pet.health.deworming || []), record];
            showToast('Deworming record added!');
        }
        
        onUpdatePet({ ...pet, health: { ...pet.health, deworming: updatedDeworming } });
        setShowForm(false);
        setEditingDeworm(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this deworming record?')) {
            const updatedDeworming = pet.health.deworming.filter(d => d.id !== id);
            onUpdatePet({ ...pet, health: { ...pet.health, deworming: updatedDeworming } });
            showToast('Deworming record deleted!');
        }
    };

    const handleEdit = (deworm) => {
        setEditingDeworm(deworm);
        setShowForm(true);
    };
    
    const sortedDeworming = (pet.health.deworming || []).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">🦠 Deworming</h3>
                <button onClick={() => { setEditingDeworm(null); setShowForm(!showForm); }} className="toggle-form-btn text-sm bg-blue-100 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-200">
                    {showForm ? 'Cancel' : '+ Add Record'}
                </button>
            </div>

            {showForm && <DewormingForm existingRecord={editingDeworm} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingDeworm(null); }} />}

            <div className="overflow-x-auto">
                <table id="deworming-table" className={`min-w-full text-sm text-left text-slate-600 ${sortedDeworming.length === 0 ? 'hidden' : ''}`}>
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th scope="col" className="px-4 py-3">Name / Brand</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                            <th scope="col" className="px-4 py-3">Clinic</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Next Due</th>
                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDeworming.map(d => (
                            <tr key={d.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-900">{d.name || 'N/A'}</td>
                                <td className="px-4 py-3">{d.date}</td>
                                <td className="px-4 py-3">{d.clinic || 'N/A'}</td>
                                <td className="px-4 py-3">{getHealthStatusBadge(d)}</td>
                                <td className="px-4 py-3">{d.nextDue || 'N/A'}</td>
                                <td className="px-4 py-3 text-right">
                                    <button onClick={() => handleEdit(d)} className="font-medium text-blue-600 hover:underline mr-3">Edit</button>
                                    <button onClick={() => handleDelete(d.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {sortedDeworming.length === 0 && !showForm && (
                <p id="no-deworming-message" className="text-slate-500 text-sm py-4">No deworming records.</p>
            )}
        </section>
    );
};

const DewormingForm = ({ existingRecord, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '', date: '', clinic: '', status: 'completed', nextDue: ''
    });

    useEffect(() => {
        if (existingRecord) {
            setFormData(existingRecord);
        } else {
             setFormData({ name: '', date: '', clinic: '', status: 'completed', nextDue: '' });
        }
    }, [existingRecord]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.date) {
            onSave(formData);
        } else {
            alert('Name and Date are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{existingRecord ? 'Edit' : 'Add'} Deworming Record</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Brand/Name" className="p-2 border rounded-md w-full" required />
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" title="Date Administered" required />
                <input type="text" id="clinic" value={formData.clinic} onChange={handleChange} placeholder="Clinic/Doctor Name" className="p-2 border rounded-md w-full" />
                <select id="status" value={formData.status} onChange={handleChange} className="p-2 border rounded-md w-full bg-white">
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                </select>
                <input type="date" id="nextDue" value={formData.nextDue} onChange={handleChange} className="p-2 border rounded-md w-full" title="Next Due Date" />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const MedicationsSection = ({ pet, onUpdatePet, showToast }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingMed, setEditingMed] = useState(null);

    const handleSave = (formData) => {
        const record = { ...formData, id: editingMed ? editingMed.id : Date.now() };

        let updatedMeds;
        if (editingMed) {
            updatedMeds = pet.health.medications.map(m => m.id === record.id ? record : m);
            showToast('Medication record updated!');
        } else {
            updatedMeds = [...(pet.health.medications || []), record];
            showToast('Medication record added!');
        }
        
        onUpdatePet({ ...pet, health: { ...pet.health, medications: updatedMeds } });
        setShowForm(false);
        setEditingMed(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            const updatedMeds = pet.health.medications.filter(m => m.id !== id);
            onUpdatePet({ ...pet, health: { ...pet.health, medications: updatedMeds } });
            showToast('Medication record deleted!');
        }
    };

    const handleEdit = (med) => {
        setEditingMed(med);
        setShowForm(true);
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">💊 Current Medications</h3>
                <button onClick={() => { setEditingMed(null); setShowForm(!showForm); }} className="toggle-form-btn text-sm bg-blue-100 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-200">
                    {showForm ? 'Cancel' : '+ Add Record'}
                </button>
            </div>

            {showForm && <MedicationForm existingRecord={editingMed} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingMed(null); }} />}

            <div id="medication-list" className="space-y-3">
                {(pet.health.medications || []).length > 0 ? (
                    pet.health.medications.map(m => {
                        const statusClass = m.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-700';
                        return (
                            <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h5 className="font-bold text-slate-800">{m.name}</h5>
                                        <p className="text-sm text-slate-600">{m.dosage || 'N/A'} - {m.frequency || 'N/A'}</p>
                                        <p className="text-xs text-slate-500">
                                            {m.startDate ? `Started: ${m.startDate}` : ''} {m.endDate ? `| Ended: ${m.endDate}` : ''}
                                        </p>
                                        <p className="text-xs text-slate-500">{m.notes || ''}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusClass}`}>{m.status}</span>
                                        <div>
                                            <button onClick={() => handleEdit(m)} className="font-medium text-blue-600 hover:underline text-xs mr-2">Edit</button>
                                            <button onClick={() => handleDelete(m.id)} className="font-medium text-red-600 hover:underline text-xs">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    !showForm && <p id="no-medications-message" className="text-slate-500 text-sm py-4">No current medications.</p>
                )}
            </div>
        </section>
    );
};

const MedicationForm = ({ existingRecord, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '', dosage: '', frequency: 'None', startDate: '', endDate: '', status: 'active', notes: ''
    });

    useEffect(() => {
        if (existingRecord) {
            setFormData(existingRecord);
        } else {
            setFormData({ name: '', dosage: '', frequency: 'None', startDate: '', endDate: '', status: 'active', notes: '' });
        }
    }, [existingRecord]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.frequency) {
            onSave(formData);
        } else {
            alert('Name and Frequency are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{existingRecord ? 'Edit' : 'Add'} Medication</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Medication Name" className="p-2 border rounded-md w-full md:col-span-2" required />
                <input type="text" id="dosage" value={formData.dosage} onChange={handleChange} placeholder="Dosage (e.g., 1 tablet)" className="p-2 border rounded-md w-full" />
                <select id="frequency" value={formData.frequency} onChange={handleChange} className="p-2 border rounded-md w-full bg-white" required>
                    <option value="None">Frequency: None</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} className="p-2 border rounded-md w-full" title="Start Date" />
                <input type="date" id="endDate" value={formData.endDate} onChange={handleChange} className="p-2 border rounded-md w-full" title="End Date (optional)" />
                <select id="status" value={formData.status} onChange={handleChange} className="p-2 border rounded-md w-full bg-white">
                    <option value="active">Active</option>
                    <option value="finished">Finished</option>
                </select>
                <input type="text" id="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (e.g., with food)" className="p-2 border rounded-md w-full md:col-span-2" />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const MedicalHistoryStatusSection = ({ pet, onUpdatePet, showToast }) => {
    const [showStatusForm, setShowStatusForm] = useState(false);
    const [showHistoryForm, setShowHistoryForm] = useState(false);
    const [editingHistory, setEditingHistory] = useState(null);

    // --- Status ---
    const handleSaveStatus = (formData) => {
        onUpdatePet({ ...pet, health: { ...pet.health, medicalStatus: formData } });
        showToast('Medical status updated!');
        setShowStatusForm(false);
    };

    // --- History ---
    const handleSaveHistory = (formData) => {
        const record = { ...formData, id: editingHistory ? editingHistory.id : Date.now() };

        let updatedHistory;
        if (editingHistory) {
            updatedHistory = pet.health.medicalHistory.map(h => h.id === record.id ? record : h);
            showToast('History event updated!');
        } else {
            updatedHistory = [...(pet.health.medicalHistory || []), record];
            showToast('History event added!');
        }
        
        onUpdatePet({ ...pet, health: { ...pet.health, medicalHistory: updatedHistory } });
        setShowHistoryForm(false);
        setEditingHistory(null);
    };

    const handleDeleteHistory = (id) => {
        if (window.confirm('Are you sure you want to delete this history event?')) {
            const updatedHistory = pet.health.medicalHistory.filter(h => h.id !== id);
            onUpdatePet({ ...pet, health: { ...pet.health, medicalHistory: updatedHistory } });
            showToast('History event deleted!');
        }
    };

    const handleEditHistory = (history) => {
        setEditingHistory(history);
        setShowHistoryForm(true);
    };
    
    const sortedHistory = (pet.health.medicalHistory || []).sort((a, b) => new Date(b.date) - new Date(a.date));
    const status = pet.health.medicalStatus || {};

    return (
        <section>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-4">🏥 Medical History & Status</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Status Column */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-semibold text-slate-700">Medical Status</h4>
                        <button onClick={() => setShowStatusForm(!showStatusForm)} className="toggle-form-btn text-sm bg-blue-100 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-200">
                            {showStatusForm ? 'Cancel' : 'Edit Status'}
                        </button>
                    </div>

                    {!showStatusForm && (
                        <div id="status-display" className="grid grid-cols-2 gap-4 text-sm p-4 bg-slate-50 rounded-lg">
                            <div><span className="block text-slate-500">Allergies</span><span className="font-semibold text-slate-800">{status.allergies || 'None'}</span></div>
                            <div><span className="block text-slate-500">Known Conditions</span><span className="font-semibold text-slate-800">{status.conditions || 'None'}</span></div>
                            <div><span className="block text-slate-500">Microchip ID</span><span className="font-semibold text-slate-800">{status.microchip || 'N/A'}</span></div>
                            <div><span className="block text-slate-500">Blood Type</span><span className="font-semibold text-slate-800">{status.bloodType || 'N/A'}</span></div>
                        </div>
                    )}
                    
                    {showStatusForm && <StatusForm existingStatus={status} onSave={handleSaveStatus} onCancel={() => setShowStatusForm(false)} />}
                </div>

                {/* History Column */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-semibold text-slate-700">Medical History</h4>
                        <button onClick={() => { setEditingHistory(null); setShowHistoryForm(!showHistoryForm); }} className="toggle-form-btn text-sm bg-blue-100 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-200">
                            {showHistoryForm ? 'Cancel' : '+ Add Event'}
                        </button>
                    </div>

                    {showHistoryForm && <HistoryForm existingRecord={editingHistory} onSave={handleSaveHistory} onCancel={() => { setShowHistoryForm(false); setEditingHistory(null); }} />}

                    <div className="overflow-x-auto">
                        <table id="history-table" className={`min-w-full text-sm text-left text-slate-600 ${sortedHistory.length === 0 ? 'hidden' : ''}`}>
                            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Date</th>
                                    <th scope="col" className="px-4 py-3">Title / Vet</th>
                                    <th scope="col" className="px-4 py-3">Notes</th>
                                    <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedHistory.map(h => (
                                    <tr key={h.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{h.date}</td>
                                        <td className="px-4 py-3">{h.title}<p className="text-xs text-slate-500">{h.vet || ''}</p></td>
                                        <td className="px-4 py-3">{h.notes || 'N/A'}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => handleEditHistory(h)} className="font-medium text-blue-600 hover:underline mr-3">Edit</button>
                                            <button onClick={() => handleDeleteHistory(h.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {sortedHistory.length === 0 && !showHistoryForm && (
                        <p id="no-history-message" className="text-slate-500 text-sm py-4">No past medical events logged.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

const StatusForm = ({ existingStatus, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ allergies: '', conditions: '', microchip: '', bloodType: '' });

    useEffect(() => {
        if (existingStatus) {
            setFormData(existingStatus);
        }
    }, [existingStatus]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">Edit Medical Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="allergies" value={formData.allergies} onChange={handleChange} placeholder="Allergies (comma-separated)" className="p-2 border rounded-md w-full md:col-span-2" />
                <input type="text" id="conditions" value={formData.conditions} onChange={handleChange} placeholder="Known Conditions" className="p-2 border rounded-md w-full md:col-span-2" />
                <input type="text" id="microchip" value={formData.microchip} onChange={handleChange} placeholder="Microchip ID" className="p-2 border rounded-md w-full" />
                <input type="text" id="bloodType" value={formData.bloodType} onChange={handleChange} placeholder="Blood Type" className="p-2 border rounded-md w-full" />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save Status</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const HistoryForm = ({ existingRecord, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        date: '', title: '', vet: '', notes: ''
    });

    useEffect(() => {
        if (existingRecord) {
            setFormData({
                date: existingRecord.date || '',
                title: existingRecord.title || '',
                vet: existingRecord.vet || '',
                notes: existingRecord.notes || '',
            });
        } else {
             setFormData({ date: '', title: '', vet: '', notes: '' });
        }
    }, [existingRecord]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.date && formData.title) {
            onSave(formData);
        } else {
            alert('Date and Title are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{existingRecord ? 'Edit' : 'Add'} History Event</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" required />
                <input type="text" id="title" value={formData.title} onChange={handleChange} placeholder="Event Title (e.g., Surgery)" className="p-2 border rounded-md w-full" required />
                <input type="text" id="vet" value={formData.vet} onChange={handleChange} placeholder="Vet Name (optional)" className="p-2 border rounded-md w-full md:col-span-2" />
                <input type="text" id="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="p-2 border rounded-md w-full md:col-span-2" />
                <input type="file" id="attachment" className="p-2 border rounded-md w-full md:col-span-2 text-xs" title="Attachment (not implemented)" disabled />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save Event</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const AIHealthSummarySection = ({ pet, callGeminiAPI }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');

    const generateSummary = async () => {
        setIsLoading(true);
        setSummary('');

        const healthData = {
            status: pet.health.medicalStatus,
            vaccinations: pet.health.vaccinations,
            deworming: pet.health.deworming,
            medications: pet.health.medications,
            history: pet.health.medicalHistory
        };
        const systemInstruction = "You are a helpful veterinary assistant. Analyze the pet's health JSON data. Provide a concise, one-paragraph summary (under 80 words) of their overall health, explicitly mentioning any overdue items. Conclude with one friendly suggestion for improvement. Be friendly and address the owner.";
        const userPrompt = `My pet is ${pet.name}. Here is their health data: ${JSON.stringify(healthData)}. Please generate a summary.`;

        const summaryText = await callGeminiAPI(userPrompt, systemInstruction);
        setSummary(summaryText);
        setIsLoading(false);
    };

    return (
        <section>
            <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-purple-800 flex items-center gap-3">🤖 AI Health Summary</h3>
                    <button onClick={generateSummary} disabled={isLoading} className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2 disabled:opacity-50">
                        ✨ {isLoading ? 'Generating...' : 'Generate Summary'}
                    </button>
                </div>
                {isLoading && (
                    <div className="flex justify-center">
                        <div className="loader" style={{ borderTopColor: '#7e22ce' }}></div>
                    </div>
                )}
                <p id="health-summary-content" className="text-purple-800 leading-relaxed">
                    {summary || `Click 'Generate' to create an AI-powered summary of ${pet.name}'s health records.`}
                </p>
            </div>
        </section>
    );
};


export default MyPetsPage;