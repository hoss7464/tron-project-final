import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonContentProps {
  loading: boolean;
  loadingText?: string;
  normalText: string;
  size?: number;
}

const LoadingButtonContent: React.FC<LoadingButtonContentProps> = ({
  loading,
  loadingText,
  normalText,
  size = 16
}) => {
  return loading ? (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      <CircularProgress size={size} color="inherit" />
      <span>{loadingText}</span>
    </div>
  ) : (
    <span>{normalText}</span>
  );
};

export default LoadingButtonContent;