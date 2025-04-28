import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading data...',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 sm:py-12 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-t-blue-500 border-r-blue-200/30 border-b-blue-200/30 border-l-blue-200/30 animate-spin"></div>
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-r-blue-500/70 border-l-transparent border-t-transparent border-b-transparent animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
        ></div>
      </div>
      {message && (
        <div className="mt-5 text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;