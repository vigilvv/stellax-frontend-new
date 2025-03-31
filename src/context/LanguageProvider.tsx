import { LanguageContext } from "./LanguageContext";

import { useState, ReactNode } from "react";

type Language = "en" | "es" | "hi";

const translations = {
  en: {
    // Landing Page
    tagline: "The First AI Wallet on the Stellar Network",
    getStarted: "Get Started",
    signUp: "Sign Up",
    login: "Login",
    features: "Features",
    aiPowered: "AI-Powered Interface",
    aiDesc: "Interact with your wallet using natural language commands",
    voiceEnabled: "Voice Interaction",
    voiceDesc: "Speak to your wallet - no typing required",
    multiLang: "Multi-Language Support",
    multiLangDesc: "Available in English, Spanish, and Hindi",
    secure: "Secure & Fast",
    secureDesc: "Built on the Stellar network for secure, fast transactions",

    // App Page
    balance: "Balance",
    assets: "Assets",
    send: "Send",
    receive: "Receive",
    logout: "Logout",
    enterCommand: "Enter your command...",
    walletAddress: "Wallet Address",
    email: "Email",
    speak: "Speak",
    copy: "Copy",
    language: "Language",
    english: "English",
    spanish: "Spanish",
    hindi: "Hindi",
  },
  es: {
    // Landing Page
    tagline: "La Primera Billetera con IA en la Red Stellar",
    getStarted: "Comenzar",
    signUp: "Registrarse",
    login: "Iniciar Sesión",
    features: "Características",
    aiPowered: "Interfaz con IA",
    aiDesc: "Interactúa con tu billetera usando comandos en lenguaje natural",
    voiceEnabled: "Interacción por Voz",
    voiceDesc: "Habla con tu billetera - sin necesidad de escribir",
    multiLang: "Soporte Multi-Idioma",
    multiLangDesc: "Disponible en Inglés, Español e Hindi",
    secure: "Seguro y Rápido",
    secureDesc:
      "Construido sobre la red Stellar para transacciones seguras y rápidas",

    // App Page
    balance: "Saldo",
    assets: "Activos",
    send: "Enviar",
    receive: "Recibir",
    logout: "Cerrar Sesión",
    enterCommand: "Ingresa tu comando...",
    walletAddress: "Dirección de Billetera",
    email: "Correo",
    speak: "Hablar",
    copy: "Copiar",
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",
    hindi: "Hindi",
  },
  hi: {
    // Landing Page
    tagline: "स्टेलर नेटवर्क पर पहला AI वॉलेट",
    getStarted: "शुरू करें",
    signUp: "साइन अप करें",
    login: "लॉगिन करें",
    features: "विशेषताएं",
    aiPowered: "AI-संचालित इंटरफेस",
    aiDesc:
      "प्राकृतिक भाषा कमांड का उपयोग करके अपने वॉलेट के साथ इंटरैक्ट करें",
    voiceEnabled: "आवाज इंटरैक्शन",
    voiceDesc: "अपने वॉलेट से बात करें - टाइपिंग की आवश्यकता नहीं",
    multiLang: "बहु-भाषा समर्थन",
    multiLangDesc: "अंग्रेजी, स्पेनिश और हिंदी में उपलब्ध",
    secure: "सुरक्षित और तेज",
    secureDesc: "सुरक्षित, तेज लेनदेन के लिए स्टेलर नेटवर्क पर निर्मित",

    // App Page
    balance: "बैलेंस",
    assets: "एसेट्स",
    send: "भेजें",
    receive: "प्राप्त करें",
    logout: "लॉगआउट",
    enterCommand: "अपना कमांड दर्ज करें...",
    walletAddress: "वॉलेट एड्रेस",
    email: "ईमेल",
    speak: "बोलें",
    copy: "कॉपी",
    language: "भाषा",
    english: "अंग्रेजी",
    spanish: "स्पेनिश",
    hindi: "हिंदी",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
