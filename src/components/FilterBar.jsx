import React from 'react';
import { USE_CASES } from '../data/peptides';

/**
 * FilterBar Component
 * Displays filter buttons for peptide use cases
 * Supports multi-select filtering
 * @param {Array} activeFilters - Currently active filter IDs
 * @param {Function} onFilterChange - Callback when filters change
 */
const FilterBar = ({ activeFilters, onFilterChange }) => {
  const handleFilterClick = (filterId) => {
    if (filterId === 'all') {
      onFilterChange([]);
      return;
    }

    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];

    onFilterChange(newFilters);
  };

  return (
    <div className="filter-bar" role="toolbar" aria-label="Filter peptides by use case">
      {USE_CASES.map(useCase => (
        <button
          key={useCase.id}
          onClick={() => handleFilterClick(useCase.id)}
          className={`filter-button neon-button ${
            useCase.id === 'all' && activeFilters.length === 0 ? 'active' :
            activeFilters.includes(useCase.id) ? 'active' : ''
          }`}
          title={useCase.description}
          aria-pressed={activeFilters.includes(useCase.id)}
        >
          {useCase.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
