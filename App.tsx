import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PersonIcon from './components/icons/PersonIcon';
import GarmentInput from './components/GarmentInput';
import { GarmentInputType } from './types';
import ResultDisplay from './components/ResultDisplay';
import { generateVirtualTryOn } from './services/geminiService';
import WandIcon from './components/icons/WandIcon';

function App() {
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [garmentFile, setGarmentFile] = useState<File | null>(null);
  const [garmentInputType, setGarmentInputType] = useState<GarmentInputType>('image');
  const [garmentDescription, setGarmentDescription] = useState('');
  
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isGenerateDisabled = () => {
    if (!personFile) return true;
    if (garmentInputType === 'image' && !garmentFile) return true;
    if (garmentInputType === 'text' && !garmentDescription.trim()) return true;
    return false;
  };
  
  const handleGenerate = async (refinePrompt: string = '') => {
    if (isGenerateDisabled() && !refinePrompt) return;
    
    if (refinePrompt) {
        setIsRefining(true);
    } else {
        setIsLoading(true);
    }
    setError(null);
    if (!refinePrompt) {
      setResultImageUrl(null);
    }
    
    try {
      if (!personFile) throw new Error("Person image is missing.");
      const imageUrl = await generateVirtualTryOn(personFile, garmentFile, garmentDescription, refinePrompt);
      setResultImageUrl(imageUrl);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      setIsRefining(false);
    }
  };
  
  const handleRetry = () => {
    handleGenerate();
  }

  const handleRefine = (prompt: string) => {
    handleGenerate(prompt);
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel: Inputs */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <ImageUploader
              file={personFile}
              onFileSelect={setPersonFile}
              onFileRemove={() => setPersonFile(null)}
              title="Your Image"
              icon={<PersonIcon className="w-12 h-12" />}
            />
            <hr />
            <GarmentInput
              inputType={garmentInputType}
              onInputTypeChange={(type) => {
                  setGarmentInputType(type);
                  setGarmentFile(null);
                  setGarmentDescription('');
              }}
              description={garmentDescription}
              onDescriptionChange={setGarmentDescription}
              garmentFile={garmentFile}
              onGarmentFileSelect={setGarmentFile}
              onGarmentFileRemove={() => setGarmentFile(null)}
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerateDisabled() || isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
              <WandIcon className="w-6 h-6" />
              {isLoading ? 'Generating...' : 'Generate Try-On'}
            </button>
          </div>
          {/* Right Panel: Result */}
          <div className="bg-white p-6 rounded-lg shadow-md h-full min-h-[500px] lg:min-h-0">
            <ResultDisplay 
                resultImageUrl={resultImageUrl}
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
                onRefine={handleRefine}
                isRefining={isRefining}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Virtual Try-On. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
