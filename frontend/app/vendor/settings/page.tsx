"use client";
import React, { useState } from "react";
import { 
  User, 
  Store, 
  Phone, 
  MapPin, 
  Clock, 
  Save, 
  Globe, 
  ShieldCheck 
} from "lucide-react";
import { Card, AmbientBackground, Button, Input } from "@/components/ui/AppUi";

export default function VendorSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate a save action
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <AmbientBackground />
      
      <div className="max-w-3xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-black italic">Shop Settings</h1>
          <p className="text-slate-400 mt-2">Manage your business profile and contact information.</p>
        </header>

        <div className="space-y-6">
          {/* --- BASIC PROFILE --- */}
          <Card className="p-8 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b border-slate-800 pb-4">
              <Store size={20} className="text-indigo-400" /> Business Identity
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Shop Name</label>
                <Input defaultValue="Shiwam Automobile" placeholder="e.g. Ladli Enterprises" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Owner Name</label>
                <Input defaultValue="Abhishek Kumar" placeholder="Your Name" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Business Category</label>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all appearance-none">
                <option>Automotive & Spares</option>
                <option>General Store & Kirana</option>
                <option>Electronics & Mobile</option>
                <option>Gifts & Stationery</option>
              </select>
            </div>
          </Card>

          {/* --- CONTACT & LOCATION --- */}
          <Card className="p-8 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b border-slate-800 pb-4">
              <Phone size={20} className="text-emerald-400" /> Contact Details
            </h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">WhatsApp Number (For Orders)</label>
              <div className="relative">
                <Input icon={Phone} defaultValue="+91 9100000000" placeholder="WhatsApp Number" />
                <span className="absolute right-4 top-4 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">VERIFIED</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Shop Address</label>
              <Input icon={MapPin} defaultValue="Gaya-Dobhi Road, near Bypass, Gaya, Bihar" placeholder="Shop Address" />
            </div>
          </Card>

          {/* --- OPERATIONAL HOURS --- */}
          <Card className="p-8 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b border-slate-800 pb-4">
              <Clock size={20} className="text-amber-400" /> Working Hours
            </h2>
            
            <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <span className="text-sm font-bold">Standard Hours</span>
              <span className="text-xs text-slate-400 font-mono italic">09:00 AM - 08:00 PM</span>
            </div>
          </Card>

          {/* --- SAVE ACTION --- */}
          <div className="flex items-center justify-between pt-4 pb-10">
            <div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Data Securely Stored</span>
            </div>
            <Button 
              onClick={handleSave} 
              className={`px-10 h-14 gap-2 transition-all ${isSaving ? 'opacity-50 scale-95' : ''}`}
            >
              {isSaving ? "Saving..." : <><Save size={18} /> Update Profile</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}