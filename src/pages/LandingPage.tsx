import { useLanguage } from "@/context/useLanguage";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Mic, Globe, Shield } from "lucide-react";

const LandingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col stellar-gradient text-white">
      {/* Header */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
            onClick={() => navigate("/login")}
          >
            {t("login")}
          </Button>
          <Button
            className="bg-cosmic-500 hover:bg-cosmic-600"
            onClick={() => navigate("/signup")}
          >
            {t("signUp")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">StellaX</h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100">
            {t("tagline")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-cosmic-500 hover:bg-cosmic-600 text-lg"
              onClick={() => navigate("/signup")}
            >
              {t("getStarted")}
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative cosmic-card p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">{t("walletAddress")}</p>
                  <p className="font-mono text-sm truncate w-48 md:w-auto">
                    GCKB32...XW47P
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{t("balance")}</p>
                  <p className="text-xl font-bold">1,250 XLM</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-gray-400 mb-2">{t("assets")}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-stellar-800 flex items-center justify-center mr-2">
                        <span className="text-xs">XLM</span>
                      </div>
                      <span>Stellar</span>
                    </div>
                    <span>1,250 XLM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center mr-2">
                        <span className="text-xs">USD</span>
                      </div>
                      <span>USD Coin</span>
                    </div>
                    <span>350 USDC</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="border-t border-white/10 pt-4 pb-2">
                  <div className="bg-stellar-800/50 rounded-lg p-3 flex items-center">
                    <input
                      type="text"
                      placeholder={t("enterCommand")}
                      className="bg-transparent border-none focus:outline-none text-white placeholder:text-gray-400 flex-1"
                      readOnly
                    />
                    <Button size="icon" variant="ghost">
                      <Mic className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-cosmic-300 animate-pulse-slow">
                  AI-powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          {t("features")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="cosmic-card p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-cosmic-600/50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-cosmic-200" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("aiPowered")}</h3>
            <p className="text-cosmic-200">{t("aiDesc")}</p>
          </div>

          <div className="cosmic-card p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-cosmic-600/50 rounded-full flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-cosmic-200" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("voiceEnabled")}</h3>
            <p className="text-cosmic-200">{t("voiceDesc")}</p>
          </div>

          <div className="cosmic-card p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-cosmic-600/50 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-cosmic-200" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("multiLang")}</h3>
            <p className="text-cosmic-200">{t("multiLangDesc")}</p>
          </div>

          <div className="cosmic-card p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-cosmic-600/50 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-cosmic-200" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("secure")}</h3>
            <p className="text-cosmic-200">{t("secureDesc")}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="sm" />
            <div className="mt-4 md:mt-0 text-sm text-cosmic-300">
              &copy; {new Date().getFullYear()} StellaX. {t("tagline")}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
