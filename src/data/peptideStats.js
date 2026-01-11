// Peptide Stats, 3D Shapes, and Character Selection Data

/**
 * Calculate stats based on peptide use cases
 * Stats categories:
 * - Healing: muscle-recovery, injury-healing, gut-health
 * - Performance: muscle-recovery, weight-loss, fat-loss
 * - Cognitive: cognitive, neuroprotection, anxiety
 * - Longevity: anti-aging, longevity, sleep
 * - Beauty: skin-health, hair-growth, anti-aging
 */

const statMapping = {
  healing: ['muscle-recovery', 'injury-healing', 'gut-health'],
  performance: ['muscle-recovery', 'weight-loss', 'fat-loss', 'flexibility'],
  cognitive: ['cognitive', 'neuroprotection', 'anxiety', 'stress'],
  longevity: ['anti-aging', 'longevity', 'sleep'],
  beauty: ['skin-health', 'hair-growth', 'anti-aging']
};

/**
 * Calculate stats for a peptide based on its use cases
 * @param {Array} useCases - Array of use case IDs
 * @returns {Object} - Stats object with values 0-100
 */
export const calculateStats = (useCases) => {
  const stats = {
    healing: 0,
    performance: 0,
    cognitive: 0,
    longevity: 0,
    beauty: 0
  };

  // Count matches for each stat category
  Object.keys(statMapping).forEach(stat => {
    const matches = useCases.filter(useCase =>
      statMapping[stat].includes(useCase)
    ).length;

    // Convert to 0-100 scale (max 4 matches per category)
    stats[stat] = Math.min((matches / 4) * 100, 100);
  });

  return stats;
};

/**
 * 3D Shape assignments for each peptide
 * Each peptide gets a unique geometric shape
 */
export const SHAPE_ASSIGNMENTS = {
  'bpc-157': {
    shape: 'cube',
    color: '#00ff41', // Healing green
    description: 'Cube - Structure and healing'
  },
  'tb-500': {
    shape: 'octahedron',
    color: '#00d4ff', // Performance cyan
    description: 'Octahedron - Flexibility and multiple pathways'
  },
  'ghk-cu': {
    shape: 'sphere',
    color: '#ff10f0', // Beauty magenta
    description: 'Sphere - Smooth perfection'
  },
  'ipamorelin': {
    shape: 'pyramid',
    color: '#9d00ff', // Growth purple
    description: 'Pyramid - Ascension and growth'
  },
  'cjc-1295': {
    shape: 'helix',
    color: '#00ffff', // DNA cyan
    description: 'Double Helix - DNA and growth signals'
  },
  'melanotan-2': {
    shape: 'star',
    color: '#ffff00', // Radiant yellow
    description: 'Star - Radiance and tanning'
  },
  'selank': {
    shape: 'torus',
    color: '#00d4ff', // Mind flow cyan
    description: 'Torus - Mental flow and cycles'
  },
  'semax': {
    shape: 'crystal',
    color: '#9d00ff', // Mental clarity purple
    description: 'Crystal - Clarity and focus'
  },
  'epitalon': {
    shape: 'dodecahedron',
    color: '#ff00ff', // Longevity magenta
    description: 'Dodecahedron - Complex longevity'
  },
  'dsip': {
    shape: 'crescent',
    color: '#00ffff', // Sleep cyan
    description: 'Crescent - Moon and sleep'
  },
  'pt-141': {
    shape: 'heart',
    color: '#ff00ff', // Passion magenta
    description: 'Heart - Love and passion'
  },
  'aod-9604': {
    shape: 'prism',
    color: '#ffff00', // Transformation yellow
    description: 'Prism - Transformation and light'
  }
};

/**
 * Get complete character data for a peptide
 * @param {Object} peptide - Peptide object from peptides.js
 * @returns {Object} - Complete character selection data
 */
export const getPeptideCharacterData = (peptide) => {
  const shapeData = SHAPE_ASSIGNMENTS[peptide.id] || SHAPE_ASSIGNMENTS['bpc-157'];
  const stats = calculateStats(peptide.useCases);

  return {
    ...peptide,
    shape: shapeData.shape,
    shapeColor: shapeData.color,
    shapeDescription: shapeData.description,
    stats
  };
};

/**
 * Stat category icons and labels
 */
export const STAT_CATEGORIES = {
  healing: {
    label: 'Healing',
    icon: '🩹',
    color: '#00ff41'
  },
  performance: {
    label: 'Performance',
    icon: '⚡',
    color: '#00d4ff'
  },
  cognitive: {
    label: 'Cognitive',
    icon: '🧠',
    color: '#9d00ff'
  },
  longevity: {
    label: 'Longevity',
    icon: '⏳',
    color: '#ff00ff'
  },
  beauty: {
    label: 'Beauty',
    icon: '✨',
    color: '#ff10f0'
  }
};
