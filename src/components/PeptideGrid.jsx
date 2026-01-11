import React from 'react';
import PeptideCard from './PeptideCard';

/**
 * PeptideGrid Component
 * Renders a responsive grid of peptide cards
 * @param {Array} peptides - Array of peptide objects to display
 */
const PeptideGrid = ({ peptides }) => {
  if (!peptides || peptides.length === 0) {
    return (
      <div className="peptide-grid empty">
        <div className="empty-state">
          <p>&gt; NO PEPTIDES MATCH YOUR FILTERS_</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.7 }}>
            Try selecting different use cases or clear all filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="peptide-grid">
      {peptides.map(peptide => (
        <PeptideCard key={peptide.id} peptide={peptide} />
      ))}
    </div>
  );
};

export default PeptideGrid;
