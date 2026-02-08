import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  Camera
} from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Password', icon: Lock },
    { id: 'billing', label: 'Billing & Deposits', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language & Region', icon: Globe },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Navigation Sidebar (Local to Settings) */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                section.id === 'profile' 
                ? 'bg-[#65B366] text-white shadow-lg shadow-green-900/20' 
                : 'bg-[#1E2229] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <section.icon size={20} />
                <span className="font-semibold">{section.label}</span>
              </div>
              <ChevronRight size={18} opacity={0.5} />
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Profile Header Card */}
          <div className="bg-[#1E2229] rounded-3xl p-8 border border-gray-800 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center border-4 border-[#121418]">
                  <span className="text-3xl font-bold">JD</span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#65B366] rounded-full border-2 border-[#121418] hover:scale-110 transition">
                  <Camera size={14} />
                </button>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-500 text-sm">Pro Trader • Verified Account</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-green-500/10 text-[#65B366] text-xs font-bold rounded-full border border-green-500/20">KYC Level 2</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">VIP Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details Form */}
          <div className="bg-[#1E2229] rounded-3xl p-8 border border-gray-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold border-b border-gray-800 pb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Display Name</label>
                <input type="text" defaultValue="John Doe" className="w-full bg-[#121418] border border-gray-800 rounded-xl p-3 focus:border-[#65B366] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full bg-[#121418] border border-gray-800 rounded-xl p-3 focus:border-[#65B366] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                <input type="text" defaultValue="+1 (555) 000-0000" className="w-full bg-[#121418] border border-gray-800 rounded-xl p-3 focus:border-[#65B366] outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Country</label>
                <select className="w-full bg-[#121418] border border-gray-800 rounded-xl p-3 focus:border-[#65B366] outline-none transition appearance-none">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Summary Toggle */}
          <div className="bg-[#1E2229] rounded-3xl p-8 border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Secure your account with an extra layer of protection.</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full relative transition-colors ${notifications ? 'bg-[#65B366]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-8 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition">Cancel</button>
            <button className="px-8 py-3 bg-[#65B366] rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-900/20">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;