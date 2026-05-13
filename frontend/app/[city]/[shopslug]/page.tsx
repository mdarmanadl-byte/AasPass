"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Package, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Loader2, 
  AlertCircle,
  ShoppingBag
} from "lucide-react";
import { Card, AmbientBackground, Button } from "@/components/ui/AppUi";
import { API_ENDPOINTS, apiFetch } from "@/utils/api";

interface Product {
  id: string | number;
  name: string;
  price: number | string;
}

interface ShopDetails {
  name: string;
  address: string;
  whatsapp: string;
  category: string;
  products: Product[];
}

export default function PublicStorefrontPage() {
  const params = useParams();
  const city = (params?.city as string) || "gaya";
  const shopSlug = params?.shopSlug as string;

  const [shop, setShop] = useState<ShopDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPublicCatalog() {
      if (!shopSlug) return;
      try {
        setLoading(true);
        setError(null);
        
        // Query your Express backend via your established API utility layout
        const url = API_ENDPOINTS.getShopDetails(city, shopSlug);
        const data = await apiFetch(url);
        
        setShop(data);
      } catch (err: any) {
        console.error("Public catalog fetch error:", err.message);
        setError("This storefront link is currently unavailable or doesn't exist yet.");
      } finally {
        setLoading(false);
      }
    }

    loadPublicCatalog();
  }, [city, shopSlug]);

  // Handle building the direct dynamic text string to open WhatsApp App instantly
  const handleRedirectToWhatsApp = (productName: string, productPrice: string) => {
    if (!shop?.whatsapp) {
      alert("This shop hasn't configured a verified WhatsApp desk link yet.");
      return;
    }

    // Clean up country code format requirements for India (+91)
    let cleanPhone = shop.whatsapp.trim().replace(/\D/g, "");
    if (!cleanPhone.startsWith("91") && cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    // Craft a personalized customer ordering message template string
    const message = `Hello ${shop.name}, I found your store on AasPaas! I am interested in purchasing:\n\n📦 Item: ${productName}\n💰 Price: ${productPrice.toString().startsWith("₹") ? productPrice : `₹${productPrice}`}\n\nIs this currently available in stock at your counter?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    // Open the compiled link path in a brand new active screen overlay context
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin text-indigo-500 mb-2" size={32} />
        <p className="text-xs font-bold font-mono tracking-tight">Accessing Digital Storefront Shelves...</p>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
          <AlertCircle size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-200">Store Not Found</h1>
        <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">{error || "Could not resolve parameters."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 relative">
      <AmbientBackground />

      {/* PUBLIC STORE TOP LANDING HERO */}
      <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
              {shop.category} Digital Catalog
            </span>
            <h1 className="text-3xl font-black tracking-tight italic mt-1 text-slate-100">{shop.name}</h1>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
              <span className="flex items-center gap-1"><MapPin size={13} className="text-slate-500" /> {shop.address}</span>
            </div>
          </div>

          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shrink-0 self-start sm:self-center">
            <ShoppingBag size={20} className="text-slate-950" strokeWidth={2.5} />
          </div>
        </div>
      </header>

      {/* RENDER ACTIVE PRODUCT CATALOG DISPLAY TILES */}
      <main className="max-w-4xl mx-auto p-6 mt-6 relative z-10">
        <h2 className="text-lg font-black tracking-tight uppercase text-slate-400 mb-6">Available Counter Items</h2>

        {shop.products.length === 0 ? (
          <div className="py-20 text-center font-mono text-xs text-slate-600 border border-dashed border-slate-900 rounded-2xl">
            This merchant hasn't published any items to their dynamic digital display rack yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shop.products.map((product) => (
              <Card key={product.id} className="p-5 border-slate-900 bg-slate-900/30 flex flex-col justify-between hover:border-slate-800 transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500 group-hover:border-slate-700 transition-colors shrink-0">
                      <Package size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug">{product.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">Available at Counter</p>
                    </div>
                  </div>

                  <p className="font-mono font-black text-indigo-400 text-base shrink-0">
                    {product.price.toString().startsWith("₹") ? product.price : `₹${product.price}`}
                  </p>
                </div>

                {/* WHATSAPP CLICK TO ORDER CONTEXT DISPATCH TRIGGER PANEL */}
                <Button 
                  onClick={() => handleRedirectToWhatsApp(product.name, product.price.toString())}
                  className="w-full h-10 mt-5 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white font-bold text-xs gap-1.5 rounded-xl transition-all"
                >
                  <MessageSquare size={14} /> Order on WhatsApp
                </Button>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}