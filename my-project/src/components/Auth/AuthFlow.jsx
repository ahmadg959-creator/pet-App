
import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import AddPetWizard from './AddPetWizard';

const AuthFlow = ({ setPage }) => {
  const [authView, setAuthView] = React.useState('welcome');

  const renderAuthView = () => {
    switch (authView) {
        return <Welcome setAuthView={setAuthView} />;
      case 'login':
        return <Login setAuthView={setAuthView} />;
      case 'add-pet-wizard':
        return <AddPetWizard setPage={setPage} />;
        return <Welcome setAuthView={setAuthView} />;
    }
  };

  return (
    <div id="auth-flow-container" className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {renderAuthView()}
    </div>
  );
};

export default AuthFlow;
