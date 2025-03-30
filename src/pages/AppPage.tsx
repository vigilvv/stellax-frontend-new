
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SpeechToText } from "@/components/SpeechToText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Send, 
  LogOut, 
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dummy data for wallet assets
const DUMMY_ASSETS = [
  { symbol: "XLM", name: "Stellar", balance: 1250, color: "bg-stellar-700" },
  { symbol: "USDC", name: "USD Coin", balance: 350, color: "bg-blue-700" },
  { symbol: "BTC", name: "Bitcoin", balance: 0.005, color: "bg-orange-600" },
];

// Dummy responses for the AI assistant
const AI_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    default: "I'm your StellaX AI assistant. How can I help you with your Stellar wallet today?",
    greeting: "Hello! I'm here to help with your Stellar wallet. You can ask about your balance, send assets, or learn about Stellar.",
    balance: "Your current wallet balance is 1,250 XLM, 350 USDC, and 0.005 BTC.",
    help: "I can help you manage your Stellar wallet. Try asking about your balance, sending assets, or learning about Stellar.",
  },
  es: {
    default: "Soy tu asistente de IA StellaX. ¿Cómo puedo ayudarte con tu billetera Stellar hoy?",
    greeting: "¡Hola! Estoy aquí para ayudarte con tu billetera Stellar. Puedes preguntar sobre tu saldo, enviar activos o aprender sobre Stellar.",
    balance: "El saldo actual de tu billetera es 1,250 XLM, 350 USDC y 0.005 BTC.",
    help: "Puedo ayudarte a administrar tu billetera Stellar. Intenta preguntar sobre tu saldo, enviar activos o aprender sobre Stellar.",
  },
  hi: {
    default: "मैं आपका StellaX AI असिस्टेंट हूं। आज मैं आपकी स्टेलर वॉलेट के साथ कैसे मदद कर सकता हूं?",
    greeting: "नमस्ते! मैं आपकी स्टेलर वॉलेट के साथ मदद करने के लिए यहां हूं। आप अपने बैलेंस के बारे में पूछ सकते हैं, एसेट्स भेज सकते हैं, या स्टेलर के बारे में जान सकते हैं।",
    balance: "आपके वॉलेट का वर्तमान बैलेंस 1,250 XLM, 350 USDC, और 0.005 BTC है।",
    help: "मैं आपकी स्टेलर वॉलेट प्रबंधित करने में मदद कर सकता हूं। अपने बैलेंस के बारे में पूछने, एसेट्स भेजने, या स्टेलर के बारे में जानने का प्रयास करें।",
  },
};

interface Message {
  type: "user" | "assistant";
  text: string;
}

const AppPage = () => {
  const { t, language } = useLanguage();
  const { user, logout, walletAddress, userEmail } = useAuth();
  const { toast } = useToast();
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message
  useEffect(() => {
    setMessages([{ 
      type: "assistant", 
      text: AI_RESPONSES[language]?.greeting || AI_RESPONSES.en.greeting 
    }]);
  }, [language]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: "user", text: input }]);
    
    // Generate AI response
    setTimeout(() => {
      let response = AI_RESPONSES[language]?.default || AI_RESPONSES.en.default;
      
      // Simple keyword matching for demo purposes
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("balance") || lowerInput.includes("saldo") || lowerInput.includes("बैलेंस")) {
        response = AI_RESPONSES[language]?.balance || AI_RESPONSES.en.balance;
      } else if (lowerInput.includes("help") || lowerInput.includes("ayuda") || lowerInput.includes("मदद")) {
        response = AI_RESPONSES[language]?.help || AI_RESPONSES.en.help;
      }
      
      setMessages(prev => [...prev, { type: "assistant", text: response }]);
    }, 1000);
    
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSpeechInput = (transcript: string) => {
    setInput(transcript);
  };

  const copyWalletAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen stellar-gradient flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/10"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar with wallet info */}
        <aside className="w-full md:w-80 p-4 border-b md:border-b-0 md:border-r border-white/10 overflow-auto">
          <div className="cosmic-card p-6 mb-6">
            <h2 className="font-bold text-lg mb-4">{t("walletAddress")}</h2>
            <div className="flex items-center space-x-2 font-mono text-sm mb-4">
              <div className="truncate flex-1">
                {walletAddress}
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={copyWalletAddress}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <h2 className="font-bold text-lg mb-2">{t("email")}</h2>
            <p className="text-sm truncate">{userEmail}</p>
          </div>
          
          <div className="cosmic-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{t("assets")}</h2>
              <div className="text-right">
                <p className="text-sm text-gray-400">{t("balance")}</p>
                <p className="font-bold">1,250 XLM</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {DUMMY_ASSETS.map((asset) => (
                <div key={asset.symbol} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${asset.color} flex items-center justify-center mr-2`}>
                      <span className="text-xs">{asset.symbol}</span>
                    </div>
                    <span>{asset.name}</span>
                  </div>
                  <span>{asset.balance} {asset.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.type === "user"
                        ? "bg-cosmic-600 text-white"
                        : "cosmic-card"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("enterCommand")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                />
              </div>
              <SpeechToText onTranscript={handleSpeechInput} />
              <Button onClick={handleSendMessage} className="bg-cosmic-500 hover:bg-cosmic-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppPage;
