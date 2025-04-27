import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading data...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-r-primary border-l-transparent border-t-transparent border-b-transparent animate-spin"
          style={{ animationDuration: '1.5s' }}
        ></div>
      </div>
      {message && (
        <span className="mt-3 text-sm font-medium text-muted-foreground">{message}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;