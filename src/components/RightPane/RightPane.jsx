import React from 'react';
import MoleculeViewer from './MoleculeViewer';
import PeptideDetails from './PeptideDetails';
import StatusBadge from '../StatusBadge';
import { USE_CASES } from '../../data/peptides';

/**
 * RightPane Component - Detail view container (Pokedex)
 */
const RightPane = ({ peptide }) => {
  if (!peptide) {
    return (
      <div className="right-pane">
        <div className="pane-empty">
          <div className="pane-empty-icon">🧬</div>
          <p className="pane-empty-text">Select a peptide to view details</p>
        </div>
      </div>
    );
  }

  const useCaseLabels = peptide.useCases
    .map(id => USE_CASES.find(uc => uc.id === id))
    .filter(Boolean);

  return (
    <div className="right-pane">
      <div className="right-pane-split">
        {/* Left: Main Info (non-scrollable) */}
        <div className="right-pane-info">
          <h1 className="info-title">{peptide.name}</h1>
          <p className="info-subtitle">{peptide.fullName}</p>
          <StatusBadge status={peptide.status} />
          <MoleculeViewer peptideId={peptide.id} />

          {/* Use Cases */}
          <div className="info-use-cases">
            {useCaseLabels.map(useCase => (
              <span key={useCase.id} className="info-use-case-tag">
                {useCase.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Details (tabs) */}
        <div className="right-pane-details">
          <PeptideDetails peptide={peptide} />
        </div>
      </div>
    </div>
  );
};

export default RightPane;
