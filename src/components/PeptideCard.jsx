import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { USE_CASES } from '../data/peptides';

/**
 * PeptideCard Component
 * Displays comprehensive peptide information with expandable details
 * @param {Object} peptide - Peptide data object
 */
const PeptideCard = React.memo(({ peptide }) => {
  const [expanded, setExpanded] = useState(false);

  // Get use case labels from IDs
  const useCaseLabels = peptide.useCases
    .map(id => USE_CASES.find(uc => uc.id === id))
    .filter(Boolean);

  return (
    <article className="peptide-card neon-card">
      <div className="peptide-card-header">
        <StatusBadge status={peptide.status} />
        {peptide.warnings && (
          <span className="warning-badge" title="Important warnings present">
            ⚠ WARNINGS
          </span>
        )}
        <h2 className="peptide-name">{peptide.name}</h2>
        <p className="peptide-fullname">{peptide.fullName}</p>
      </div>

      <p className="peptide-description">{peptide.description}</p>

      <div className="use-cases">
        {useCaseLabels.map(useCase => (
          <span key={useCase.id} className="use-case-tag" title={useCase.description}>
            {useCase.icon} {useCase.label}
          </span>
        ))}
      </div>

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
