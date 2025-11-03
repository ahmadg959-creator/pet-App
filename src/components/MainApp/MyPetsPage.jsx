import React, { useState, useEffect } from 'react';

// Mock Data
const initialPets = [
    {
        id: 1,
        name: "Max",
        breed: "German Shepherd",
        dob: "2021-05-10",
        gender: "Male",
        photo: "https://placehold.co/600x400/c2b280/333333?text=Max",
        health: {
            vaccinations: [ { id: 1, name: 'Rabies', date: '2022-05-15', brand: 'Rabisin', clinic: 'City Vets' } ],
            deworming: [ { id: 1, date: '2022-04-15', brand: 'Drontal' } ],
            medications: [
                { id: 1, date: '2023-10-25', detail: 'Advocate for flea and ticks' },
                { id: 2, date: '2023-10-20', detail: 'Painkiller for paw injury' }
            ],
            medicalHistory: [
                { id: 1, date: '2023-01-15', detail: 'Initial check-up. All clear.' }
            ]
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
        health: { 
            vaccinations: [], 
            deworming: [],
            medications: [],
            medicalHistory: []
        },
        reminders: [],
        gallery: []
    }
];

const MyPetsPage = () => {
    const [pets, setPets] = useState(initialPets);
    const [view, setView] = useState('dashboard'); // dashboard, add-pet, pet-detail
    const [selectedPetId, setSelectedPetId] = useState(null);

    const selectedPet = pets.find(p => p.id === selectedPetId);

    const handleAddPet = (newPetData) => {
        const newPet = {
            ...newPetData,
            id: Date.now(),
            health: { vaccinations: [], deworming: [], medications: [], medicalHistory: [] },
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
        <div id="my-pets-content">
            {view === 'dashboard' && <PetDashboard pets={pets} onAddPet={showAddPetForm} onSelectPet={showPetDetail} />}
            {view === 'add-pet' && <AddPetForm onAddPet={handleAddPet} onCancel={showDashboard} />}
            {view === 'pet-detail' && selectedPet && <PetDetailView pet={selectedPet} onUpdatePet={handleUpdatePet} onBack={showDashboard} />}
        </div>
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
                    <button onClick={onAddPet} className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors flex items-center space-x-2">
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
            ) : (
                <div id="no-pets-message" className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <p className="text-xl font-semibold text-slate-700 mt-4 mb-2">No Pets Yet</p>
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
                    <img id="photo-preview" src={formData.photo} className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 mb-4" alt="Pet photo preview" />
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
                            <label className="flex items-center"><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span className="ml-2 text-slate-800">Male</span></label>
                            <label className="flex items-center"><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span className="ml-2 text-slate-800">Female</span></label>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-end gap-4 mt-8">
                    <button type="button" onClick={onCancel} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Save Pet</button>
                </div>
            </form>
        </div>
    );
};

const PetDetailView = ({ pet, onUpdatePet, onBack }) => {
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
        // This is a mock function. In a real app, you'd fetch from your backend.
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
                <div className="text-center md:text-left w-full">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">{pet.name}</h1>
                    <p className="text-xl text-slate-500 mt-1">{pet.breed}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm mt-4 text-slate-600">
                        <span className="bg-slate-100 rounded-full px-4 py-1.5">{pet.gender}</span>
                        <span className="bg-slate-100 rounded-full px-4 py-1.5">{calculateAge(pet.dob)} years old</span>
                    </div>
                    <div className="mt-4">
                        <button onClick={generateBio} disabled={isBioLoading} className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2 disabled:bg-purple-300">
                            ✨ {isBioLoading ? 'Generating...' : 'Generate Personality Bio'}
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
                    <button onClick={() => setActiveTab('health')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'health' ? 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Health Records</button>
                    <button onClick={() => setActiveTab('growth')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'growth' ? 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Growth Tracker</button>
                    <button onClick={() => setActiveTab('reminders')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reminders' ? 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Reminders</button>
                    <button onClick={() => setActiveTab('gallery')} className={`pet-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'gallery' ? 'tab-active' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Media Gallery</button>
                </nav>
            </div>

            <div id="tab-content-container">
                {activeTab === 'health' && <HealthTab pet={pet} onUpdatePet={onUpdatePet} />}
                {activeTab === 'growth' && <div className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8"><p className="text-center text-slate-500">Editing for Growth Tracker coming soon!</p></div>}
                {activeTab === 'reminders' && <div className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8"><p className="text-center text-slate-500">Editing for Reminders coming soon!</p></div>}
                {activeTab === 'gallery' && <div className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8"><p className="text-center text-slate-500">Editing for Media Gallery coming soon!</p></div>}
            </div>
        </div>
    );
};



const HealthTab = ({ pet, onUpdatePet }) => {



    const [healthView, setHealthView] = useState('menu'); // menu, vaccinations, deworming, medications, medicalHistory







    const renderDetailView = () => {



        const sectionConfig = {



            vaccinations: {



                title: 'Vaccinations',



                Component: HealthSectionDetail,



                props: { type: 'vaccination', headers: ['Date', 'Vaccine', 'Brand/Clinic'], FormComponent: VaccineForm }



            },



            deworming: {



                title: 'Deworming',



                Component: HealthSectionDetail,



                props: { type: 'deworming', headers: ['Date', 'Brand'], FormComponent: DewormingForm }



            },



            medications: {



                title: 'Current Medications',



                Component: HealthSectionDetail,



                props: { type: 'medication', headers: ['Date', 'Detail'], FormComponent: MedicationForm }



            },



            medicalHistory: {



                title: 'Medical History / Status',



                Component: HealthSectionDetail,



                props: { type: 'medicalHistory', headers: ['Date', 'Detail'], FormComponent: MedicalHistoryForm }



            }



        };







        const { title, Component, props } = sectionConfig[healthView];







        return (



            <div>



                <button onClick={() => setHealthView('menu')} className="mb-6 inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors">



                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>



                    Back to Health Records



                </button>



                <Component title={title} pet={pet} onUpdatePet={onUpdatePet} {...props} />



            </div>



        );



    };







    return (



        <div id="tab-health" className="tab-content bg-white rounded-2xl shadow-lg p-6 md:p-8">



            {healthView === 'menu' ? (



                <HealthMenu onSelect={setHealthView} />



            ) : (



                renderDetailView()



            )}



        </div>



    );



};







const HealthMenu = ({ onSelect }) => {



    const menuItems = [



        { key: 'vaccinations', title: 'Vaccinations', icon: '💉' },



        { key: 'deworming', title: 'Deworming', icon: '💊' },



        { key: 'medications', title: 'Current Medications', icon: '🩹' },



        { key: 'medicalHistory', title: 'Medical History/Status', icon: '📋' },



    ];







    return (



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



            {menuItems.map(item => (



                <button key={item.key} onClick={() => onSelect(item.key)} className="bg-slate-50 hover:bg-blue-100 p-6 rounded-xl shadow-sm text-left transition-colors duration-300">



                    <span className="text-4xl">{item.icon}</span>



                    <h3 className="text-xl font-bold text-slate-800 mt-3">{item.title}</h3>



                </button>



            ))}



        </div>



    );



};







const HealthSectionDetail = ({ pet, onUpdatePet, type, title, headers, FormComponent }) => {



    const [showForm, setShowForm] = useState(false);



    const [editingRecord, setEditingRecord] = useState(null);







    const healthField = type === 'medicalHistory' ? 'medicalHistory' : type === 'deworming' ? 'deworming' : `${type}s`;



    const data = pet.health[healthField];







    const handleSave = (recordData) => {



        let records = [...data];



        if (editingRecord) {



            const index = records.findIndex(r => r.id === editingRecord.id);



            records[index] = recordData;



        } else {



            records.push({ ...recordData, id: Date.now() });



        }



        onUpdatePet({ ...pet, health: { ...pet.health, [healthField]: records } });



        setShowForm(false);



        setEditingRecord(null);



    };







    const handleDelete = (recordId) => {



        const updatedRecords = data.filter(r => r.id !== recordId);



        onUpdatePet({ ...pet, health: { ...pet.health, [healthField]: updatedRecords } });



    };







    const renderRow = (record) => {



        return (



            <tr key={record.id}>



                {headers.map(header => <td key={header}>{record[header.toLowerCase().replace(/\/| /g, '')]}</td>)}



                <td>{record.date}</td>



                <td>{record.detail || record.name || record.brand}</td>



                {type === 'vaccination' && <td>{record.clinic}</td>}



                <td className="text-right">



                    <button onClick={() => { setEditingRecord(record); setShowForm(true); }} className="font-medium text-blue-600 hover:underline mr-3">Edit</button>



                    <button onClick={() => handleDelete(record.id)} className="font-medium text-red-600 hover:underline">Delete</button>



                </td>



            </tr>



        );



    };







    return (



        <section>



            <div className="flex justify-between items-center mb-3">



                <h3 className="text-2xl font-bold text-slate-800">{title}</h3>



                <button onClick={() => { setEditingRecord(null); setShowForm(true); }} className="text-sm bg-blue-100 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-blue-200">+ Add New</button>



            </div>



            {showForm && <FormComponent {...{ [type]: editingRecord, onSave: handleSave, onCancel: () => { setShowForm(false); setEditingRecord(null); } }} />}



                        <RecordTable headers={headers} data={data} renderRow={renderRow} emptyMessage={`No ${type.replace(/([A-Z])/g, ' ').toLowerCase()} records.`} />



        </section>



    );



};

const RecordTable = ({ headers, data, renderRow, emptyMessage }) => (
    <div className="overflow-x-auto">
        {data.length > 0 ? (
            <table className="min-w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                    <tr>
                        {headers.map(h => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
                        <th scope="col" className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
            </table>
        ) : (
            <p className="text-slate-500 text-sm py-4">{emptyMessage}</p>
        )}
    </div>
);

const MedicalHistoryForm = ({ history, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ date: '', detail: '', ...history });

    useEffect(() => {
        setFormData({ date: '', detail: '', ...history });
    }, [history]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.date && formData.detail) {
            onSave(formData);
        } else {
            alert('Date and Detail are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{history ? 'Edit' : 'Add'} History Record</h4>
            <div className="grid grid-cols-1 gap-4">
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" />
                <textarea id="detail" value={formData.detail} onChange={handleChange} placeholder="Record details" className="p-2 border rounded-md w-full h-24"></textarea>
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const DewormingForm = ({ deworming, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ date: '', brand: '', ...deworming });

    useEffect(() => {
        setFormData({ date: '', brand: '', ...deworming });
    }, [deworming]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.date && formData.brand) {
            onSave(formData);
        } else {
            alert('Date and Brand are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{deworming ? 'Edit' : 'Add'} Deworming Record</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" />
                <input type="text" id="brand" value={formData.brand} onChange={handleChange} placeholder="Brand Name" className="p-2 border rounded-md w-full" />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const MedicationForm = ({ medication, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ date: '', detail: '', ...medication });

    useEffect(() => {
        setFormData({ date: '', detail: '', ...medication });
    }, [medication]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.date && formData.detail) {
            onSave(formData);
        } else {
            alert('Date and Detail are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{medication ? 'Edit' : 'Add'} Medication Record</h4>
            <div className="grid grid-cols-1 gap-4">
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" />
                <textarea id="detail" value={formData.detail} onChange={handleChange} placeholder="Medication details (e.g., name, dosage)" className="p-2 border rounded-md w-full h-24"></textarea>
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

const VaccineForm = ({ vaccine, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ name: '', brand: '', date: '', clinic: '', ...vaccine });

    useEffect(() => {
        setFormData({ name: '', brand: '', date: '', clinic: '', ...vaccine });
    }, [vaccine]);

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
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">{vaccine ? 'Edit' : 'Add'} Vaccination</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Vaccine Name" className="p-2 border rounded-md w-full" />
                <input type="text" id="brand" value={formData.brand} onChange={handleChange} placeholder="Brand Name" className="p-2 border rounded-md w-full" />
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-md w-full" />
                <input type="text" id="clinic" value={formData.clinic} onChange={handleChange} placeholder="Clinic/Doctor Name" className="p-2 border rounded-md w-full" />
            </div>
            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full">Save</button>
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full">Cancel</button>
            </div>
        </form>
    );
};

export default MyPetsPage;
