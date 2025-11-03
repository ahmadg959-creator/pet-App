
import React, { useState } from 'react';

const AddPetWizard = ({ setPage }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div id="wizard-step-1" className="wizard-step">
            <label htmlFor="wizard-pet-name" className="block text-xl font-medium text-slate-700 mb-3 text-center">What's your pet's name?</label>
            <input type="text" id="wizard-pet-name" className="w-full text-center text-lg p-3 border-b-2 border-slate-300 focus:border-blue-500 focus:outline-none transition" placeholder="e.g., Buddy" />
          </div>
        );
      case 2:
        return (
          <div id="wizard-step-2" className="wizard-step">
            <label className="block text-xl font-medium text-slate-700 mb-3 text-center">What kind of pet is it?</label>
            <div className="grid grid-cols-3 gap-4">
              <button className="wizard-pet-type-btn p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors" data-type="Dog" onClick={nextStep}>
                <span className="text-4xl">🐶</span>
                <span className="block mt-1 font-semibold">Dog</span>
              </button>
              <button className="wizard-pet-type-btn p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors" data-type="Cat" onClick={nextStep}>
                <span className="text-4xl">🐱</span>
                <span className="block mt-1 font-semibold">Cat</span>
              </button>
              <button className="wizard-pet-type-btn p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors" data-type="Other" onClick={nextStep}>
                <span className="text-4xl">🐰</span>
                <span className="block mt-1 font-semibold">Other</span>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div id="wizard-step-3" className="wizard-step">
            <label htmlFor="wizard-pet-breed" className="block text-xl font-medium text-slate-700 mb-3 text-center">What's their breed?</label>
            <input type="text" id="wizard-pet-breed" className="w-full text-center text-lg p-3 border-b-2 border-slate-300 focus:border-blue-500 focus:outline-none transition" placeholder="e.g., Golden Retriever" />
          </div>
        );
      case 4:
        return (
          <div id="wizard-step-4" className="wizard-step">
            <label className="block text-xl font-medium text-slate-700 mb-3 text-center">Upload a photo</label>
            <div className="flex flex-col items-center">
              <img id="wizard-photo-preview" src="https://placehold.co/128x128/e2e8f0/94a3b8?text=Pet" className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 mb-4" alt="Pet photo preview" />
              <label htmlFor="wizard-pet-photo" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-full text-sm transition-colors">
                Choose Photo
              </label>
              <input type="file" id="wizard-pet-photo" className="hidden" accept="image/*" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="add-pet-wizard-screen" className="auth-view max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">Tell us about your pet</h1>
      <p className="text-slate-500 text-center mb-6">Let's create a profile for your new friend.</p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
        <div id="wizard-progress-bar" className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>

      {/* Wizard Steps */}
      <div id="wizard-steps-container">
        {renderStep()}
      </div>

      {/* Wizard Navigation */}
      <div className="flex justify-between items-center mt-10">
        <button id="wizard-back-btn" onClick={prevStep} className={`text-slate-600 hover:text-slate-800 font-semibold py-2 px-4 rounded-lg transition-opacity ${step === 1 ? 'opacity-0' : ''}`}>Back</button>
        <button id="wizard-next-btn" onClick={step === 4 ? () => setPage('home') : nextStep} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">{step === 4 ? 'Finish' : 'Next'}</button>
      </div>
    </div>
  );
};

export default AddPetWizard;
