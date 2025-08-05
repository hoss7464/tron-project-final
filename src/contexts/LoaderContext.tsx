import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  incrementLoading: () => void;
  decrementLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  incrementLoading: () => {},
  decrementLoading: () => {},
  isLoading: false,
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const incrementLoading = () => {
    setLoadingCount(prev => {
      if (prev === 0) {
        setShowLoader(true);
        setMinTimeElapsed(false);
        setTimeout(() => setMinTimeElapsed(true), 3000); // Minimum 5 seconds
      }
      return prev + 1;
    });
  };

  const decrementLoading = () => {
    setLoadingCount(prev => Math.max(0, prev - 1));
  };

  // Hide loader only if:
  // 1. No pending requests (loadingCount === 0)
  // 2. Minimum time has passed (minTimeElapsed === true)
  useEffect(() => {
    if (loadingCount === 0 && minTimeElapsed) {
      setShowLoader(false);
    }
  }, [loadingCount, minTimeElapsed]);

  return (
    <LoadingContext.Provider value={{
      incrementLoading,
      decrementLoading,
      isLoading: showLoader,
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);