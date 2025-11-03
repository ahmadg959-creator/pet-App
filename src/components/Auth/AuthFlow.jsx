import React, { useState } from 'react';
import Welcome from './Welcome';
import Login from './Login';
import AddPetWizard from './AddPetWizard';

const AuthFlow = ({ onAuthComplete }) => {
  const [step, setStep] = useState('welcome');
  const [userData, setUserData] = useState(null);

  const handleWelcomeComplete = () => {
    setStep('login');
  };

  const handleLoginComplete = (data) => {
    setUserData(data);
    setStep('add-pet');
  };

  const handleAddPetComplete = (petData) => {
    onAuthComplete({ ...userData, pets: [petData] });
  };

  return (
    <div id="auth-flow-container" className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {step === 'welcome' && <Welcome onComplete={handleWelcomeComplete} />}
      {step === 'login' && <Login onComplete={handleLoginComplete} />}
      {step === 'add-pet' && <AddPetWizard onComplete={handleAddPetComplete} />}
    </div>
  );
};

export default AuthFlow;