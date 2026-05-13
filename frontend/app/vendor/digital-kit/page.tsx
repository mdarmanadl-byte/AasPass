"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import { 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Smartphone,
  Printer,
  ArrowLeft
} from "lucide-react";
import { Card, AmbientBackground, Button } from "@/components/ui/AppUi";

export default function DigitalKit() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();

  // Extract query variables from search string context parameters safely
  const slug = searchParams.get("slug");          
  const city = searchParams.get("city") || "gaya";          
  const shopName = searchParams.get("shopName") || "My Storefront";  

  // --- FIX 1: BUILD AN ABSOLUTE PROTOCOL STRING FOR SCANNABILITY ---
  // In development, this points to http://localhost:3000; in production, it points to your server domain names.
  const absoluteStoreUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${city}/${slug}`
    : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${city}/${slug}`;

  // Clean, short presentation text to display on the layout dashboard screen UI
  const displayUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${city}/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(absoluteStoreUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- FIX 2: MOUNT GENERATED BINARY ARRAY ONTO CANVA LAYER MAPPINGS ---
  useEffect(() => {
    if (canvasRef.current && slug) {
      QRCode.toCanvas(
        canvasRef.current,
        absoluteStoreUrl, // Passing absolute protocol makes smartphone cameras open it instantly
        {
          width: 220,
          margin: 1,
          color: {
            dark: "#0f172a",  // Slate 950 contrast point
            light: "#ffffff", // Pure background paper white
          },
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error);
        }
      );
    }
  }, [absoluteStoreUrl, slug]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    
    const image = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${slug || "aaspaas"}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Safe fallback guard clause if accessed with completely missing route context profiles
  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 text-center">
        <p className="text-sm text-slate-500 font-mono mb-4">No active store routing profiles detected in this context registry.</p>
        <Button onClick={() => router.push("/vendor/dashboard")} className="bg-indigo-600 text-xs font-bold">
          Return to Dashboard Workspace
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10 relative">
      <AmbientBackground />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* TOP INTERACTIVE BACK LINK */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <button 
            onClick={() => router.push("/vendor/dashboard")} 
            className="hover:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft size={12} /> Back to Dashboard
          </button>
        </div>

        <header>
          <h1 className="text-3xl font-black italic tracking-tight text-slate-100">
            {decodeURIComponent(shopName)}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Grow your business by sharing your dynamic digital storefront presence.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- QR CODE GENERATION DISPLAY CARD PANEL --- */}
          <Card className="p-8 flex flex-col items-center text-center bg-slate-900/30 border-slate-900">
            
            {/* FIX 3: REPLACED ICON WITH EXPLICIT CANVAS HOOK FOR RENDERING */}
            <div className="bg-white p-5 rounded-[2rem] shadow-2xl shadow-indigo-500/10 mb-6 flex items-center justify-center">
              <canvas ref={canvasRef} className="rounded-xl block" />
            </div>

            <h2 className="text-xl font-bold tracking-tight">Your Custom Store QR</h2>
            <p className="text-slate-400 text-xs mt-2 mb-6 max-w-xs leading-relaxed">
              Print this flyer or show it to customers at your counter to display your digital catalog shelf instantly.
            </p>
            
            <div className="flex gap-3 w-full">
              <Button 
                className="flex-1 gap-2 bg-slate-900 border-slate-800 hover:bg-slate-800 text-xs font-bold h-11"
                onClick={downloadQR}
              >
                <Printer size={16} /> Print Flyer
              </Button>
              <Button 
                className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold h-11 text-white"
                onClick={downloadQR}
              >
                <Download size={16} /> Download PNG
              </Button>
            </div>
          </Card>

          {/* --- EXTERNAL CONNECTION & ACTION MATRIX CARDS --- */}
          <div className="space-y-6">
            <Card className="p-6 bg-slate-900/30 border-slate-900">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 tracking-tight">
                <Smartphone size={18} className="text-indigo-400" /> Store Link Profile
              </h2>
              
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 flex items-center justify-between group">
                <span className="text-xs font-mono text-indigo-300 truncate mr-4">{displayUrl}</span>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-all text-slate-400 hover:text-white shrink-0"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold leading-relaxed">
                Add this destination link directly into your WhatsApp business bio card space to receive remote storefront orders.
              </p>
            </Card>

            {/* QUICK COMMERCE DISTRIBUTION PANEL */}
            <Card className="p-6 bg-indigo-500/5 border-indigo-500/10">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-200">
                <Share2 size={16} className="text-indigo-400" /> Broadcast Channels
              </h3>
              <div className="flex gap-2">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out our live catalog items online at AasPaas! Visit: ${absoluteStoreUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white rounded-xl text-xs font-bold transition-all text-center"
                >
                  WhatsApp Group
                </a>
                <button 
                  onClick={handleCopy}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all"
                >
                  Copy Link Invite
                </button>
              </div>
            </Card>
          </div>

        </div>

        {/* --- TIPS SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Tip text="Paste your QR flyer onto your front glass counter shutter grid." />
          <Tip text="Share the direct online catalog connection link across neighborhood groups." />
          <Tip text="Keep item costs perfectly calibrated instantly using real voice recordings." />
        </div>
      </div>
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-900 flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
      <p className="text-xs font-semibold text-slate-400 leading-normal">{text}</p>
    </div>
  );
}