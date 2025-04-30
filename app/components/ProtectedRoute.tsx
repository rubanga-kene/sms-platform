import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true); // Track if authentication check is complete
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking authentication status (for example, checking for a token in localStorage)
    const token = localStorage.getItem('token'); // Or use another method for checking user auth
    if (!token) {
      router.push('/'); // Redirect to login page if not authenticated
    } else {
      setIsAuthenticated(true); // If authenticated, allow access to the route
    }
    setIsLoading(false); // Stop loading after check is complete
  }, [router]);

  // While loading (before authentication check is complete), return null (no content shown)
  if (isLoading) {
    return null; // No content displayed until authentication check is finished
  }

  // Only render the children (page content) if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
