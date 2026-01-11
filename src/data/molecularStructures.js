// Molecular Structure Data for Peptides
// Amino acid sequences and visualization settings for 3Dmol.js

/**
 * Peptide molecular structures with amino acid sequences
 * These sequences will be used to generate 3D structures with 3Dmol.js
 */

export const PEPTIDE_STRUCTURES = {
  'bpc-157': {
    name: 'BPC-157',
    sequence: 'GEPPPGKPADDAGLV',
    molecularFormula: 'C62H98N16O22',
    molecularWeight: 1419.53,
    structure: 'peptide', // Type of structure
    visualization: {
      style: 'stick',
      colorScheme: 'cyanCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Structure generated from sequence'
  },

  'tb-500': {
    name: 'TB-500',
    sequence: 'LKKTETQEKNPLPSKETIEQEKQAGES',
    molecularFormula: 'C212H350N56O78S',
    molecularWeight: 4963.44,
    structure: 'peptide',
    visualization: {
      style: 'cartoon',
      colorScheme: 'spectrum',
      backgroundColor: '#0a0a0a'
    },
    note: 'Thymosin Beta-4 fragment'
  },

  'ghk-cu': {
    name: 'GHK-Cu',
    sequence: 'GHK',
    molecularFormula: 'C14H24CuN6O4',
    molecularWeight: 404.93,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'magentaCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Copper peptide complex'
  },

  'ipamorelin': {
    name: 'Ipamorelin',
    sequence: 'Aib-His-D-2-Nal-D-Phe-Lys-NH2',
    molecularFormula: 'C38H49N9O5',
    molecularWeight: 711.85,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'purpleCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Synthetic growth hormone secretagogue'
  },

  'cjc-1295': {
    name: 'CJC-1295',
    sequence: 'YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL',
    molecularFormula: 'C152H252N44O42',
    molecularWeight: 3367.97,
    structure: 'peptide',
    visualization: {
      style: 'cartoon',
      colorScheme: 'cyanCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Modified growth hormone releasing hormone'
  },

  'melanotan-2': {
    name: 'Melanotan II',
    sequence: 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-NH2',
    molecularFormula: 'C50H69N15O9',
    molecularWeight: 1024.18,
    structure: 'cyclic-peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'yellowCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Cyclic synthetic melanocortin analog'
  },

  'selank': {
    name: 'Selank',
    sequence: 'TKPRPGP',
    molecularFormula: 'C33H57N11O9',
    molecularWeight: 751.88,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'cyanCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Synthetic derivative of tuftsin'
  },

  'semax': {
    name: 'Semax',
    sequence: 'MEHFPGP',
    molecularFormula: 'C37H51N9O10S',
    molecularWeight: 813.92,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'purpleCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'ACTH 4-10 analog'
  },

  'epitalon': {
    name: 'Epitalon',
    sequence: 'AEDG',
    molecularFormula: 'C14H22N4O9',
    molecularWeight: 390.35,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'magentaCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Synthetic tetrapeptide'
  },

  'dsip': {
    name: 'DSIP',
    sequence: 'WAGGDASGE',
    molecularFormula: 'C35H48N10O15',
    molecularWeight: 848.81,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'cyanCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Delta sleep-inducing peptide'
  },

  'pt-141': {
    name: 'PT-141',
    sequence: 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-OH',
    molecularFormula: 'C50H68N14O10',
    molecularWeight: 1025.17,
    structure: 'cyclic-peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'magentaCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Bremelanotide - melanocortin receptor agonist'
  },

  'aod-9604': {
    name: 'AOD-9604',
    sequence: 'YLRIVQCRSVEGSCGF',
    molecularFormula: 'C78H123N23O23S2',
    molecularWeight: 1815.08,
    structure: 'peptide',
    visualization: {
      style: 'stick',
      colorScheme: 'yellowCarbon',
      backgroundColor: '#0a0a0a'
    },
    note: 'Modified fragment of human growth hormone'
  }
};

/**
 * Get molecular structure data for a peptide
 * @param {string} peptideId - The peptide ID
 * @returns {Object|null} Molecular structure data
 */
export const getMolecularStructure = (peptideId) => {
  return PEPTIDE_STRUCTURES[peptideId] || null;
};

/**
 * Generate PDB format from amino acid sequence (simplified)
 * This is a placeholder - 3Dmol.js can handle sequences directly
 * @param {string} sequence - Amino acid sequence
 * @returns {string} Simple PDB-like format
 */
export const generatePDBFromSequence = (sequence) => {
  // 3Dmol.js can generate structures from sequences
  // This function is a placeholder for future enhancement
  return sequence;
};

/**
 * Color schemes for different peptide types
 */
export const COLOR_SCHEMES = {
  healing: 'greenCarbon',
  performance: 'cyanCarbon',
  cognitive: 'purpleCarbon',
  beauty: 'magentaCarbon',
  longevity: 'orangeCarbon'
};
