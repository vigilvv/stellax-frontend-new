
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface SpeechToTextProps {
  onTranscript: (text: string) => void;
}

export function SpeechToText({ onTranscript }: SpeechToTextProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { language, t } = useLanguage();

  // Map our app languages to SpeechRecognition languages
  const languageMap: Record<string, string> = {
    en: 'en-US',
    es: 'es-ES',
    hi: 'hi-IN',
  };

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscript]);

  // Update language when app language changes
  useEffect(() => {
    if (recognition) {
      recognition.lang = languageMap[language] || 'en-US';
    }
  }, [language, recognition]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <Button
      variant={isListening ? "default" : "outline"}
      size="icon"
      onClick={toggleListening}
      className={isListening ? "bg-accent-500 hover:bg-accent-600" : ""}
      title={t("speak")}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
}
