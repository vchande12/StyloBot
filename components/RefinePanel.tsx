import React from 'react';
import AccordionItem from './AccordionItem';
import WandIcon from './icons/WandIcon';

interface RefinePanelProps {
  refinePrompt: string;
  onRefinePromptChange: (prompt: string) => void;
  onRefine: () => void;
  isRefining: boolean;
}

const RefinePanel: React.FC<RefinePanelProps> = ({ refinePrompt, onRefinePromptChange, onRefine, isRefining }) => {
  return (
    <div className="w-full">
      <AccordionItem title="Refine Result" icon={<WandIcon className="w-6 h-6 text-indigo-600" />}>
        <div className="space-y-3">
            <p className="text-sm text-gray-600">
                Not quite right? Add instructions to adjust the generated image.
            </p>
            <textarea
                value={refinePrompt}
                onChange={(e) => onRefinePromptChange(e.target.value)}
                placeholder="e.g., 'make the blazer a lighter shade of blue', 'change the background to a cityscape'"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                rows={3}
            />
            <button
                onClick={onRefine}
                disabled={isRefining || !refinePrompt.trim()}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
                {isRefining ? 'Refining...' : 'Apply Refinements'}
            </button>
        </div>
      </AccordionItem>
    </div>
  );
};

export default RefinePanel;
