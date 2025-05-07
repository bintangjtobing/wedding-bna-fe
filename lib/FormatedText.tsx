// components/FormattedText.tsx
'use client';

import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  // Split the text by newline characters (\n)
  const paragraphs = text.split('\n');
  
  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => {
        // Skip empty paragraphs but add a line break
        if (!paragraph.trim()) {
          return <br key={index} />;
        }
        
        // Handle special characters like <3
        const formattedText = paragraph.replace(/<3/g, '❤️');
        
        return (
          <p key={index} className={index > 0 ? 'mt-4' : ''}>
            {formattedText}
          </p>
        );
      })}
    </div>
  );
};

export default FormattedText;