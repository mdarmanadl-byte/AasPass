import { SignUp } from "@clerk/nextjs";
import { AmbientBackground } from "@/components/ui/AppUi";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <AmbientBackground />
      
      <div className="z-10 w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              card: "bg-slate-900/70 border border-slate-700 backdrop-blur-xl shadow-2xl rounded-3xl",
              headerTitle: "text-slate-100 font-bold text-2xl",
              headerSubtitle: "text-slate-400",
              formButtonPrimary: "bg-gradient-to-r from-indigo-500 to-violet-500 hover:brightness-110 border-none rounded-xl h-12 text-sm font-bold shadow-lg shadow-indigo-900/40",
              formFieldInput: "bg-slate-950 border-slate-700 text-slate-100 rounded-xl focus:ring-indigo-500",
              formFieldLabel: "text-slate-400 font-semibold uppercase tracking-wider text-[10px]",
              footerActionLink: "text-indigo-400 hover:text-indigo-300 font-bold",
            }
          }}
        />
      </div>
    </div>
  );
}