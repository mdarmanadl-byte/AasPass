"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Package, 
  Search, 
  Trash2, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Plus, 
  LayoutDashboard,
  Settings,
  ExternalLink
} from "lucide-react";
import { Card, AmbientBackground, Button, Input } from "@/components/ui/AppUi";
import Link from "next/link";
import { API_ENDPOINTS, apiFetch } from "@/utils/api";

interface Product {
  id: string;
  name: string;
  price: number | string;
  category?: string;
  createdAt?: string;
}

export default function VendorCatalogPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Operational states
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [shopSlug, setShopSlug] = useState("");
  const [shopCity, setShopCity] = useState("gaya");

  // Load shop reference credentials on mount
  useEffect(() => {
    const slug = localStorage.getItem("vendor_shop_slug");
    const city = localStorage.getItem("vendor_shop_city") || "gaya";
    
    if (!slug) {
      router.push("/vendor/onboard");
      return;
    }
    setShopSlug(slug);
    setShopCity(city);
    fetchCatalog(city, slug);
  }, [router]);

  // Fetch all active products for this vendor shop container
  const fetchCatalog = async (city: string, slug: string) => {
    try {
      setLoading(true);
      setError(null);
      const url = API_ENDPOINTS.getShopDetails(city, slug);
      const data = await apiFetch(url);
      setProducts(data.products || []);
    } catch (err: any) {
      console.error("Catalog loading failure:", err.message);
      setError(err.message || "Failed to sync inventory catalog list.");
    } finally {
      setLoading(false);
    }
  };

  // Handle immediate row deletion in PostgreSQL database
  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this item from your catalog?")) {
      return;
    }

    try {
      setDeletingId(productId);
      
      // Call your centralized frontend DELETE route handler mapping
      await apiFetch(API_ENDPOINTS.deleteProduct(productId), {
        method: "DELETE",
      });

      // Optimistically remove the item from local React state array immediately
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    } catch (err: any) {
      console.error("Purge failure:", err.message);
      alert(err.message || "Failed to remove the product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter products based on search input query string
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      <AmbientBackground />

      {/* --- SIDEBAR (Desktop view match layout) --- */}
      <aside className="hidden lg:flex w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex-col p-6 sticky top-0 h-screen z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-8 rounded-lg bg-ap-gradient grid place-items-center font-black text-slate-950">A</div>
          <span className="font-bold text-xl tracking-tight">AasPaas</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink href="/vendor/dashboard" icon={LayoutDashboard} label="Overview" />
          <NavLink href="/vendor/catalog" icon={Package} label="My Catalog" active />
        </nav>

        <NavLink href="/vendor/settings" icon={Settings} label="Settings" />
      </aside>

      {/* --- MAIN WORKSPACE AREA --- */}
      <main className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
              <Link href="/vendor/dashboard" className="hover:text-slate-300 flex items-center gap-1">
                <ArrowLeft size={12} /> Back to Overview
              </Link>
            </div>
            <h1 className="text-3xl font-black italic tracking-tight">Manage Catalog</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit, track, or prune items listed inside your live storefront space.</p>
          </div>

          {/* VIEW LIVE PUBLIC WEBSITE BUTTON LINK */}
          {shopSlug && (
            <a 
              href={`/${shopCity}/${shopSlug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold transition-all text-slate-300 self-start sm:self-center"
            >
              View Live Store <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* ERROR DISPLAY SYSTEM */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* LIVE FILTER UTILITY BOARD BAR */}
        <div className="mb-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search catalog by product name... (e.g., Brake Oil)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 rounded-xl border border-slate-800 bg-slate-900/40 pl-11 pr-4 text-sm font-semibold text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* INVENTORY TABLE DATAGRID CONTAINER */}
        <Card className="overflow-hidden border-slate-900 bg-slate-900/20 backdrop-blur-md">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-2 text-xs font-semibold">
              <Loader2 className="animate-spin text-indigo-500" size={28} /> 
              <span>Querying relational dataset records...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <Package size={22} />
              </div>
              <p className="text-sm text-slate-500 font-medium">
                {searchQuery ? "No matching products found matching that query." : "Your digital store catalog bookshelf is currently completely empty."}
              </p>
              {!searchQuery && (
                <Button onClick={() => router.push("/vendor/dashboard")} className="text-xs px-4 h-9 bg-indigo-600 text-white font-bold">
                  Go to Quick Actions to Add Items
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-6 text-right">Price Point</th>
                    <th className="py-4 px-6 text-center w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-900/30 transition-colors group">
                      {/* Name & metadata descriptor stack */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 group-hover:border-slate-700 transition-colors">
                            <Package size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{product.name}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase">
                              {product.createdAt ? new Date(product.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' }) : "Recently Saved"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Display Cost matrix cell */}
                      <td className="py-4 px-6 text-right font-black text-indigo-400 font-mono text-sm">
                        {product.price.toString().startsWith("₹") ? product.price : `₹${product.price}`}
                      </td>

                      {/* Explicit clean trash actions layout panel button */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={deletingId === product.id}
                          className="h-8 w-8 rounded-lg border border-slate-900 bg-slate-950 hover:bg-red-950/30 hover:border-red-900 text-slate-500 hover:text-red-400 grid place-items-center transition-all disabled:opacity-40"
                          title="Purge record"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="animate-spin text-red-400" size={14} />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS DUPLICATION COPIES MATCHED FROM DASHBOARD CORE LOOP ---
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