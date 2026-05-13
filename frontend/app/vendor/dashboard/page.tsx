"use client";
import React, { useState, useEffect } from "react";
import { 
  Mic, 
  Plus, 
  LayoutDashboard, 
  Package, 
  QrCode, 
  Settings, 
  TrendingUp, 
  Users, 
  MessageSquare,
  X,
  Loader2,
  AlertTriangle
} from "lucide-react";
import { Card, AmbientBackground, Button } from "@/components/ui/AppUi";
import UnifiedAddModal from "@/components/vendor/VoiceCaptureModel"; // Cleaned up duplicate imports
import Link from "next/link";
import { useSpeechToText } from "@/hook/useSpeechToText";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, apiFetch } from "@/utils/api";


interface ProductItem {
  id: string | number;
  name: string;
  price: string | number;
  createdAt?: string;
}

export default function VendorDashboard() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  
  // Dynamic Application Metrics State
  const [shopProfile, setShopProfile] = useState({
    name: "Loading Storefront...",
    address: "Gaya, Bihar",
    whatsapp: ""
  });
  const [recentItems, setRecentItems] = useState<ProductItem[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  // Status & Error Boundary Flags
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const { isListening, transcript, startListening, stopListening } = useSpeechToText();

  // --- PHASE 1: SESSION GUARD & ROUTING RETRIEVAL ---
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/login");
        return;
      }

      const savedSlug = localStorage.getItem("vendor_shop_slug");
      if (!savedSlug) {
        router.push("/vendor/onboard");
      } else {
        setCheckingProfile(false);
      }
    }
  }, [isLoaded, isSignedIn, router]);

  // --- PHASE 2: LIVE BACKEND PERSISTENCE DATA FETCHING ---
  useEffect(() => {
    async function fetchLiveMetrics() {
      if (checkingProfile) return;
      
      const savedSlug = localStorage.getItem("vendor_shop_slug");
      const savedCity = localStorage.getItem("vendor_shop_city") || "gaya";
      
      try {
        setApiLoading(true);
        setApiError(null);
        
        const url = API_ENDPOINTS.getShopDetails(savedCity, savedSlug!);
        const data = await apiFetch(url);
        
        if (data) {
          setShopProfile({
            name: data.name,
            address: data.address || "Gaya, Bihar",
            whatsapp: data.whatsapp || ""
          });
          
          const rawProducts: ProductItem[] = data.products || [];
          setTotalProductsCount(rawProducts.length);
          
          // Slice the most recent 5 items for preview
          setRecentItems(rawProducts.slice(0, 5));
        }
      } catch (err: any) {
        console.error("Dashboard database fetch error:", err.message);
        setApiError(err.message || "Failed to establish synchronization with PostgreSQL container.");
      } finally {
        setApiLoading(false);
      }
    }

    fetchLiveMetrics();
  }, [checkingProfile]);

  // --- PHASE 3: VOICE SPEECH CAPTURE HOOK LISTENER ---
  useEffect(() => {
    if (transcript) {
      setCurrentTranscript(transcript);
      setIsModalOpen(true);
    }
  }, [transcript]);

  const handleToggleMic = () => {
    isListening ? stopListening() : startListening();
  };

  // --- PHASE 4: REFRESH INVENTORY VIA DISPATCH MODAL HANDLER ---
  const handleAddItem = (newItem: { name: string; price: string }) => {
    const formattedItem: ProductItem = {
      id: Date.now(),
      name: newItem.name || "Unnamed Part",
      price: newItem.price.toString().startsWith("₹") ? newItem.price : `₹${newItem.price}`,
    };
    
    // Inject the new product directly to top of live array list instantly
    setRecentItems((prev) => [formattedItem, ...prev]);
    setTotalProductsCount((prev) => prev + 1);
  };

  // Auth & Routing Loading Screen
  if (!isLoaded || checkingProfile) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin text-indigo-500 mb-2" size={32} />
        <p className="text-xs font-bold">Verifying Shop Registry...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      <AmbientBackground />

      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden lg:flex w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-8 rounded-lg bg-ap-gradient grid place-items-center font-black text-slate-950">A</div>
          <span className="font-bold text-xl tracking-tight">AasPaas</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink href="/vendor/dashboard" icon={LayoutDashboard} label="Overview" active />
          <NavLink href="/vendor/catalog" icon={Package} label="My Catalog" />
        </nav>

        <NavLink href="/vendor/settings" icon={Settings} label="Settings" />
      </aside>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full relative">
        
        {/* API HANDSHAKE ERROR MESSAGE DISPLAY LINK */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-3">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{apiError} — Make sure your Node backend server is running on port 5000.</span>
          </div>
        )}

        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black italic tracking-tight">{shopProfile.name}</h1>
            <p className="text-slate-400 text-sm mt-1">{shopProfile.address} • Merchant Workspace</p>
          </div>
          <div className="h-12 w-12 rounded-full border border-slate-800 bg-slate-900 grid place-items-center group hover:border-slate-600 transition-all">
            <Users size={20} className="text-slate-400" />
          </div>
        </header>

        {/* --- DYNAMIC METRICS BOARD STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="Total Items" 
            value={apiLoading ? "..." : totalProductsCount.toString()} 
            icon={Package} 
            trend="Live database tally" 
          />
          <StatCard label="Shop Views" value="1.2k" icon={TrendingUp} trend="+18% analytics" />
          <StatCard label="WA Inquiries" value="Connected" icon={MessageSquare} trend={shopProfile.whatsapp ? "Active destination" : "Missing target Link"} />
        </div>

        {/* --- ACTIONS & LIST LOGIC MATRIX --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
            
            {/* UNIFIED ACTION ACTIVATION INTERFACE MODULE */}
            <Card 
              onClick={() => setIsModalOpen(true)}
              className="p-10 border-dashed border-2 border-indigo-500/30 bg-indigo-500/5 flex flex-col items-center text-center group hover:bg-indigo-500/10 hover:border-indigo-500/60 transition-all cursor-pointer"
            >
              <div className="h-16 w-16 rounded-2xl bg-ap-gradient text-slate-950 grid place-items-center shadow-xl group-hover:scale-110 transition-transform mb-4">
                <Plus size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black italic">Add New Item</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-xs leading-relaxed">
                Snap a photo, use your voice, or type manually to instantly update your public digital catalog.
              </p>
            </Card>

            {/* RECENTLY COMMITTED ITEMS DATA VIEWER CONTAINER */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 tracking-tight">Recently Added</h3>
              {apiLoading ? (
                <div className="py-6 flex items-center justify-center text-slate-500 gap-2 text-xs font-semibold">
                  <Loader2 className="animate-spin text-indigo-500" size={16} /> Reading catalog dataset...
                </div>
              ) : recentItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 font-mono">
                  No active catalog items discovered in this repository profile container yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentItems.map((item) => (
                    <RecentItem 
                      key={item.id} 
                      name={item.name} 
                      price={item.price.toString()} 
                      date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just Now"} 
                    />
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT UTILITY CONTAINER: DIGITAL BRAND KIT QR PREVIEW */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Digital Kit</h2>
            <Card className="p-6 flex flex-col items-center bg-slate-900/20 backdrop-blur-md">
              <div className="bg-white p-4 rounded-2xl mb-4 shadow-xl">
                <QrCode size={140} className="text-slate-950" />
              </div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-slate-500 mb-4 text-center">SCAN TO VIEW STORE</p>
              
             <Link 
        href={`/vendor/digital-kit?slug=${localStorage.getItem("vendor_shop_slug")}&city=${localStorage.getItem("vendor_shop_city") || "gaya"}&shopName=${encodeURIComponent(shopProfile.name)}`}
        className="w-full"
      >
                <Button className="w-full text-xs py-3 h-auto flex items-center gap-2 justify-center font-bold">
                  Download Print-Ready QR
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>

      {/* RENDER DYNAMIC UNIFIED ASSISTANT MODAL OVERLAY */}
      <UnifiedAddModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddItem}
      />
    </div>
  );
}

// --- MODULAR SUB-COMPONENTS ---

function NavLink({ icon: Icon, label, href, active = false }: any) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
      }`}>
        <Icon size={20} />
        <span className="text-sm font-bold">{label}</span>
      </div>
    </Link>
  );
}

function StatCard({ label, value, icon: Icon, trend }: any) {
  return (
    <Card className="p-6 border-slate-900 bg-slate-900/30">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
          <p className="text-3xl font-black tracking-tight">{value}</p>
          <p className="text-[10px] font-semibold text-emerald-400 pt-1">{trend}</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 grid place-items-center text-indigo-400">
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}

function RecentItem({ name, price, date }: { name: string; price: string; date: string }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50 border border-slate-900/80 hover:border-slate-800 transition-all">
       <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
             <Package size={18} className="text-slate-500" />
          </div>
          <div>
             <p className="text-sm font-bold text-slate-200">{name}</p>
             <p className="text-[10px] text-slate-500 font-mono uppercase mt-0.5">{date}</p>
          </div>
       </div>
       <p className="font-black text-indigo-400 text-sm">
         {price.startsWith("₹") ? price : `₹${price}`}
       </p>
    </div>
  );
}