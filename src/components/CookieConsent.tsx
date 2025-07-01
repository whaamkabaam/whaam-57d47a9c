
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  const handlePrivacyClick = () => {
    navigate('/privacy');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-50 animate-in slide-in-from-bottom-4">
      <Card className="shadow-xl border-2 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="text-blue-500 mt-1" size={24} />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Wir verwenden Cookies
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Diese Website verwendet nur technisch notwendige Cookies für die grundlegende Funktionalität. 
                  Wir verwenden keine Tracking- oder Analyse-Cookies. Weitere Informationen finden Sie in unserer{" "}
                  <button 
                    onClick={handlePrivacyClick}
                    className="text-blue-500 hover:text-blue-600 underline font-medium"
                  >
                    Datenschutzerklärung
                  </button>.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex-1 sm:flex-none"
                >
                  Akzeptieren
                </Button>
                <Button 
                  onClick={handleDecline}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  Ablehnen
                </Button>
              </div>
            </div>
            
            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Banner schließen"
            >
              <X size={20} />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
