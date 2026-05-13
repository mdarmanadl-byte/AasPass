import React from "react";
import { Search, MapPin, Filter, ShoppingBag } from "lucide-react";
import { Card, Input, AmbientBackground } from "@/components/ui/AppUi";
import {Share2} from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <AmbientBackground />
      
      {/* Search Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h1 className="text-xl font-bold tracking-tight">AasPaas</h1>
            <div className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700 text-xs">
              <MapPin size={14} className="text-indigo-400" />
              <span className="font-semibold">Gaya, Bihar</span>
            </div>
          </div>
          
          <div className="w-full md:max-w-md">
            <Input icon={Search} placeholder="Search for shops or parts (e.g. Brake Oil)..." />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold">Shops Near You</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Shop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ShopCard 
            name="Shiwam Automobile" 
            category="Automotive & Spares" 
            address="Gaya-Dobhi Road, Gaya"
            isOpen={true}
            slug="shiwam-automobile"
          />
          {/* Add more placeholder ShopCards here */}
        </div>
      </main>
    </div>
  );
}

function ShopCard({ name, category, address, isOpen, slug }: any) {
  return (
    <Card className="p-6 group hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <ShoppingBag className="text-indigo-400" />
        </div>
        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${isOpen ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-500'}`}>
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-indigo-400 text-xs font-bold uppercase tracking-wide mb-3">{category}</p>
      <p className="text-slate-400 text-sm mb-6">{address}</p>
      
      <div className="flex gap-2">
        <a 
          href={`/gaya/${slug}`}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-center py-2.5 rounded-xl text-sm font-bold transition"
        >
          View Store
        </a>
        <button className="px-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition">
           <Share2 size={18} />
        </button>
      </div>
    </Card>
  );
}