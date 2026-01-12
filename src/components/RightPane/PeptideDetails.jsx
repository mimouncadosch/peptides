import React, { useState } from 'react';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'history', label: 'History' },
  { id: 'studies', label: 'Studies' },
  { id: 'warnings', label: 'Warnings' },
];

/**
 * PeptideDetails Component - Tabbed detail sections
 */
const PeptideDetails = ({ peptide }) => {
  const [activeTab, setActiveTab] = useState('description');

  const availableTabs = TABS.filter(tab => {
    if (tab.id === 'warnings') return peptide.warnings?.length > 0;
    return true;
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="tab-content">
            <p>{peptide.description}</p>
          </div>
        );
      case 'history':
        return (
          <div className="tab-content">
            <p>
              {peptide.name} has been studied since the early {peptide.studies[0]?.year || '2000'}s.
              Research has focused on its therapeutic potential and mechanisms of action in various biological systems.
            </p>
          </div>
        );
      case 'studies':
        return (
          <div className="tab-content">
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
        );
      case 'warnings':
        return (
          <div className="tab-content">
            <ul className="warnings-list">
              {peptide.warnings?.map((warning, idx) => (
                <li key={idx} className="warning-item">
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="peptide-details-content">
      <div className="details-tabs">
        {availableTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderTabContent()}
    </div>
  );
};

export default PeptideDetails;
