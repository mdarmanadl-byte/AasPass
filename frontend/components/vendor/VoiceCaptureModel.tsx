"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Camera, Mic, X, Save, RotateCcw, Loader2 } from "lucide-react";
import { Card, Button, Input } from "@/components/ui/AppUi";
import { useSpeechToText } from "@/hook/useSpeechToText";
import confetti from 'canvas-confetti';
import { apiFetch,API_ENDPOINTS } from "@/utils/api";

export default function UnifiedAddModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (newItem: { name: string; price: string }) => void }) {
  const [step, setStep] = useState<"edit" | "success">("edit");
  const [data, setData] = useState({ name: "", price: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
 
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isListening, transcript, startListening, stopListening } = useSpeechToText();

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setStep("edit");
      setData({ name: "", price: "" });
      setImagePreview(null);
    }
  }, [isOpen]);

  // Listen for real-time voice input to extract details
  useEffect(() => {
    if (transcript) {
      const words = transcript.split(" ");
      const price = words.find(w => !isNaN(Number(w))) || "";
      const name = words.filter(w => isNaN(Number(w))).join(" ");
      
      setData({ 
        name: name ? name.trim() : data.name, 
        price: price ? `₹${price}` : data.price 
      });
    }
  }, [transcript]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

const handleFinalSave = async () => {
  setIsSubmitting(true);
  try {
    // Fire to the centralized product creation endpoint mapping
    const activeShopId = localStorage.getItem("vendor_shop_id");
    
    if (!activeShopId) {
      throw new Error("No active shop registration found on this device. Please onboard first.");
    }
    const result = await apiFetch(API_ENDPOINTS.createProduct, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        shopId: activeShopId, 
        description: "Added via Unified Assistant",
        imageUrl: imagePreview
      }),
    });

    setStep("success");
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    onSave({ name: data.name, price: data.price });

  } catch (error: any) {
    console.error("API Error:", error.message);
    alert(error.message || "Could not sync with backend server.");
  } finally {
    setIsSubmitting(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
      
      <Card className="relative w-full max-w-md p-6 border-indigo-500/30 max-h-[90vh] overflow-y-auto z-10">
        {step === "edit" ? (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold italic">Add Item Details</h3>
              <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20} /></button>
            </div>

            {/* 1. PHOTO CAPTURE SLOT */}
            <div className="space-y-2">
              <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
              {imagePreview ? (
                <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-slate-800">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => setImagePreview(null)} className="absolute top-2 right-2 p-1.5 bg-slate-950/80 backdrop-blur-md rounded-xl text-red-400"><X size={16} /></button>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()} className="h-28 w-full border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-2xl bg-slate-950 flex flex-col items-center justify-center gap-1 cursor-pointer group transition-all">
                  <Camera size={20} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  <span className="text-xs font-bold text-slate-400">Tap to capture product photo</span>
                </div>
              )}
            </div>

            {/* 2. THE VOICE CONTROLLER (Embedded natively) */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
              isListening ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex-1 pr-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Voice Assistant</span>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isListening ? "Listening... Speak name & price" : "Tap mic to fill inputs automatically"}
                </p>
              </div>
              <button 
                onClick={isListening ? stopListening : startListening}
                className={`h-11 w-11 rounded-xl grid place-items-center relative transition-all ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-600 text-slate-100 hover:bg-indigo-500'
                }`}
              >
                {isListening ? <X size={18} /> : <Mic size={18} />}
              </button>
            </div>

            {/* 3. MANUAL EDIT INPUTS */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Name</label>
                <Input 
                  value={data.name} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData({...data, name: e.target.value})} 
                  placeholder="e.g., Brake Oil 1L"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Price</label>
                <Input 
                  value={data.price} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData({...data, price: e.target.value})} 
                  placeholder="e.g., ₹220"
                />
              </div>
            </div>
                      <Button 
  onClick={handleFinalSave} 
  disabled={isSubmitting} 
  className="w-full h-12 gap-2 mt-2"
>
  {/* 2. Dynamically switches text based on network state */}
  {isSubmitting ? (
    <>
      <Loader2 className="animate-spin" size={18} />
      Uploading to Catalog...
    </>
  ) : (
    "Save to Catalog"
  )}
</Button>
            
          </div>
        ) : (
          /* SUCCESS VIEW */
          <div className="flex flex-col items-center py-10 animate-in fade-in scale-in duration-300">
            <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <X size={32} className="text-emerald-500 rotate-45 stroke-[3]" /> {/* Quick checkmark trick */}
            </div>
            <h3 className="text-xl font-black italic">Saved Successfully!</h3>
            <Button onClick={onClose} className="mt-6 px-8 bg-slate-800 hover:bg-slate-700 border-slate-700">
              Got it
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}