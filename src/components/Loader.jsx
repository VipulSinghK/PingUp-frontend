import React from 'react'

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loader;

