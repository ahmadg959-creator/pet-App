
import React, { useState } from 'react';

const serviceProviders = [
    { id: 1, name: 'Paws & Bubbles', type: 'Groomer', city: 'Multan', rating: 5, photo: 'https://placehold.co/100x100/818CF8/FFFFFF?text=PB' },
    { id: 2, name: 'The Polished Pup', type: 'Groomer', city: 'Lahore', rating: 4, photo: 'https://placehold.co/100x100/818CF8/FFFFFF?text=PP' },
    { id: 3, name: 'Good Boy Training', type: 'Trainer', city: 'Multan', rating: 5, photo: 'https://placehold.co/100x100/F472B6/FFFFFF?text=GBT' },
    { id: 4, name: 'City Paws Walkers', type: 'Walker', city: 'Lahore', rating: 4, photo: 'https://placehold.co/100x100/60A5FA/FFFFFF?text=CPW' },
];

const adoptablePets = [
    { id: 1, name: 'Whiskers', breed: 'Tabby Cat', age: '2 years', photo: 'https://placehold.co/400x300/a5b4fc/FFFFFF?text=Whiskers', desc: 'A friendly and curious cat looking for a calm home.' },
    { id: 2, name: 'Rex', breed: 'Labrador Mix', age: '8 months', photo: 'https://placehold.co/400x300/a5b4fc/FFFFFF?text=Rex', desc: 'An energetic and playful puppy who loves fetch.' },
    { id: 3, name: 'Kiwi', breed: 'Parakeet', age: '1 year', photo: 'https://placehold.co/400x300/a5b4fc/FFFFFF?text=Kiwi', desc: 'A cheerful bird who enjoys singing and company.' },
];

const marketplaceProducts = [
    { id: 1, name: 'Organic Dog Food', price: '$55.99', photo: 'https://placehold.co/300x300/fbbf24/FFFFFF?text=Food' },
    { id: 2, name: 'Durable Chew Toy', price: '$12.50', photo: 'https://placehold.co/300x300/fbbf24/FFFFFF?text=Toy' },
    { id: 3, name: 'Cozy Pet Bed', price: '$45.00', photo: 'https://placehold.co/300x300/fbbf24/FFFFFF?text=Bed' },
    { id: 4, name: 'Reflective Leash', price: '$22.00', photo: 'https://placehold.co/300x300/fbbf24/FFFFFF?text=Leash' },
];

const ServicesPage = () => {
    const [view, setView] = useState('menu');

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const GroomingView = () => (
        <div id="grooming-view">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="City (e.g., Multan)" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                        <option value="">All Services</option>
                        <option>Groomer</option>
                        <option>Trainer</option>
                        <option>Walker</option>
                    </select>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">Search</button>
                </div>
            </div>
            <div id="service-provider-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceProviders.map(provider => (
                    <div key={provider.id} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <img src={provider.photo} alt={provider.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-slate-200" />
                        <h3 className="text-xl font-bold text-slate-800">{provider.name}</h3>
                        <p className="text-blue-500 font-semibold">{provider.type}</p>
                        <p className="text-sm text-slate-500 mb-3">{provider.city}</p>
                        <div className="my-3 flex items-center justify-center gap-1 text-yellow-400">
                            {renderStars(provider.rating)}
                        </div>
                        <button className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-5 rounded-full transition-colors">Contact</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const AdoptionView = () => (
        <div id="adoption-view">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">List a Pet for Adoption</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Pet's Name" className="w-full p-3 border border-slate-300 rounded-lg" />
                    <input type="text" placeholder="Pet's Breed" className="w-full p-3 border border-slate-300 rounded-lg" />
                </div>
                <textarea className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Enter some keywords about their personality (e.g., playful, loves kids, cuddly, house-trained)"></textarea>
                <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    ✨ Generate Adoption Description with AI
                </button>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg">Submit Listing</button>
            </div>
            <div id="adoption-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adoptablePets.map(pet => (
                    <div key={pet.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <img src={pet.photo} alt={pet.name} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <h3 className="text-2xl font-bold text-slate-800">{pet.name}</h3>
                            <p className="text-slate-500">{`${pet.breed}, ${pet.age}`}</p>
                            <p className="text-sm mt-2">{pet.desc}</p>
                            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors">Learn More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MarketplaceView = () => (
        <div id="marketplace-view">
            <div id="product-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {marketplaceProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center">
                        <div className="bg-slate-200 h-40 flex items-center justify-center">
                            <img src={product.photo} alt={product.name} className="h-32 w-32 object-contain" />
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-slate-800">{product.name}</h4>
                            <p className="text-lg font-semibold text-blue-500 mt-1">{product.price}</p>
                            <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MedicationView = () => (
        <div id="medication-view">
            <div id="medication-reminder-list" className="space-y-4">
                <p className="text-center text-slate-500 py-8">No upcoming medication reminders found in your pet profiles.</p>
            </div>
        </div>
    );

    return (
        <div id="services" className="page-content">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Services for You</h1>
                {view !== 'menu' && (
                    <button onClick={() => setView('menu')} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back to Services</span>
                    </button>
                )}
            </div>

            {view === 'menu' && (
                <div id="services-menu-view" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button onClick={() => setView('grooming')} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <span className="text-6xl">🧽</span>
                        <h2 className="text-2xl font-bold text-slate-800 mt-4">Grooming & Care</h2>
                        <p className="text-slate-500 mt-1">Find local groomers, trainers, and walkers.</p>
                    </button>
                    <button onClick={() => setView('adoption')} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <span className="text-6xl">🏠</span>
                        <h2 className="text-2xl font-bold text-slate-800 mt-4">Adoption / Rehoming</h2>
                        <p className="text-slate-500 mt-1">Browse or list adoptable pets.</p>
                    </button>
                    <button onClick={() => setView('marketplace')} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <span className="text-6xl">🛒</span>
                        <h2 className="text-2xl font-bold text-slate-800 mt-4">Marketplace</h2>
                        <p className="text-slate-500 mt-1">Shop for essential pet products.</p>
                    </button>
                    <button onClick={() => setView('medication')} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <span className="text-6xl">💊</span>
                        <h2 className="text-2xl font-bold text-slate-800 mt-4">Medication Reminders</h2>
                        <p className="text-slate-500 mt-1">View upcoming medication schedules.</p>
                    </button>
                </div>
            )}

            {view === 'grooming' && <GroomingView />}
            {view === 'adoption' && <AdoptionView />}
            {view === 'marketplace' && <MarketplaceView />}
            {view === 'medication' && <MedicationView />}
        </div>
    );
};

export default ServicesPage;
