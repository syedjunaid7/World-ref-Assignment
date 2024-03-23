import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-25">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default PageLoader;
