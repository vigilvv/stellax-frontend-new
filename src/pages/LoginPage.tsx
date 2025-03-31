import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/useLanguage";
import { useAuth } from "@/context/useAuth";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const { t } = useLanguage();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Check if redirected from signup with confirmation param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("confirmEmail") === "true") {
      setShowConfirmation(true);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      // Auth context will handle navigation
    } catch (err) {
      if (err.message?.includes("Email not confirmed")) {
        setError("Please confirm your email before logging in");
      } else {
        setError(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen stellar-gradient flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <Logo size="lg" />
          <h1 className="mt-6 text-3xl font-bold text-white">{t("login")}</h1>
        </div>

        <div className="cosmic-card p-8">
          {showConfirmation && (
            <Alert className="mb-6 bg-cosmic-500/20 border-cosmic-500 text-white">
              <AlertDescription>
                Please check your email to confirm your account before logging
                in.
              </AlertDescription>
            </Alert>
          )}

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
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
              </div>
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

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-cosmic-500 hover:bg-cosmic-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : t("login")}
            </Button>

            <div className="text-center text-sm text-cosmic-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cosmic-400 hover:underline">
                {t("signUp")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
