import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center"
      style={{ backgroundColor: 'var(--theme-bg)' }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* 404 Number */}
        <div 
          className="text-8xl sm:text-9xl font-bold"
          style={{ color: 'var(--theme-text)' }}
        >
          404
        </div>

        {/* Main heading */}
        <h1 
          className="text-2xl sm:text-3xl font-semibold"
          style={{ color: 'var(--theme-text)' }}
        >
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border text-base font-medium"
            style={{
              backgroundColor: 'var(--theme-card-bg)',
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-card-bg)';
            }}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-base font-medium text-white"
            style={{
              backgroundColor: '#6366f1',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4f46e5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6366f1';
            }}
          >
            <Home size={18} />
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;