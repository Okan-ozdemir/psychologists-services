import React from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = ['Name A-Z', 'Name Z-A', 'Price low to high', 'Price high to low', 'Rating high to low', 'Rating low to high'];

const Filters = ({ currentSort, onSortChange }) => {
  return (
    <div className="mb-8 max-w-xs">
      <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Filters</label>
      <div className="relative group">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full appearance-none bg-emerald-600 text-white rounded-xl py-3 px-5 pr-12 font-semibold cursor-pointer focus:outline-none hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option} className="text-gray-800 bg-white">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Filters;