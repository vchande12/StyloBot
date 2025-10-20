
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center py-8">
      <div className="flex items-center justify-center gap-3 text-4xl font-bold text-gray-800">
        <SparklesIcon className="w-10 h-10 text-indigo-500" />
        <h1>AI Virtual Try-On</h1>
      </div>
      <p className="mt-2 text-lg text-gray-600">
        Powered by Gemini - See yourself in new styles instantly.
      </p>
    </header>
  );
};

export default Header;
