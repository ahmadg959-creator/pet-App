
import React, { useState } from 'react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('info');

    const ProfileInfo = () => (
        <div id="profile-info-view">
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
    );

    const Notifications = () => (
        <div id="profile-notifications-view">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Notification Preferences</h2>
            <div className="space-y-6 divide-y divide-slate-200">
                <div className="pt-6 first:pt-0">
                    <h3 className="text-lg font-semibold text-slate-700">Appointment Reminders</h3>
                    <p className="text-sm text-slate-500 mb-3">For upcoming vet or grooming appointments.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center justify-between w-full sm:w-auto flex-grow p-3 bg-slate-50 rounded-lg border"><span>Push Notification</span> <input type="checkbox" className="toggle" defaultChecked /></label>
                        <label className="flex items-center justify-between w-full sm:w-auto flex-grow p-3 bg-slate-50 rounded-lg border"><span>Email</span> <input type="checkbox" className="toggle" defaultChecked /></label>
                        <label className="flex items-center justify-between w-full sm:w-auto flex-grow p-3 bg-slate-50 rounded-lg border"><span>SMS</span> <input type="checkbox" className="toggle" /></label>
                    </div>
                </div>
                <div className="pt-6">
                    <h3 className="text-lg font-semibold text-slate-700">Medication Reminders</h3>
                    <p className="text-sm text-slate-500 mb-3">When it's time for your pet's medication.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center justify-between w-full sm:w-auto flex-grow p-3 bg-slate-50 rounded-lg border"><span>Push Notification</span> <input type="checkbox" className="toggle" defaultChecked /></label>
                        <label className="flex items-center justify-between w-full sm:w-auto flex-grow p-3 bg-slate-50 rounded-lg border"><span>Email</span> <input type="checkbox" className="toggle" /></label>
                        <label className="flex items-center justify-between w-full sm:w-auto flex-grow p-3 bg-slate-50 rounded-lg border"><span>SMS</span> <input type="checkbox" className="toggle" /></label>
                    </div>
                </div>
            </div>
        </div>
    );

    const AppSettings = () => (
        <div id="profile-settings-view">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">App Settings</h2>
            <div className="space-y-6 divide-y divide-slate-200">
                <div className="pt-6 first:pt-0">
                    <h3 className="text-lg font-semibold text-slate-700">Theme</h3>
                    <p className="text-sm text-slate-500 mb-3">Choose your preferred app appearance.</p>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center"><input type="radio" name="theme" value="light" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" defaultChecked /> <span className="ml-2 text-slate-800">Light</span></label>
                        <label className="flex items-center"><input type="radio" name="theme" value="dark" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" /> <span className="ml-2 text-slate-800">Dark</span></label>
                    </div>
                </div>
                <div className="pt-6">
                    <h3 className="text-lg font-semibold text-slate-700">Language</h3>
                    <p className="text-sm text-slate-500 mb-3">Select your language.</p>
                    <select className="w-full max-w-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
                        <option>English</option>
                        <option>Urdu</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>
                <div className="pt-6">
                    <h3 className="text-lg font-semibold text-slate-700">Data Management</h3>
                    <p className="text-sm text-slate-500 mb-3">Export all your pet data and user information.</p>
                    <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded-lg transition-colors">Export My Data</button>
                </div>
            </div>
        </div>
    );

    return (
        <div id="profile" className="page-content">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8">Settings</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <nav className="flex flex-col space-y-2">
                            <button onClick={() => setActiveTab('info')} className={`profile-tab-btn font-semibold p-3 rounded-lg text-left w-full transition-colors ${activeTab === 'info' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>👤 Profile Info</button>
                            <button onClick={() => setActiveTab('notifications')} className={`profile-tab-btn font-semibold p-3 rounded-lg text-left w-full transition-colors ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>🔔 Notifications</button>
                            <button onClick={() => setActiveTab('settings')} className={`profile-tab-btn font-semibold p-3 rounded-lg text-left w-full transition-colors ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}>⚙️ App Settings</button>
                            <button className="text-red-600 hover:bg-red-50 font-semibold p-3 rounded-lg text-left w-full mt-4 transition-colors">🚪 Logout</button>
                        </nav>
                    </div>
                    <div className="md:col-span-3">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 min-h-[400px]">
                            {activeTab === 'info' && <ProfileInfo />}
                            {activeTab === 'notifications' && <Notifications />}
                            {activeTab === 'settings' && <AppSettings />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
