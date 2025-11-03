import React from 'react';

const ProfilePage = ({ setPage }) => {
  return (
    <div id="profile" className="page-content">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Settings Navigation Sidebar */}
          <div className="md:col-span-1">
            <nav className="flex flex-col space-y-2">
              <button data-profile-tab="info" className="profile-tab-btn bg-blue-100 text-blue-600 font-semibold p-3 rounded-lg text-left w-full transition-colors">👤 Profile Info</button>
              <button data-profile-tab="notifications" className="profile-tab-btn text-slate-600 hover:bg-slate-100 font-semibold p-3 rounded-lg text-left w-full transition-colors">🔔 Notifications</button>
              <button data-profile-tab="settings" className="profile-tab-btn text-slate-600 hover:bg-slate-100 font-semibold p-3 rounded-lg text-left w-full transition-colors">⚙️ App Settings</button>
              <button onClick={() => setPage('auth')} id="logout-btn" className="text-red-600 hover:bg-red-50 font-semibold p-3 rounded-lg text-left w-full mt-4 transition-colors">🚪 Logout</button>
            </nav>
          </div>
          {/* Settings Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 min-h-[400px]">
              {/* Profile Info View */}
              <div id="profile-info-view" className="profile-tab-content">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Information</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="user-name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" id="user-name" defaultValue="Ahmad" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label htmlFor="user-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" id="user-email" defaultValue="ahmad@example.com" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label htmlFor="user-phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" id="user-phone" defaultValue="+92 300 1234567" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label htmlFor="user-location" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input type="text" id="user-location" defaultValue="Multan, Pakistan" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div className="text-right pt-2">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;