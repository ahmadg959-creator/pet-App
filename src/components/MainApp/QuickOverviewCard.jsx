import React from 'react';

const QuickOverviewCard = ({ icon, title, value, page, view, colorClass, onClick, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      data-page={page} 
      data-view={view} 
      disabled={disabled}
      className={`shortcut-btn w-full text-left p-4 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 ${colorClass} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
        <div className="text-3xl">{icon}</div>
        <p className="mt-2 font-semibold text-sm opacity-80">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </button>
  );
};

export default QuickOverviewCard;
