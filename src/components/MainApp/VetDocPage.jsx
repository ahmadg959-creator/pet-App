import React, { useState, useMemo } from 'react';

// Mock Data
const initialVets = [
    { id: 1, name: 'Dr. Emily Carter', specialty: 'General Care', city: 'Multan', rating: 5, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=EC' },
    { id: 2, name: 'Dr. Johnathan Lee', specialty: 'Dentistry', city: 'Multan', rating: 4, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=JL' },
    { id: 3, name: 'Dr. Sarah Khan', specialty: 'Surgery', city: 'Lahore', rating: 5, photo: 'https://placehold.co/100x100/A8D5BA/333333?text=SK' },
];

const initialConsultations = [
     { id: 1, vetId: 3, vetName: 'Dr. Sarah Khan', date: '2025-10-02', time: '10:00', reason: 'Checkup', status: 'Past' },
     { id: 2, vetId: 1, vetName: 'Dr. Emily Carter', date: '2025-09-05', time: '14:30', reason: 'Vaccination', status: 'Past' },
];

// Main Component
const VetDocPage = () => {
    const [view, setView] = useState('menu'); // menu, find-vet, consultations-vet, ask-vet
    const [consultations, setConsultations] = useState(initialConsultations);

    const handleViewChange = (newView) => setView(newView);

    const addConsultation = (newConsultation) => {
        setConsultations(prev => [...prev, { ...newConsultation, id: Date.now() }]);
    };

    const renderView = () => {
        switch (view) {
            case 'find-vet':
                return <FindVetView addConsultation={addConsultation} />;
            case 'consultations-vet':
                return <ConsultationsView consultations={consultations} />;
            case 'ask-vet':
                return <AskVetView />;
            default:
                return <VetDocMenu onViewChange={handleViewChange} />;
        }
    };

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
            {renderView()}
        </div>
    );
};

// Menu View
const VetDocMenu = ({ onViewChange }) => (
    <div id="vet-doc-menu-view" className="vet-view grid grid-cols-1 md:grid-cols-3 gap-8">
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
const FindVetView = ({ addConsultation }) => {
    const [filters, setFilters] = useState({ city: '', specialty: '', rating: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVet, setSelectedVet] = useState(null);

    const filteredVets = useMemo(() => {
        return initialVets.filter(vet =>
            vet.city.toLowerCase().includes(filters.city.toLowerCase()) &&
            (filters.specialty === '' || vet.specialty === filters.specialty) &&
            vet.rating >= filters.rating
        );
    }, [filters]);

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters(prev => ({ ...prev, [id]: value }));
    };

    const openBookingModal = (vet) => {
        setSelectedVet(vet);
        setIsModalOpen(true);
    };

    const closeBookingModal = () => {
        setSelectedVet(null);
        setIsModalOpen(false);
    };

    return (
        <div id="find-vet-view" className="vet-view">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input id="city" type="text" placeholder="City (e.g., Multan)" onChange={handleFilterChange} className="md:col-span-2 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    <select id="specialty" onChange={handleFilterChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                        <option value="">All Specialties</option>
                        <option>General Care</option>
                        <option>Dentistry</option>
                        <option>Surgery</option>
                        <option>Dermatology</option>
                    </select>
                    <select id="rating" onChange={handleFilterChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                        <option value="0">Any Rating</option>
                        <option value="4">4 Stars & Up</option>
                        <option value="3">3 Stars & Up</option>
                        <option value="2">2 Stars & Up</option>
                    </select>
                </div>
            </div>
            <div id="vet-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVets.length > 0 ? (
                    filteredVets.map(vet => <VetCard key={vet.id} vet={vet} onBook={openBookingModal} />)
                ) : (
                    <p id="no-vets-found" className="text-center text-slate-500 py-12 col-span-full">No veterinarians found matching your criteria.</p>
                )}
            </div>
            {isModalOpen && <BookingModal vet={selectedVet} onClose={closeBookingModal} addConsultation={addConsultation} />}
        </div>
    );
};

const VetCard = ({ vet, onBook }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
        <img src={vet.photo} alt={vet.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-200" />
        <h3 className="text-xl font-bold text-slate-800">{vet.name}</h3>
        <p className="text-slate-500">{vet.specialty}</p>
        <div className="my-3 flex items-center gap-1">
            {'★'.repeat(vet.rating)}{'☆'.repeat(5 - vet.rating)}
            <span className="text-xs text-slate-500 ml-1">({vet.rating}.0)</span>
        </div>
        <p className="text-sm text-slate-500 mb-4">{vet.city}</p>
        <button onClick={() => onBook(vet)} className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors">Book</button>
    </div>
);

// Consultations View
const ConsultationsView = ({ consultations }) => {
    const upcoming = consultations.filter(c => c.status === 'Upcoming');
    const past = consultations.filter(c => c.status === 'Past');

    return (
        <div id="consultations-vet-view" className="vet-view">
            <div id="consultations-content-area">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Upcoming</h2>
                {upcoming.length > 0 ? upcoming.map(c => <ConsultationCard key={c.id} c={c} />) : <p className="text-slate-500 mb-8">No upcoming appointments.</p>}
                
                <h2 className="text-3xl font-bold text-slate-800 mt-8 mb-4">Past</h2>
                {past.length > 0 ? past.map(c => <ConsultationCard key={c.id} c={c} />) : <p className="text-slate-500">No past appointments.</p>}
            </div>
            <VetPrep />
        </div>
    );
};

const ConsultationCard = ({ c }) => (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4 flex justify-between items-center ${c.status === 'Past' ? 'opacity-70' : ''}`}>
        <div>
            <p className="font-bold">{c.vetName}</p>
            <p className="text-sm text-slate-500">{new Date(c.date + 'T' + c.time).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            {c.reason && <p className="text-sm text-slate-500">Reason: {c.reason}</p>}
        </div>
        <span className={`font-medium text-xs py-1 px-3 rounded-full ${c.status === 'Upcoming' ? 'text-blue-600 bg-blue-100' : 'text-slate-600 bg-slate-200'}`}>{c.status}</span>
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
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');

    const getAiAnswer = async () => {
        if (!question.trim()) {
            setResult('<p class="text-red-500">Please enter a question.</p>');
            return;
        }
        setIsLoading(true);
        setResult('');
        const systemInstruction = "You are an AI assistant providing general pet information. You are not a veterinarian. Your answer must start with this exact disclaimer: '**Disclaimer:** I am an AI assistant and not a real veterinarian. This information is for educational purposes only and is not a substitute for professional veterinary advice. Please consult a licensed vet for any health concerns.' After the disclaimer, answer the user's question generally.";
        const responseText = await callGeminiAPI(`My question is: "${question}"`, systemInstruction);
        const htmlResponse = responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        setResult(`<div class="p-4 bg-slate-100 rounded-lg text-sm">${htmlResponse}</div>`);
        setIsLoading(false);
    };

    return (
        <div id="ask-vet-view" className="vet-view">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">💬 Ask a Vet (Q&A)</h2>
                <p className="text-slate-600 mb-4">Have a general question? Our AI can provide information. This is not a substitute for professional advice.</p>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="e.g., Why do dogs eat grass?"></textarea>
                <button onClick={getAiAnswer} disabled={isLoading} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-300">
                    <span>{isLoading ? 'Getting Answer...' : 'Get AI Answer'}</span>
                </button>
                {isLoading && <div className="flex justify-center mt-6"><div className="loader"></div></div>}
                {result && <div className="mt-6 text-left" dangerouslySetInnerHTML={{ __html: result }}></div>}
            </div>
        </div>
    );
};

// Booking Modal
const BookingModal = ({ vet, onClose, addConsultation }) => {
    const [bookingDetails, setBookingDetails] = useState({ date: '', time: '', reason: '' });
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addConsultation({
            vetId: vet.id,
            vetName: vet.name,
            ...bookingDetails,
            status: 'Upcoming'
        });
        setIsConfirmed(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {!isConfirmed ? (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Book Appointment</h2>
                        <p className="text-slate-600 mb-6">with <span className="font-semibold">{vet.name}</span></p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <input type="date" id="date" value={bookingDetails.date} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                                <input type="time" id="time" value={bookingDetails.time} onChange={handleChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                                <textarea id="reason" value={bookingDetails.reason} onChange={handleChange} rows="3" placeholder="Reason for visit / Symptoms" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"></textarea>
                                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Request Appointment</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Request Sent!</h2>
                        <p className="text-slate-600">The clinic will contact you to confirm the appointment.</p>
                        <button onClick={onClose} className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-5 rounded-full transition-colors">Done</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VetDocPage;
