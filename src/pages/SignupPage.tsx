
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupPage = () => {
  const { t } = useLanguage();
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      await signUp(email, password);
      // Auth context will handle navigation
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen stellar-gradient flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <Logo size="lg" />
          <h1 className="mt-6 text-3xl font-bold text-white">{t("signUp")}</h1>
        </div>
        
        <div className="cosmic-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-cosmic-500 hover:bg-cosmic-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : t("signUp")}
            </Button>
            
            <div className="text-center text-sm text-cosmic-300">
              Already have an account?{" "}
              <Link to="/login" className="text-cosmic-400 hover:underline">
                {t("login")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
