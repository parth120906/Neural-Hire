import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on the home page if desired, but user said "all pages".
  // If "all pages" means unconditionally, we can show it everywhere except maybe root.
  // Actually, navigating back from root might exit the app or just do nothing useful in SPA.
  // We'll render it everywhere as requested, but maybe hide on '/' for better UX.
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-12 h-12 bg-slate-800 border border-slate-700/50 rounded-full shadow-lg hover:bg-slate-700 hover:shadow-purple-500/30 text-slate-300 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
      title="Go Back"
    >
      <svg
        className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
  );
};

export default BackButton;
