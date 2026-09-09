import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas text-cream">
      <div className="text-center">
        <p className="label-caps mb-4">Error</p>
        <h1 className="heading-display mb-4 text-7xl">404</h1>
        <p className="mb-8 text-cream-muted">This page does not exist.</p>
        <a href="/" className="btn-primary">
          Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
