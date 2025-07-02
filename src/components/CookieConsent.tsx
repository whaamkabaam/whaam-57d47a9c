
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
      <Card className="shadow-xl border-2 border-whaam-red/20 bg-whaam-black/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="text-whaam-yellow mt-1" size={24} />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-whaam-white mb-2">
                  We use Cookies
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This website only uses technically necessary cookies for basic functionality. 
                  We do not use tracking or analytics cookies. More information can be found in our{" "}
                  <button 
                    onClick={handlePrivacyClick}
                    className="text-whaam-red hover:text-whaam-yellow underline font-medium"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAccept}
                  variant="whaam"
                  className="flex-1 sm:flex-none"
                >
                  Accept
                </Button>
                <Button 
                  onClick={handleDecline}
                  variant="whaam-outline"
                  className="flex-1 sm:flex-none"
                >
                  Decline
                </Button>
              </div>
            </div>
            
            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-1 text-muted-foreground hover:text-whaam-red transition-colors"
              aria-label="Close banner"
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
