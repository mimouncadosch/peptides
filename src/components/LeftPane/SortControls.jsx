import React from 'react';

/**
 * SortControls Component - Simple sort dropdown and order toggle
 */
const SortControls = ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  return (
    <div className="sort-controls">
      <span className="sort-label">Sort:</span>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="status">Status</option>
      </select>
      <button
        className="sort-order-btn"
        onClick={onOrderChange}
        title={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default SortControls;
