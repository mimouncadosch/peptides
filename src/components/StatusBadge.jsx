import React from 'react';
import { STATUS_CONFIG } from '../data/peptides';

/**
 * StatusBadge Component
 * Displays approval status with color-coded neon styling
 * @param {string} status - One of: 'approved', 'clinical-trials', 'unapproved'
 */
const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  return (
    <span
      className={`status-badge ${status}`}
      title={config.description}
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
