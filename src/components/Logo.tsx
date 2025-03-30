
import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const navigate = useNavigate();
  
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };
  
  const colorClasses = {
    default: "text-white",
    light: "text-cosmic-500",
  };

  return (
    <div 
      className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} flex items-center gap-2 cursor-pointer`} 
      onClick={() => navigate("/")}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-accent-500 rounded-full blur-sm opacity-75"></div>
        <div className="relative z-10 bg-gradient-to-r from-cosmic-500 to-stellar-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
          S
        </div>
      </div>
      <span>StellaX</span>
    </div>
  );
}
