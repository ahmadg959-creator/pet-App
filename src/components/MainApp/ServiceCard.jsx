import React from 'react';

const ServiceCard = ({ icon, title, description, page, view, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-xl">
        <div className="text-5xl mb-3">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        <button
          onClick={onClick}
          className="shortcut-btn viewProvidersBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition"
          data-page={page}
          data-view={view}
        >
          View Providers
        </button>
    </div>
  );
};

export default ServiceCard;
