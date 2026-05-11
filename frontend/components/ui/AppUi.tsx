import React ,{ReactNode} from "react";

// 1. The Primary "Glow" Button
export const Button = ({ children, className = "", ...props }: { children: ReactNode; className?: string; [key: string]: unknown }) => (
  <button 
    className={`group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-xl shadow-indigo-900/40 hover:brightness-110 active:scale-[0.98] transition-all ${className}`}
    {...props}
  >
    {children}
  </button>
);

// 2. The Transparent "Glass" Card
export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[2.5rem] border border-slate-700 bg-slate-900/70 shadow-2xl backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

// 3. The Styled Input Field
export const Input = ({ icon: Icon, label, ...props }: { icon?: React.ComponentType<{ className?: string }>; label?: string; [key: string]: unknown }) => (
  <div className="space-y-2">
    {label && <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>}
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition" />}
      <input 
        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
        {...props}
      />
    </div>
  </div>
);

// 4. The Background Ambient Glow (The "DNA" of your app)
export const AmbientBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
    <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-700/25 via-violet-700/25 to-sky-700/20 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_60%)]" />
  </div>
);