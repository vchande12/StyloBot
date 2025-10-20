
import React from 'react';

const ShirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m7.693-7.693l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m-3.39 2.257a4.5 4.5 0 010-6.364l7.693-7.693a4.5 4.5 0 016.364 6.364l-7.693 7.693a4.5 4.5 0 01-6.364 0z" />
        <path d="M6.25 21.25L4 19" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 15.25L4 7.25" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 15.25L20 7.25" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export default ShirtIcon;
