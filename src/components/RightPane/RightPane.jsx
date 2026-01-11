import React from 'react';
import MoleculeViewer from './MoleculeViewer';
import PeptideDetails from './PeptideDetails';

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

  return (
    <div className="right-pane">
      <div className="right-pane-content">
        {/* 3D Molecule Viewer */}
        <MoleculeViewer peptideId={peptide.id} />

        {/* Full Details */}
        <PeptideDetails peptide={peptide} />
      </div>
    </div>
  );
};

export default RightPane;
