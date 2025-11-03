
import React from 'react';

const ServicesPage = () => {
  return (
    <div id="services" className="page-content">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Services for You</h1>
        <button id="back-to-services-menu-btn" className="hidden bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          <span>Back to Services</span>
        </button>
      </div>

      {/* Services Menu View */}
      <div id="services-menu-view" className="service-view grid grid-cols-1 md:grid-cols-2 gap-8">
        <button data-service-view="grooming" className="service-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
          <span className="text-6xl">🧽</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-4">Grooming & Care</h2>
          <p className="text-slate-500 mt-1">Find local groomers, trainers, and walkers.</p>
        </button>
        <button data-service-view="adoption" className="service-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
          <span className="text-6xl">🏠</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-4">Adoption / Rehoming</h2>
          <p className="text-slate-500 mt-1">Browse or list adoptable pets.</p>
        </button>
        <button data-service-view="marketplace" className="service-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
          <span className="text-6xl">🛒</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-4">Marketplace</h2>
          <p className="text-slate-500 mt-1">Shop for essential pet products.</p>
        </button>
        <button data-service-view="medication" className="service-menu-btn bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
          <span className="text-6xl">💊</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-4">Medication Reminders</h2>
          <p className="text-slate-500 mt-1">View upcoming medication schedules.</p>
        </button>
      </div>

      {/* Grooming & Care View */}
      <div id="grooming-view" className="service-view hidden">
        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input id="service-city-search" type="text" placeholder="City (e.g., Multan)" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
            <select id="service-type-filter" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
              <option value="">All Services</option>
              <option>Groomer</option>
              <option>Trainer</option>
              <option>Walker</option>
            </select>
            <button id="search-services-btn" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">Search</button>
          </div>
        </div>
        {/* Service Provider List */}
        <div id="service-provider-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service provider cards will be inserted here */}
        </div>
      </div>

      {/* Adoption View */}
      <div id="adoption-view" className="service-view hidden">
        {/* List a Pet Form */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">List a Pet for Adoption</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Pet's Name" className="w-full p-3 border border-slate-300 rounded-lg" />
            <input type="text" placeholder="Pet's Breed" className="w-full p-3 border border-slate-300 rounded-lg" />
          </div>
          <textarea id="adoption-keywords-input" className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Enter some keywords about their personality (e.g., playful, loves kids, cuddly, house-trained)"></textarea>
          <button id="generate-adoption-bio-btn" className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
            ✨ Generate Adoption Description with AI
          </button>
          <div id="adoption-bio-loader" className="hidden justify-center mt-4"><div className="loader"></div></div>
          <textarea id="adoption-bio-result" className="hidden mt-4 w-full h-40 p-3 border border-slate-300 rounded-lg bg-slate-50" placeholder="Your generated bio will appear here..."></textarea>
          <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg">Submit Listing</button>
        </div>

        <div id="adoption-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Adoptable pets will be inserted here */}
        </div>
      </div>

      {/* Marketplace View */}
      <div id="marketplace-view" className="service-view hidden">
        <div id="product-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Products will be inserted here */}
        </div>
      </div>

      {/* Medication Reminders View */}
      <div id="medication-view" className="service-view hidden">
        <div id="medication-reminder-list" className="space-y-4">
          {/* Reminders will be inserted here */}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
