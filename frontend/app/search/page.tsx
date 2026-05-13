"use client";
import React, { useState } from "react";
import { Search, MapPin, SlidersHorizontal, Star, Navigation, ShoppingBag } from "lucide-react";
import { Card, AmbientBackground, Input, Button } from "@/components/ui/AppUi";
import Link from "next/link";

// Mock data for search results in Gaya
const NEARBY_SHOPS = [
  { id: '1', name: "Shiwam Automobile", cat: "Auto Parts", rating: "4.8", dist: "0.8 km", status: "Open" },
  { id: '2', name: "Ladli Enterprises", cat: "General Store", rating: "4.9", dist: "1.2 km", status: "Open" },
  { id: '3', name: "Gift Ka Shop", cat: "Gifts & Decor", rating: "4.6", dist: "2.5 km", status: "Open" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <AmbientBackground />
      
      {/* --- HERO SEARCH SECTION --- */}
      <section className="px-4 pt-8 pb-6 border-b border-slate-800/50 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black italic tracking-tighter">AasPaas</h1>
            <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
              <MapPin size={14} className="text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Gaya, Bihar</span>
            </div>
          </div>
          
          <div className="relative w-full">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search shops..."
                className="w-full h-12 bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl pl-12 pr-14 text-sm text-slate-100 placeholder:text-slate-500 shadow-lg shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              />
              <button className="absolute right-2 p-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/40 transition-colors flex items-center justify-center">
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-2xl mx-auto p-6 space-y-10">
        
        {/* --- TRENDING CATEGORIES (Bento Style) --- */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Quick Browse</h2>
          <div className="grid grid-cols-2 gap-3">
             <CategoryCard label="Automotive" icon="🚗" color="from-blue-500" />
             <CategoryCard label="Gifts" icon="🎁" color="from-purple-500" />
             <CategoryCard label="Electronics" icon="⚡" color="from-amber-500" />
             <CategoryCard label="Fashion" icon="👕" color="from-emerald-500" />
          </div>
        </div>

        {/* --- SEARCH RESULTS --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Shops Near You</h2>
            <span className="text-[10px] text-indigo-400 font-bold">VIEW ALL</span>
          </div>
          
          {NEARBY_SHOPS.map(shop => (
            <Link key={shop.id} href={`/gaya/${shop.name.toLowerCase().replace(/ /g, '-')}`}>
              <Card className="p-4 mb-4 hover:border-indigo-500/50 transition-all flex gap-4 items-center">
                <div className="h-16 w-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                  <ShoppingBag size={24} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-100 truncate">{shop.name}</h3>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase mt-0.5">{shop.cat}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1"><Star size={10} className="text-amber-400 fill-amber-400" /> {shop.rating}</span>
                    <span className="flex items-center gap-1"><Navigation size={10} /> {shop.dist}</span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-emerald-400 border border-emerald-400/20 px-2 py-1 rounded-md bg-emerald-400/5 uppercase">
                  {shop.status}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function CategoryCard({ label, icon, color }: any) {
  return (
    <div className={`p-4 rounded-3xl bg-gradient-to-br ${color}/10 to-slate-900 border border-white/5 hover:border-white/20 transition-all cursor-pointer group overflow-hidden`}>
       <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform origin-left">{icon}</span>
       <span className="text-xs font-bold text-slate-300">{label}</span>
    </div>
  );
}