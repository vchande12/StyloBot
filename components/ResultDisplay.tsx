import React, { useState } from 'react';
import RefreshIcon from './icons/RefreshIcon';
import ImageModal from './ImageModal';
import RefinePanel from './RefinePanel';
import SparklesIcon from './icons/SparklesIcon';

interface ResultDisplayProps {
  resultImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onRefine: (prompt: string) => void;
  isRefining: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  resultImageUrl,
  isLoading,
  error,
  onRetry,
  onRefine,
  isRefining,
}) => {
  const [refinePrompt, setRefinePrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRefine = () => {
    onRefine(refinePrompt);
  };
  
  const openModal = () => {
    if (resultImageUrl) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <SparklesIcon className="w-16 h-16 text-indigo-500 animate-pulse" />
          <p className="mt-4 text-lg font-semibold">Generating your new look...</p>
          <p className="text-sm">This may take a moment. The AI is working its magic!</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-600">
          <p className="font-semibold">Generation Failed</p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={onRetry}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
          >
            <RefreshIcon className="w-5 h-5" />
            Try Again
          </button>
        </div>
      );
    }
    
    if (resultImageUrl) {
        return (
            <div className="w-full relative group">
                <img
                    src={resultImageUrl}
                    alt="Virtual try-on result"
                    className="w-full h-auto object-contain rounded-lg shadow-lg cursor-pointer"
                    onClick={openModal}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" onClick={openModal}>
                    <p className="text-white text-lg font-bold">Click to view larger</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-400">
            <SparklesIcon className="w-16 h-16" />
            <p className="mt-4 text-lg font-semibold">Your result will appear here</p>
            <p className="text-sm">Upload your images and description to get started.</p>
        </div>
    );
  };

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg shadow-inner h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
      {resultImageUrl && !isLoading && !error && (
        <div className="w-full mt-6">
          <RefinePanel 
            refinePrompt={refinePrompt} 
            onRefinePromptChange={setRefinePrompt}
            onRefine={handleRefine}
            isRefining={isRefining}
          />
        </div>
      )}
      {isModalOpen && resultImageUrl && (
        <ImageModal imageUrl={resultImageUrl} onClose={closeModal} />
      )}
    </div>
  );
};

export default ResultDisplay;
