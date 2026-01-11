import React from 'react';
import StatusBadge from '../StatusBadge';
import StatsDisplay from '../StatsDisplay';
import { USE_CASES } from '../../data/peptides';
import { getPeptideCharacterData } from '../../data/peptideStats';

/**
 * PeptideDetails Component - Full detail view (pokedex style)
 */
const PeptideDetails = ({ peptide }) => {
  const characterData = getPeptideCharacterData(peptide);
  const useCaseLabels = peptide.useCases
    .map(id => USE_CASES.find(uc => uc.id === id))
    .filter(Boolean);

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <h1 className="detail-title">{peptide.name}</h1>
        <p className="detail-subtitle">{peptide.fullName}</p>
        <div className="detail-badges">
          <StatusBadge status={peptide.status} />
          {peptide.warnings && (
            <span className="warning-badge">
              ⚠ {peptide.warnings.length} WARNING{peptide.warnings.length !== 1 ? 'S' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div className="use-cases-detail">
        {useCaseLabels.map(useCase => (
          <span key={useCase.id} className="use-case-tag-large">
            <span>{useCase.icon}</span>
            <span>{useCase.label}</span>
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="stats-section">
        <h2 className="stats-section-title">Effectiveness Profile</h2>
        <StatsDisplay stats={characterData.stats} compact={false} />
      </div>

      {/* Description */}
      <div className="detail-section">
        <h2 className="detail-section-title">
          <span className="detail-section-icon">📋</span>
          Description
        </h2>
        <div className="detail-section-content">
          <p>{peptide.description}</p>
        </div>
      </div>

      {/* Chinese Market Context */}
      <div className="detail-section">
        <h2 className="detail-section-title">
          <span className="detail-section-icon">🇨🇳</span>
          Chinese Market Context
        </h2>
        <div className="detail-section-content info-grid">
          <div className="info-grid-item">
            <div className="info-grid-label">Sourcing</div>
            <div className="info-grid-value">{peptide.chineseContext.sourcing}</div>
          </div>
          <div className="info-grid-item">
            <div className="info-grid-label">Popularity</div>
            <div className="info-grid-value">{peptide.chineseContext.popularity}</div>
          </div>
          <div className="info-grid-item" style={{ gridColumn: '1 / -1' }}>
            <div className="info-grid-label">Notes</div>
            <div className="info-grid-value">{peptide.chineseContext.notes}</div>
          </div>
        </div>
      </div>

      {/* Studies & Evidence */}
      <div className="detail-section">
        <h2 className="detail-section-title">
          <span className="detail-section-icon">📚</span>
          Research & Evidence
        </h2>
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
              <div className="study-meta">
                <span className="study-year">{study.year}</span>
              </div>
              <p className="study-summary">{study.summary}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Dosage */}
      <div className="detail-section">
        <h2 className="detail-section-title">
          <span className="detail-section-icon">💉</span>
          Dosage Information
        </h2>
        <div className="detail-section-content">
          <p>{peptide.dosage}</p>
        </div>
      </div>

      {/* Side Effects */}
      <div className="detail-section">
        <h2 className="detail-section-title">
          <span className="detail-section-icon">⚠️</span>
          Side Effects
        </h2>
        <div className="detail-section-content">
          <p>{peptide.sideEffects}</p>
        </div>
      </div>

      {/* Warnings */}
      {peptide.warnings && (
        <div className="detail-section">
          <h2 className="detail-section-title">
            <span className="detail-section-icon">🚨</span>
            Important Warnings
          </h2>
          <ul className="warnings-list">
            {peptide.warnings.map((warning, idx) => (
              <li key={idx} className="warning-item">
                <span className="warning-icon">⚠</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PeptideDetails;
