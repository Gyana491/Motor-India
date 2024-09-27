"use client";

import React, { useState } from 'react';

const Car360View = ({ car }) => {
  const [activeTab, setActiveTab] = useState('interior');

  return (
    <div className="mb-4">
      <div className="flex space-x-4 mb-2">
        <button
          className={`px-4 py-2 ${activeTab === 'interior' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('interior')}
        >
          Interior
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'exterior' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('exterior')}
        >
          Exterior
        </button>
      </div>
      <div className="border p-4">
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          {activeTab === 'interior' ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={car['360-view'].interior}
              title="Interior 360 View"
            ></iframe>
          ) : (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={car['360-view'].exterior}
              title="Exterior 360 View"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Car360View;