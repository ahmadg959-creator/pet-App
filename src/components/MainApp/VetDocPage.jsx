import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';

// New Book Appointment Modal, based on user's HTML
const BookAppointmentModal = ({ vet, onClose, addConsultation }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const pet = e.target.appointmentPet.value;
        const date = e.target.appointmentDate.value;
        const time = e.target.appointmentTime.value;
        const type = e.target.appointmentType.value;
        const notes = e.target.appointmentNotes.value;

        if (!pet || !date || !time || !type) {
            alert("Please fill all required fields.");
            return;
        }

        const newAppointment = {
            id: Date.now(),
            vetId: vet.id,
            vetName: vet.name,
            pet,
            date,
            time,
            type,
            notes,
            status: 'Upcoming'
        };

        addConsultation(newAppointment);
        alert("✅ Appointment booked successfully!");
        onClose(); // Close modal on submit
    };

    return (
        <div id="bookAppointmentModal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-1/2 p-6 relative">
                {/* Close Button */}
                <button onClick={onClose} id="closeBookModal" className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold">
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                    📅 Book Appointment with {vet.name}
                </h2>

                <form id="appointmentForm" className="space-y-4" onSubmit={handleSubmit}>
                    {/* Pet Selector */}
                    <div>
                        <label htmlFor="appointmentPet" className="block text-gray-600 text-sm mb-1">Select Pet:</label>
                        <select id="appointmentPet" name="appointmentPet" className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200">
                            <option value="">Select your pet</option>
                            {/* These should be dynamic */}
                            <option value="Buddy">Buddy</option>
                            <option value="Milo">Milo</option>
                            <option value="Bella">Bella</option>
                        </select>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full">
                            <label htmlFor="appointmentDate" className="block text-gray-600 text-sm mb-1">Date:</label>
                            <input type="date" id="appointmentDate" name="appointmentDate" className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="appointmentTime" className="block text-gray-600 text-sm mb-1">Time:</label>
                            <input type="time" id="appointmentTime" name="appointmentTime" className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200" required />
                        </div>
                    </div>

                    {/* Type */}
                    <div>
                        <label htmlFor="appointmentType" className="block text-gray-600 text-sm mb-1">Type:</label>
                        <select id="appointmentType" name="appointmentType" className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200">
                            <option value="">Select type</option>
                            <option value="Clinic">Clinic</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="appointmentNotes" className="block text-gray-600 text-sm mb-1">Notes / Reason:</label>
                        <textarea id="appointmentNotes" name="appointmentNotes" rows="3" placeholder="Describe the issue..." className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200"></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-3">
                        <button id="cancelAppointment" type="button" onClick={onClose} className="text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm">
                            Cancel
                        </button>
                        <button id="bookAppointmentBtn" type="submit" className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm">
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// New Edit Appointment Modal
const EditAppointmentModal = ({ appointment, onClose, onSave }) => {
    const [editedPet, setEditedPet] = useState(appointment.pet);
    const [editedDate, setEditedDate] = useState(appointment.date);
    const [editedTime, setEditedTime] = useState(appointment.time);
    const [editedType, setEditedType] = useState(appointment.type);
    const [editedNotes, setEditedNotes] = useState(appointment.notes);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!editedPet || !editedDate || !editedTime || !editedType) {
            alert("Please fill all required fields.");
            return;
        }

        const updatedAppointment = {
            ...appointment,
            pet: editedPet,
            date: editedDate,
            time: editedTime,
            type: editedType,
            notes: editedNotes,
        };

        onSave(updatedAppointment);
        alert("✅ Appointment updated successfully!");
        onClose();
    };

    return (
        <div id="editAppointmentModal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-1/2 p-6 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold">
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                    ✏️ Edit Appointment with {appointment.vetName}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="editPet" className="block text-gray-600 text-sm mb-1">Select Pet:</label>
                        <select id="editPet" name="editPet" value={editedPet} onChange={(e) => setEditedPet(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200">
                            <option value="">Select your pet</option>
                            <option value="Buddy">Buddy</option>
                            <option value="Milo">Milo</option>
                            <option value="Bella">Bella</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full">
                            <label htmlFor="editDate" className="block text-gray-600 text-sm mb-1">Date:</label>
                            <input type="date" id="editDate" name="editDate" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="editTime" className="block text-gray-600 text-sm mb-1">Time:</label>
                            <input type="time" id="editTime" name="editTime" value={editedTime} onChange={(e) => setEditedTime(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="editType" className="block text-gray-600 text-sm mb-1">Type:</label>
                        <select id="editType" name="editType" value={editedType} onChange={(e) => setEditedType(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200">
                            <option value="">Select type</option>
                            <option value="Clinic">Clinic</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="editNotes" className="block text-gray-600 text-sm mb-1">Notes / Reason:</label>
                        <textarea id="editNotes" name="editNotes" rows="3" value={editedNotes} onChange={(e) => setEditedNotes(e.target.value)} placeholder="Describe the issue..." className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200"></textarea>
                    </div>

                    <div className="flex justify-end space-x-3 pt-3">
                        <button type="button" onClick={onClose} className="text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm">
                            Cancel
                        </button>
                        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Mock Data
const initialVets = [
    { id: 1, name: 'Dr. Emily Carter', specialty: 'General', city: 'Multan', rating: 5, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=EC', petType: ['Dogs', 'Cats'], consultationType: ['Clinic', 'Online'], experience: 8 },
    { id: 2, name: 'Dr. Johnathan Lee', specialty: 'Dental', city: 'Multan', rating: 4, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=JL', petType: ['Dogs'], consultationType: ['Clinic'], experience: 10 },
    { id: 3, name: 'Dr. Sarah Khan', specialty: 'Surgery', city: 'Lahore', rating: 5, photo: 'https://placekitten.com/200/200', petType: ['Dogs', 'Cats', 'Birds'], consultationType: ['Online'], experience: 5 },
    { id: 4, name: 'Dr. David Chen', specialty: 'Skin', city: 'Karachi', rating: 4, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=DC', petType: ['Cats', 'Others'], consultationType: ['Clinic', 'Online'], experience: 7 },
    { id: 5, name: 'Dr. Maria Garcia', specialty: 'Nutrition', city: 'Lahore', rating: 5, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=MG', petType: ['Dogs', 'Cats'], consultationType: ['Online'], experience: 3 },
];

// Main Component
const VetDocPage = () => {
    const location = useLocation();
    const { consultations, setConsultations, showToast } = useOutletContext();
    console.log("VetDocPage component is rendering");
    const [view, setView] = useState('menu'); // menu, find-vet, consultations-vet, ask-vet, medical-records
    
    const [isVetProfileModalOpen, setIsVetProfileModalOpen] = useState(false);
    const [selectedVetProfile, setSelectedVetProfile] = useState(null);

    // New state for edit functionality
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState(null);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        const validViews = ['find-vet', 'consultations-vet', 'ask-vet', 'medical-records'];
        if (hash && validViews.includes(hash)) {
            setView(hash);
        }
    }, [location]);

    const openVetProfileModal = (vet) => {
        setSelectedVetProfile(vet);
        setIsVetProfileModalOpen(true);
    };

    const closeVetProfileModal = () => {
        setSelectedVetProfile(null);
        setIsVetProfileModalOpen(false);
    };

    const handleViewChange = (newView) => setView(newView);

    const addConsultation = (newConsultation) => {
        setConsultations(prev => [...prev, { ...newConsultation, id: Date.now() }]);
        showToast("✅ Appointment booked successfully!");
    };

    const deleteConsultation = (idToDelete) => {
        setConsultations(prev => prev.filter(appt => appt.id !== idToDelete));
        showToast("🗑️ Appointment deleted.");
    };

    // New edit function
    const editConsultation = (updatedAppointment) => {
        setConsultations(prev => prev.map(appt =>
            appt.id === updatedAppointment.id ? updatedAppointment : appt
        ));
        showToast("✅ Appointment updated successfully!");
    };

    const openEditModal = (appointment) => {
        setAppointmentToEdit(appointment);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setAppointmentToEdit(null);
        setIsEditModalOpen(false);
    };

    const renderView = () => {
        switch (view) {
            case 'find-vet':
                return <FindVetView addConsultation={addConsultation} openVetProfileModal={openVetProfileModal} showToast={showToast} />;
            case 'consultations-vet':
                return <ConsultationsView
                            consultations={consultations}
                            onDeleteConsultation={deleteConsultation}
                            onEditConsultation={openEditModal} // Pass openEditModal
                        />;
            case 'ask-vet':
                return <AskVetView />;
            case 'medical-records':
                return <MedicalRecordsView showToast={showToast} />;
            default:
                return <VetDocMenu onViewChange={handleViewChange} />;
        }
    };

    return (
        <div id="vet-doc" className="page-content">
            <section id="vetDocSection" className="container mx-auto px-4 py-10 bg-gray-50 text-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">

                    {view !== 'menu' && (
                        <button onClick={() => setView('menu')} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors flex items-center space-x-2 self-center sm:self-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span>Back to Menu</span>
                        </button>
                    )}
                </div>

                {renderView()}
            </section>

            {/* Vet Profile Modal */}
            {isVetProfileModalOpen && selectedVetProfile && (
                <div id="vetProfileModal"
                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
                  <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
                    {/* Close Button */}
                    <button id="closeProfileModal"
                            onClick={closeVetProfileModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold">
                      ✖
                    </button>

                    {/* Vet Profile Content */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <img id="vetProfilePhoto"
                           src={selectedVetProfile.photo}
                           alt="Vet Profile"
                           className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow-md" />
                      <div>
                        <h2 id="vetProfileName" className="text-2xl font-semibold text-blue-700 mb-1">
                          {selectedVetProfile.name}
                        </h2>
                        <p id="vetProfileQualification" className="text-gray-500 text-sm mb-1">
                          DVM, Specialist in {selectedVetProfile.specialty}
                        </p>
                        <p id="vetProfileLocation" className="text-gray-500 text-sm mb-1">
                          📍 {selectedVetProfile.city} Pet Clinic
                        </p>
                        <p id="vetProfileHours" className="text-gray-500 text-sm mb-3">
                          🕓 Mon–Fri: 10 AM – 6 PM
                        </p>
                        <p id="vetProfileBio" className="text-gray-700 text-sm leading-relaxed">
                          Dr. {selectedVetProfile.name} is an experienced vet passionate about improving animal health. She provides care in small animal surgery and internal medicine.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {isEditModalOpen && appointmentToEdit && (
                <EditAppointmentModal
                    appointment={appointmentToEdit}
                    onClose={closeEditModal}
                    onSave={editConsultation}
                />
            )}
        </div>
    );
};

export default VetDocPage;

// Medical Records View
const MedicalRecordsView = ({ showToast }) => {
    const [records, setRecords] = useState(() => {
        const storedRecords = localStorage.getItem("medicalRecords");
        return storedRecords ? JSON.parse(storedRecords) : [];
    });
    const [vetName, setVetName] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();

        if (!file || !vetName.trim()) {
            showToast("⚠️ Please select a file and enter vet name.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const newRecord = {
                id: Date.now(),
                vet: vetName,
                name: file.name,
                type: file.type,
                date: new Date().toLocaleDateString(),
                fileData: event.target.result,
            };

            const updatedRecords = [...records, newRecord];
            setRecords(updatedRecords);
            localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords));

            showToast("✅ Record uploaded successfully!");
            setVetName('');
            setFile(null);
            e.target.reset();
        };
        reader.readAsDataURL(file);
    };

    const deleteRecord = (idToDelete) => {
        const updatedRecords = records.filter(rec => rec.id !== idToDelete);
        setRecords(updatedRecords);
        localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords));
    };

    return (
        <div id="medical-records-view" className="vet-view">
            <div id="medicalRecordsSection" className="mt-10">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">📁 Medical Records</h2>

                {/* Upload Form */}
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
                    <form id="medicalRecordForm" onSubmit={handleUpload} className="flex flex-col md:flex-row items-center gap-4">
                        <input
                            type="file"
                            id="medicalFile"
                            accept=".pdf,image/*"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded-md p-2 w-full md:w-1/2 text-gray-700"
                        />
                        <input
                            type="text"
                            id="medicalVetName"
                            placeholder="Vet Name"
                            value={vetName}
                            onChange={(e) => setVetName(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full md:w-1/3 text-gray-700"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm"
                        >
                            Upload Record
                        </button>
                    </form>
                </div>

                {/* Display Uploaded Records */}
                <div id="medicalRecordsList" className="space-y-4">
                    {records.length === 0 ? (
                        <p id="noRecordsMsg" className="text-gray-500 text-center">
                            No medical records uploaded yet.
                        </p>
                    ) : (
                        records.map((rec) => (
                            <div key={rec.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-blue-600">{rec.name}</h3>
                                    <p className="text-gray-500 text-sm">Vet: {rec.vet}</p>
                                    <p className="text-gray-400 text-xs">Date: {rec.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <a href={rec.fileData} download={rec.name}
                                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                                        Download
                                    </a>
                                    <button onClick={() => deleteRecord(rec.id)}
                                            className="deleteRecord bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
// Menu View
const VetDocMenu = ({ onViewChange }) => (
    <div id="vet-doc-menu-view" className="vet-view grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <button onClick={() => onViewChange('medical-records')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">📁</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Medical Records</h2>
            <p className="text-slate-500 mt-1">Upload and manage pet health files.</p>
        </button>
        <button onClick={() => onViewChange('find-vet')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">🔍</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Find a Vet</h2>
            <p className="text-slate-500 mt-1">Search for verified vets by location and specialty.</p>
        </button>
        <button onClick={() => onViewChange('consultations-vet')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">🧾</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">My Consultations</h2>
            <p className="text-slate-500 mt-1">View your past and upcoming appointments.</p>
        </button>
        <button onClick={() => onViewChange('ask-vet')} className="vet-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-6xl">💬</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Ask a Vet (AI)</h2>
            <p className="text-slate-500 mt-1">Get quick answers to general pet questions.</p>
        </button>
    </div>
);

// Find a Vet View
const FindVetView = ({ addConsultation, openVetProfileModal }) => {
    const [filters, setFilters] = useState({ petType: '', specialization: '', consultationType: '', searchQuery: '' });
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedVet, setSelectedVet] = useState(null);

    const filteredVets = useMemo(() => {
        return initialVets.filter(vet =>
            (vet.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || vet.city.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
            (filters.petType === '' || vet.petType.includes(filters.petType)) &&
            (filters.specialization === '' || vet.specialty === filters.specialization) &&
            (filters.consultationType === '' || vet.consultationType.includes(filters.consultationType))
        );
    }, [filters]);

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters(prev => ({ ...prev, [id]: value }));
    };
    
    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    };

    const openBookingModal = (vet) => {
        setSelectedVet(vet);
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setSelectedVet(null);
        setIsBookingModalOpen(false);
    };

    return (
        <div id="find-vet-view" className="vet-view">
            <div className="mb-10 text-center">
                <input
                    type="text"
                    placeholder="Search by vet name or clinic..."
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                    className="w-full md:w-1/2 p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {/* Pet Type */}
              <select id="petType" onChange={handleFilterChange} value={filters.petType} className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Pet Type</option>
                <option>Dogs</option>
                <option>Cats</option>
                <option>Birds</option>
                <option>Others</option>
              </select>

              {/* Specialization */}
              <select id="specialization" onChange={handleFilterChange} value={filters.specialization} className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Specialization</option>
                <option>General</option>
                <option>Surgery</option>
                <option>Skin</option>
                <option>Dental</option>
                <option>Nutrition</option>
              </select>

              {/* Consultation Type */}
              <select id="consultationType" onChange={handleFilterChange} value={filters.consultationType} className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Consultation Type</option>
                <option>Clinic</option>
                <option>Online</option>
              </select>
            </div>

            {/* Vet Cards Grid */}
            <div id="vetCardsContainer" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVets.length > 0 ? (
                    filteredVets.map(vet => <VetCard key={vet.id} vet={vet} onBook={openBookingModal} onViewProfile={openVetProfileModal} />)
                ) : (
                    <p id="no-vets-found" className="text-center text-slate-500 py-12 col-span-full">No veterinarians found matching your criteria.</p>
                )}
            </div>
            {isBookingModalOpen && <BookAppointmentModal vet={selectedVet} onClose={closeBookingModal} addConsultation={addConsultation} />}
        </div>
    );
};

const VetCard = ({ vet, onBook, onViewProfile }) => (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center border border-gray-100">
      <img src={vet.photo} alt={vet.name}
           className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-blue-200"/>
      <h3 className="text-lg font-semibold text-blue-700">{vet.name}</h3>
      <p className="text-gray-500 text-sm">{vet.specialty} | {vet.experience} yrs exp.</p>
      <p className="text-gray-400 text-sm mb-1">📍 {vet.city}</p>
      <p className="text-yellow-500 mb-3">⭐ {vet.rating} / 5</p>
      <div className="flex space-x-2 mt-auto">
        <button
          onClick={() => onViewProfile(vet)}
          className="viewProfileBtn bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 text-sm"
          data-vet={vet.name}
        >
          View Profile
        </button>
        <button
          onClick={() => onBook(vet)}
          className="bookAppointmentBtn bg-teal-500 hover:bg-teal-600 text-white rounded-md px-3 py-1 text-sm"
          data-vet={vet.name}
        >
          Book
        </button>
      </div>
    </div>
);

// Consultations View
const ConsultationsView = ({ consultations, onDeleteConsultation, onEditConsultation }) => {
    const upcoming = consultations.filter(c => c.status === 'Upcoming');
    const past = consultations.filter(c => c.status === 'Past');

    return (
        <div id="consultations-vet-view" className="vet-view">
            <div id="consultations-content-area">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Upcoming</h2>
                {upcoming.length > 0 ? upcoming.map(c => <ConsultationCard key={c.id} c={c} onDelete={onDeleteConsultation} onEdit={onEditConsultation} />) : <p className="text-slate-500 mb-8" id="noUpcomingAppointmentsMsg">No upcoming appointments.</p>}
                
                <h2 className="text-3xl font-bold text-slate-800 mt-8 mb-4">Past</h2>
                {past.length > 0 ? past.map(c => <ConsultationCard key={c.id} c={c} onDelete={onDeleteConsultation} onEdit={onEditConsultation} />) : <p className="text-slate-500" id="noPastAppointmentsMsg">No past appointments.</p>}
                
            </div>
            <VetPrep />
        </div>
    );
};

const ConsultationCard = ({ c, onDelete, onEdit }) => (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4 flex justify-between items-center ${c.status === 'Past' ? 'opacity-70' : ''}`}>
        <div>
            <p className="font-bold">{c.vetName}</p>
            <p className="text-sm text-slate-500">Pet: {c.pet}</p>
            <p className="text-sm text-slate-500">{new Date(c.date + 'T' + c.time).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            {c.reason && <p className="text-sm text-slate-500">Reason: {c.reason}</p>}
            <p className="text-sm text-slate-500">Type: {c.type}</p>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`font-medium text-xs py-1 px-3 rounded-full ${c.status === 'Upcoming' ? 'text-blue-600 bg-blue-100' : 'text-slate-600 bg-slate-200'}`}>{c.status}</span>
            <button onClick={() => onEdit(c)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"> 
                Edit
            </button>
            <button onClick={() => onDelete(c.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                Delete
            </button>
        </div>
    </div>
);

// AI Features
const callGeminiAPI = async (userPrompt, systemInstruction) => {
    console.log("Calling mock Gemini API");
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (systemInstruction.includes("checklist")) {
        return `### Questions to Ask the Vet
* What are the possible causes?
* What are the treatment options?

### Things to Observe & Note Beforehand
* Note any changes in behavior.
* Check for changes in appetite or thirst.

### What to Bring
* Your pet's favorite toy.
* A list of current medications.`;
    }
    return `**Disclaimer:** I am an AI assistant and not a real veterinarian. This information is for educational purposes only and is not a substitute for professional veterinary advice. Please consult a licensed vet for any health concerns.

Based on your question, here is some general information...`;
};

const VetPrep = () => {
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');

    const generatePrepList = async () => {
        if (!reason.trim()) {
            setResult('<p class="text-red-500">Please enter a reason for your visit.</p>');
            return;
        }
        setIsLoading(true);
        setResult('');
        const systemInstruction = "You are a helpful assistant for pet owners. Generate a clear, concise checklist to help a user prepare for a vet visit. The list should be formatted with markdown. Include sections for 'Questions to Ask the Vet', 'Things to Observe & Note Beforehand', and 'What to Bring'.";
        const responseText = await callGeminiAPI(`The reason for my vet visit is: "${reason}"`, systemInstruction);
        const htmlResponse = responseText.replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-slate-700 mt-4 mb-2">$1</h3>').replace(/\* (.*?)\n/g, '<li class="ml-5 list-disc">$1</li>').replace(/<\/li>\n/g, '</li>');
        setResult(`<ul>${htmlResponse}</ul>`);
        setIsLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mt-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">✨ Prepare for an Upcoming Visit</h2>
            <p className="text-slate-600 mb-4">Describe the reason for your visit and we'll generate a helpful preparation list.</p>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., My cat has been sneezing"></textarea>
            <button onClick={generatePrepList} disabled={isLoading} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-300">
                <span>{isLoading ? 'Generating...' : 'Generate Prep List'}</span>
            </button>
            {isLoading && <div className="flex justify-center mt-6"><div className="loader"></div></div>}
            {result && <div className="mt-6 text-left" dangerouslySetInnerHTML={{ __html: result }}></div>}
        </div>
    );
};

const AskVetView = () => {
    const [symptoms, setSymptoms] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');

    const handleGetAdvice = () => {
        if (!symptoms.trim()) {
            alert("Please describe your pet’s symptoms first.");
            return;
        }

        setIsLoading(true);
        setAiResponse('');

        setTimeout(() => {
            const mockResponses = [
              "It may be a mild allergy. Try checking your pet’s diet and environment.",
              "This sounds like a minor infection. Clean the area and consult a vet if it worsens.",
              "Your pet may be dehydrated. Ensure proper hydration and observe for 24 hours.",
              "This could be related to digestion. Try a light diet and visit your vet if it continues.",
            ];

            const randomResponse =
              mockResponses[Math.floor(Math.random() * mockResponses.length)];

            setAiResponse(randomResponse);
            setIsLoading(false);
        }, 1500);
    };
    

    return (
        <div id="ask-vet-view" className="vet-view">
            <div id="askVetAISection" className="mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">🤖 Ask Vet AI</h2>

              <div className="flex flex-col gap-4">
                <textarea
                  id="vetAIInput"
                  rows="4"
                  placeholder="Describe your pet’s symptoms or health issue..."
                  className="border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-blue-200"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                ></textarea>
                <button
                  id="getAIAdviceBtn"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm self-end"
                  onClick={handleGetAdvice}
                  disabled={isLoading}
                >
                  {isLoading ? 'Analyzing...' : 'Get AI Advice'}
                </button>
              </div>

              {/* Output Area */}
              <div id="aiAdviceOutput" className={`mt-4 ${!isLoading && !aiResponse ? 'hidden' : ''} bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-700`}>
                {isLoading && <p className='text-gray-500 italic'>Analyzing symptoms... 🤔</p>}
                {aiResponse && (
                    <>
                        <p className="text-gray-700"><strong>AI Suggestion:</strong> {aiResponse}</p>
                        <p className="text-xs text-gray-400 mt-1 italic">⚠️ This is a simulated response. Always confirm with a licensed vet.</p>
                    </>
                )}
              </div>
            </div>

            
        </div>
    );
};