
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
