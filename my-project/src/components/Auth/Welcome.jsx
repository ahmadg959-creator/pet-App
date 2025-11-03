
import React from 'react';

const Welcome = ({ setAuthView }) => {
  return (
    <div id="welcome-screen" className="auth-view text-center max-w-md w-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-blue-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 9.5a2.5 2.5 0 0 1 0 5h-5a2.5 2.5 0 0 1 0-5h5Z" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" /><path d="M12 16c-2.67 0-5.18-1.28-6.84-3.34a.5.5 0 0 1 .68-.72A11.02 11.02 0 0 0 12 13.5a11.02 11.02 0 0 0 6.16-1.56.5.5 0 0 1 .68.72C17.18 14.72 14.67 16 12 16Z" /></svg>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome to PetCare Connect</h1>
      <p className="text-slate-600 mb-8">The best place to manage your pet's life, connect with vets, and join a loving community. All in one app.</p>
      <button id="get-started-btn" onClick={() => setAuthView('login')} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Get Started</button>
    </div>
  );
};

export default Welcome;
