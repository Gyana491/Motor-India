"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const handleSearch = async () => {
    setIsSearching(true);
    const url = `https://motorindia.in/wp-json/api/cars?s=${encodeURIComponent(searchTerm)}`;
    try {
      const res = await fetch(url);
      const result = await res.json();
      setFilteredData(result.posts);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for cars..."
          className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {isSearching ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render your filtered data here */}
          {filteredData.map((item) => (
            <div key={item.id}><Link href={`/car/${item.slug}`}>{item.title}</Link></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;