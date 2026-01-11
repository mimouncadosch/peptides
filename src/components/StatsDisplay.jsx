import React, { useEffect, useState } from 'react';
import { STAT_CATEGORIES } from '../data/peptideStats';

/**
 * StatsDisplay Component
 * Displays visual stat bars showing peptide effectiveness in different categories
 * Bars animate from 0 to target value on mount
 * @param {Object} stats - Stats object with values 0-100 for each category
 * @param {boolean} compact - If true, shows a more compact layout
 */
const StatsDisplay = ({ stats, compact = false }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter out stats with 0 value for cleaner display
  const displayStats = Object.entries(stats).filter(([_, value]) => value > 0);

  // If no stats to display, show message
  if (displayStats.length === 0) {
    return (
      <div className="stats-display empty">
        <p className="no-stats">No primary stats</p>
      </div>
    );
  }

  return (
    <div className={`stats-display ${compact ? 'compact' : ''}`}>
      {!compact && <h3 className="stats-title">STATS</h3>}
      <div className="stats-bars">
        {displayStats.map(([statKey, value]) => {
          const category = STAT_CATEGORIES[statKey];
          if (!category) return null;

          return (
            <div key={statKey} className="stat-row">
              <div className="stat-header">
                <span className="stat-icon" aria-hidden="true">
                  {category.icon}
                </span>
                <span className="stat-label">{category.label}</span>
                <span className="stat-value">{Math.round(value)}%</span>
              </div>
              <div className="stat-bar-container">
                <div
                  className={`stat-bar-fill ${animated ? 'animated' : ''}`}
                  style={{
                    width: animated ? `${value}%` : '0%',
                    backgroundColor: category.color,
                    boxShadow: animated ? `0 0 10px ${category.color}` : 'none'
                  }}
                  role="progressbar"
                  aria-valuenow={value}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${category.label} stat: ${Math.round(value)}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsDisplay;
