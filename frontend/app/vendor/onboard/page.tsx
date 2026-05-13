"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Import Clerk's user state hook
import { ShoppingBag, Phone, User, MapPin, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import { Card, AmbientBackground, Input, Button } from "@/components/ui/AppUi";
import { API_ENDPOINTS, apiFetch } from "@/utils/api";

export default function VendorOnboardPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser(); // Grab active session data
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    shopName: "",
    category: "Automotive",
    address: "",
    whatsapp: "",
    city: "gaya",
  });

  // Automatically sync Clerk's user profile details into the form inputs once loaded
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData((prev) => ({
        ...prev,
        // Pull the verified phone number or primary email string
        phone: user.primaryPhoneNumber?.phoneNumber || "",
        name: user.fullName || prev.name,
        whatsapp: user.primaryPhoneNumber?.phoneNumber || "", // Autofill WhatsApp with phone for convenience
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Stream payload to your Express server to tie this Clerk user session data to a new shop
      const result = await apiFetch(API_ENDPOINTS.onboardVendor, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          clerkUserId: user?.id, // Optional: Pass Clerk's unique ID to link schemas later
        }),
      });

      localStorage.setItem("vendor_shop_id", result.shopId);
      localStorage.setItem("vendor_shop_slug", result.shopSlug);
      localStorage.setItem("vendor_shop_city", result.city);

      router.push(`/vendor/dashboard?slug=${result.shopSlug}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected registration error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Guard clause while Clerk resolves who is logged in
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin text-indigo-500 mb-2" size={32} />
        <p className="text-xs font-bold">Verifying Session State...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative">
      <AmbientBackground />
      <div className="w-full max-w-md relative z-10 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center mx-auto shadow-xl">
            <ShoppingBag className="text-slate-950" size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tight">AasPaas</h1>
          <p className="text-sm text-slate-400">Complete your store configuration profile</p>
        </div>

        <Card className="p-6 md:p-8 bg-slate-900/40 border-slate-900/80 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">{errorMessage}</div>}

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Owner Name</label>
              <Input icon={User} name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Shiwam Kumar" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Verified Phone Number</label>
              <Input icon={Phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone" enabled />
              <span className="text-[10px] text-slate-500 font-medium">Auto-locked from your secure verification check.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Shop Trading Name</label>
              <Input icon={ShoppingBag} name="shopName" value={formData.shopName} onChange={handleChange} placeholder="e.g., Shiwam Automobile" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Business Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full h-12 rounded-xl border border-slate-800 bg-slate-950/50 px-4 text-sm font-semibold text-slate-200 outline-none appearance-none">
                <option value="Automotive">Automotive (Spare Parts / Mechanics)</option>
                <option value="Grocery">Grocery & Kirana Store</option>
                <option value="Electronics">Electronics & Mobile Repair</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Shop Physical Address</label>
              <Input icon={MapPin} name="address" value={formData.address} onChange={handleChange} placeholder="e.g., Bypass Road, Gaya" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">WhatsApp Order Desk Connection</label>
              <Input icon={MessageSquare} name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Connection Line" required />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full h-13 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold tracking-tight gap-2">
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Launch Digital Storefront <ArrowRight size={16} /></>}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}