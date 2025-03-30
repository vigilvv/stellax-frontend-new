
import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  navigable?: boolean;
}

export function Logo({ variant = "default", size = "md", navigable = true }: LogoProps) {
  // Try to get navigate function, but don't throw an error if we're not in a Router context
  let navigate: any;
  try {
    navigate = useNavigate();
  } catch (e) {
    // Outside of router context, navigation won't work
    navigate = null;
  }
  
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };
  
  const colorClasses = {
    default: "text-white",
    light: "text-cosmic-500",
  };

  const handleClick = () => {
    if (navigate && navigable) {
      navigate("/");
    }
  };

  return (
    <div 
      className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} flex items-center gap-2 ${navigable ? "cursor-pointer" : ""}`} 
      onClick={handleClick}
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
