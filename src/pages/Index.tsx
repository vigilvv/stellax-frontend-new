
import React from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col stellar-gradient text-white">
      {/* Header */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <Logo size="md" navigable={false} />
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
          >
            Login
          </Button>
          <Button
            className="bg-cosmic-500 hover:bg-cosmic-600"
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to StellaX
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-3xl">
          The first AI-powered wallet on the Stellar network
        </p>
        <Button 
          size="lg" 
          className="bg-cosmic-500 hover:bg-cosmic-600 text-lg"
        >
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="cosmic-card p-6">
            <h3 className="text-xl font-bold mb-3">AI Assistant</h3>
            <p>Manage your assets with natural language commands</p>
          </div>
          <div className="cosmic-card p-6">
            <h3 className="text-xl font-bold mb-3">Voice Control</h3>
            <p>Speak to your wallet in your preferred language</p>
          </div>
          <div className="cosmic-card p-6">
            <h3 className="text-xl font-bold mb-3">Multi-Language</h3>
            <p>Support for English, Spanish, and Hindi</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="sm" navigable={false} />
            <div className="mt-4 md:mt-0 text-sm text-cosmic-300">
              &copy; {new Date().getFullYear()} StellaX. The future of stellar wallets.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
