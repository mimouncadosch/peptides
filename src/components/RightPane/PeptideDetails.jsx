import React, { useState } from 'react';
import { TESTING_LABS } from '../../data/peptides';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'mechanism', label: 'Mechanism' },
  { id: 'studies', label: 'Studies' },
  { id: 'resellers', label: 'Resellers' },
  { id: 'testing-labs', label: 'Testing Labs' },
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
      case 'mechanism':
        return (
          <div className="tab-content">
            <p>{peptide.mechanism || 'Mechanism of action data not available.'}</p>
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
      case 'resellers':
        return (
          <div className="tab-content">
            <table className="resellers-table">
              <thead>
                <tr>
                  <th>Reseller</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {peptide.resellers?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.reseller}</td>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reseller-link"
                      >
                        Buy
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'testing-labs':
        return (
          <div className="tab-content">
            <ul className="testing-labs-list">
              {TESTING_LABS.map((lab, idx) => (
                <li key={idx} className="testing-lab-item">
                  <a
                    href={lab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="testing-lab-link"
                  >
                    {lab.name}
                  </a>
                  {lab.location && (
                    <span className="testing-lab-location">{lab.location}</span>
                  )}
                  {lab.services && (
                    <p className="testing-lab-services">{lab.services}</p>
                  )}
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
