import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpen: defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
        setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: contentHeight }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="p-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
