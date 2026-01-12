import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import Peptide3DShape from './Peptide3DShape';
import StatsDisplay from './StatsDisplay';
import { USE_CASES } from '../data/peptides';
import { getPeptideCharacterData } from '../data/peptideStats';
import { playHoverSound, playSelectSound, playDeselectSound, initAudio } from '../utils/soundEffects';

/**
 * PeptideCard Component - Character Selection Style
 * Displays peptide as a video game character with 3D shape, stats, and selection
 * @param {Object} peptide - Peptide data object
 * @param {boolean} selected - Whether this peptide is currently selected
 * @param {Function} onToggleSelect - Callback when selection is toggled
 */
const PeptideCard = React.memo(({ peptide, selected, onToggleSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Get character data including shape and stats
  const characterData = getPeptideCharacterData(peptide);

  // Get use case labels from IDs
  const useCaseLabels = peptide.useCases
    .map(id => USE_CASES.find(uc => uc.id === id))
    .filter(Boolean);

  // Handle mouse enter - play hover sound
  const handleMouseEnter = () => {
    if (!hasInteracted) {
      initAudio(); // Initialize audio context on first interaction
      setHasInteracted(true);
    }
    playHoverSound();
  };

  // Handle selection toggle
  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent card click from triggering

    if (!hasInteracted) {
      initAudio();
      setHasInteracted(true);
    }

    if (selected) {
      playDeselectSound();
    } else {
      playSelectSound();
    }

    onToggleSelect(peptide.id);
  };

  return (
    <article
      className={`peptide-card neon-card ${selected ? 'selected' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      {/* Character Portrait Section */}
      <div className="character-portrait">
        {/* 3D Shape */}
        <Peptide3DShape
          shape={characterData.shape}
          color={characterData.shapeColor}
          selected={selected}
          peptideName={peptide.name}
        />

        {/* Header with Status and Selection Badge */}
        <div className="peptide-card-header">
          <StatusBadge status={peptide.status} />
          {selected && (
            <span className="selected-badge">
              ✓ SELECTED
            </span>
          )}
          {peptide.warnings && (
            <span className="warning-badge" title="Important warnings present">
              ⚠ WARNINGS
            </span>
          )}
        </div>

        {/* Name */}
        <h2 className="peptide-name">{peptide.name}</h2>
        <p className="peptide-fullname">{peptide.fullName}</p>
      </div>

      {/* Stats Display */}
      <StatsDisplay stats={characterData.stats} compact={false} />

      {/* Description */}
      <p className="peptide-description">{peptide.description}</p>

      {/* Use Cases */}
      <div className="use-cases">
        {useCaseLabels.map(useCase => (
          <span key={useCase.id} className="use-case-tag" title={useCase.description}>
            {useCase.label}
          </span>
        ))}
      </div>

      {/* Select Button */}
      <button
        onClick={handleSelectClick}
        className={`select-button ${selected ? 'selected' : ''}`}
        aria-pressed={selected}
        aria-label={selected ? `Deselect ${peptide.name}` : `Select ${peptide.name}`}
      >
        {selected ? '✓ SELECTED' : 'SELECT'}
      </button>

      {/* Expandable Detailed Info */}
      {expanded && (
        <div className="detailed-info">
          {/* Chinese Market Context */}
          <section className="info-section">
            <h3>🇨🇳 Chinese Market Context</h3>
            <div className="info-item">
              <p><span className="info-label">Sourcing:</span> {peptide.chineseContext.sourcing}</p>
            </div>
            <div className="info-item">
              <p><span className="info-label">Popularity:</span> {peptide.chineseContext.popularity}</p>
            </div>
            <div className="info-item">
              <p><span className="info-label">Notes:</span> {peptide.chineseContext.notes}</p>
            </div>
          </section>

          {/* Studies & Evidence */}
          <section className="info-section">
            <h3>📚 Research & Evidence</h3>
            <ul className="studies-list">
              {peptide.studies.map((study, idx) => (
                <li key={idx} className="study-item">
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="study-link"
                  >
                    {study.title}
                  </a>
                  <p className="study-summary">
                    <span className="study-year">({study.year})</span> {study.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Dosage Information */}
          <section className="info-section">
            <h3>💉 Dosage</h3>
            <p>{peptide.dosage}</p>
          </section>

          {/* Side Effects */}
          <section className="info-section">
            <h3>⚠️ Side Effects</h3>
            <p>{peptide.sideEffects}</p>
          </section>

          {/* Warnings (if present) */}
          {peptide.warnings && (
            <section className="info-section">
              <h3>🚨 Important Warnings</h3>
              <ul>
                {peptide.warnings.map((warning, idx) => (
                  <li key={idx} style={{ color: '#ff0000' }}>{warning}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Toggle Details Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="toggle-button"
        aria-expanded={expanded}
        aria-label={expanded ? 'Show less information' : 'Show more information'}
      >
        {expanded ? '▲ SHOW LESS' : '▼ SHOW MORE'}
      </button>
    </article>
  );
});

PeptideCard.displayName = 'PeptideCard';

export default PeptideCard;
