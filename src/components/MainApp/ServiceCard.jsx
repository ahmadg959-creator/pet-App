import React from 'react';

const ServiceCard = ({ icon, title, subtitle, page, view }) => {
  return (
    <button data-page={page} data-view={view} className="shortcut-btn bg-white rounded-2xl shadow-lg p-6 text-center transition-transform transform hover:-translate-y-1">
        <div className="text-4xl">{icon}</div>
        <h3 className="font-bold text-slate-800 mt-2">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
    </button>
  );
};

export default ServiceCard;
