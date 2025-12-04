import React from 'react';

import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 ${className}`}
    >
      <Loader2 className={`${sizeClasses[size]} text-slate-400 animate-spin mb-4`} />
      <p className={`text-slate-500 font-medium ${textSizeClasses[size]}`}>{message}</p>
    </div>
  );
};

export default Loader;
