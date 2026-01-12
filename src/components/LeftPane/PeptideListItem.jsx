import React from 'react';

/**
 * PeptideListItem Component - Simple list item
 */
const PeptideListItem = ({ peptide, isActive, onClick }) => {
  return (
    <div
      className={`peptide-list-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {peptide.name}
    </div>
  );
};

export default PeptideListItem;
