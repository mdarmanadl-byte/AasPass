// app/signup/page.tsx
"use client";
import { SignUp } from "@clerk/nextjs";
import { AmbientBackground } from "@/components/ui/AppUi";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative">
      <AmbientBackground />
      
      <div className="relative z-10 w-full max-w-sm flex justify-center">
        <SignUp 
          routing="hash"
          signInUrl="/login"
          forceRedirectUrl="vendor/onboard"
        />
      </div>
    </div>
  );
}