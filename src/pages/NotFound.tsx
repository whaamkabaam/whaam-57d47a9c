import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold bg-gradient-to-br from-secondary via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,215,64,0.3)]">
          404
        </h1>
        <p className="text-xl text-muted-foreground">
          Oops! This page doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 underline underline-offset-4 transition-colors font-medium"
        >
          <Home className="h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
