
import React, { useState, useCallback, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  file: File | null;
  title: string;
  icon: React.ReactNode;
}

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, onFileRemove, file, title, icon }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      fileToDataUrl(file).then(setPreview);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onFileRemove();
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative group w-full h-64 border-2 border-dashed rounded-lg flex justify-center items-center transition-colors duration-200 cursor-pointer ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
        />
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="object-contain h-full w-full rounded-lg" />
            <button 
              onClick={handleRemoveClick}
              className="absolute top-2 right-2 p-1.5 bg-gray-800 bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <div className="mx-auto h-12 w-12 text-gray-400">{icon}</div>
            <p className="mt-2">Drag & drop or click to upload</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
