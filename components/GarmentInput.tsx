
import React from 'react';
import type { GarmentInputType } from '../types';
import ImageUploader from './ImageUploader';
import ShirtIcon from './icons/ShirtIcon';

interface GarmentInputProps {
  inputType: GarmentInputType;
  onInputTypeChange: (type: GarmentInputType) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  garmentFile: File | null;
  onGarmentFileSelect: (file: File) => void;
  onGarmentFileRemove: () => void;
}

const GarmentInput: React.FC<GarmentInputProps> = ({
  inputType,
  onInputTypeChange,
  description,
  onDescriptionChange,
  garmentFile,
  onGarmentFileSelect,
  onGarmentFileRemove,
}) => {
  const getButtonClasses = (type: GarmentInputType) =>
    `w-1/2 py-2.5 text-sm font-semibold focus:outline-none transition-colors duration-200 ${
      inputType === type
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;

  return (
    <div className="w-full space-y-3">
        <label className="block text-sm font-medium text-gray-700">Garment Source</label>
        <div className="flex w-full rounded-lg overflow-hidden">
            <button
                onClick={() => onInputTypeChange('image')}
                className={`${getButtonClasses('image')} rounded-l-lg`}
            >
                Upload Image
            </button>
            <button
                onClick={() => onInputTypeChange('text')}
                className={`${getButtonClasses('text')} rounded-r-lg`}
            >
                Describe with Text
            </button>
        </div>
      {inputType === 'image' ? (
        <ImageUploader
          file={garmentFile}
          onFileSelect={onGarmentFileSelect}
          onFileRemove={onGarmentFileRemove}
          title="Garment Image"
          icon={<ShirtIcon className="w-12 h-12" />}
        />
      ) : (
        <div className="w-full">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Garment Description
            </label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="e.g., 'a navy blue cotton blazer with two buttons, slim fit'"
                className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                rows={6}
            />
        </div>
      )}
    </div>
  );
};

export default GarmentInput;
