import React from 'react';
import StatusBadge from '../StatusBadge';
import { playHoverSound } from '../../utils/soundEffects';

/**
 * PeptideListItem Component - Compact peptide card for list
 */
const PeptideListItem = ({ peptide, isActive, onClick }) => {
  // Get first use case for tagline
  const primaryUseCase = peptide.useCases[0] || '';
  const tagline = primaryUseCase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div
      className={`peptide-list-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={playHoverSound}
    >
      <div className="peptide-list-item-thumbnail">
        {peptide.name}
      </div>
      <div className="peptide-list-item-content">
        <div className="peptide-list-item-header">
          <h3 className="peptide-list-item-name">{peptide.name}</h3>
          <div className="peptide-list-item-badges">
            <StatusBadge status={peptide.status} />
          </div>
        </div>
        <p className="peptide-list-item-tagline">
          {tagline} • {peptide.useCases.length} use cases
        </p>
      </div>
    </div>
  );
};

export default PeptideListItem;
