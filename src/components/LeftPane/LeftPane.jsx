import React, { useState } from 'react';
import PeptideListItem from './PeptideListItem';
import { USE_CASES } from '../../data/peptides';

/**
 * LeftPane Component - Main left sidebar with list and controls
 */
const LeftPane = ({
  peptides,
  selectedPeptide,
  onSelectPeptide,
  activeFilters,
  onFilterChange
}) => {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  return (
    <div className="left-pane">

      {/* Filters */}
      <div className={`filter-section ${filtersCollapsed ? 'collapsed' : ''}`}>
        <h3
          className="filter-section-title"
          onClick={() => setFiltersCollapsed(!filtersCollapsed)}
        >
          <span>Filters</span>
          <span className="filter-toggle-icon">▼</span>
        </h3>
        {!filtersCollapsed && (
          <div className="filter-chips">
            {USE_CASES.slice(1).map(useCase => ( // Skip 'all'
              <button
                key={useCase.id}
                className={`filter-chip ${activeFilters.includes(useCase.id) ? 'active' : ''}`}
                onClick={() => {
                  if (activeFilters.includes(useCase.id)) {
                    onFilterChange(activeFilters.filter(id => id !== useCase.id));
                  } else {
                    onFilterChange([...activeFilters, useCase.id]);
                  }
                }}
              >
                {useCase.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Peptide List */}
      <div className="peptide-list">
        <div className="peptide-list-items">
          {peptides.map(peptide => (
            <PeptideListItem
              key={peptide.id}
              peptide={peptide}
              isActive={selectedPeptide?.id === peptide.id}
              onClick={() => onSelectPeptide(peptide)}
            />
          ))}
        </div>
        <div className="peptide-list-count">
          {peptides.length} PEPTIDE{peptides.length !== 1 ? 'S' : ''}
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
