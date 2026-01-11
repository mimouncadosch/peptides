import React, { useState } from 'react';
import { getMolecularStructure } from '../../data/molecularStructures';

/**
 * MoleculeViewer Component - 2D molecular structure visualization
 * Displays molecular structure images from PubChem database
 */
const MoleculeViewer = ({ peptideId }) => {
  const [imageError, setImageError] = useState(false);
  const molecularData = getMolecularStructure(peptideId);

  if (!molecularData) {
    return (
      <div className="molecule-viewer-container">
        <div className="molecule-viewer-loading">
          <p>No molecular data available</p>
        </div>
      </div>
    );
  }

  // PubChem 2D structure image URL
  const structureImageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecularData.pubchemCID}/PNG`;

  // PubChem compound page URL
  const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/compound/${molecularData.pubchemCID}`;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="molecule-viewer-section">
      <div className="molecule-viewer-container">
        {!imageError ? (
          <div className="molecule-structure-2d">
            <img
              src={structureImageUrl}
              alt={`${molecularData.name} molecular structure`}
              onError={handleImageError}
              style={{
                maxWidth: '100%',
                height: 'auto',
                imageRendering: 'crisp-edges',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '8px'
              }}
            />
          </div>
        ) : (
          <div className="molecule-viewer-loading">
            <p>Structure image unavailable</p>
            <a
              href={pubchemUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--neon-cyan)',
                textDecoration: 'underline',
                fontSize: '0.875rem'
              }}
            >
              View on PubChem
            </a>
          </div>
        )}
      </div>

      <div className="molecule-info">
        <div className="molecule-info-item">
          <span className="molecule-info-label">Formula</span>
          <span className="molecule-info-value">{molecularData.molecularFormula}</span>
        </div>
        <div className="molecule-info-item">
          <span className="molecule-info-label">Weight</span>
          <span className="molecule-info-value">{molecularData.molecularWeight} g/mol</span>
        </div>
        <div className="molecule-info-item">
          <span className="molecule-info-label">Sequence</span>
          <span className="molecule-info-value">{molecularData.sequence}</span>
        </div>
        <div className="molecule-info-item">
          <span className="molecule-info-label">PubChem</span>
          <span className="molecule-info-value">
            <a
              href={pubchemUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--neon-cyan)',
                textDecoration: 'none',
                borderBottom: '1px dotted var(--neon-cyan)'
              }}
            >
              CID {molecularData.pubchemCID}
            </a>
          </span>
        </div>
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--neon-purple)',
        opacity: 0.7,
        marginTop: 'var(--spacing-sm)'
      }}>
        {molecularData.note} • 2D structure from PubChem
      </p>
    </div>
  );
};

export default MoleculeViewer;
