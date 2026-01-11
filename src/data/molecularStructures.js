// Molecular Structure Data for Peptides
// Amino acid sequences and PubChem identifiers for 2D structure visualization

/**
 * Peptide molecular structures with amino acid sequences and PubChem CIDs
 * 2D molecular structures are fetched from the PubChem database
 */

export const PEPTIDE_STRUCTURES = {
  'bpc-157': {
    name: 'BPC-157',
    sequence: 'GEPPPGKPADDAGLV',
    molecularFormula: 'C62H98N16O22',
    molecularWeight: 1419.53,
    pubchemCID: 9941957,
    structure: 'peptide',
    note: 'Pentadecapeptide from gastric juice'
  },

  'tb-500': {
    name: 'TB-500',
    sequence: 'LKKTETQEKNPLPSKETIEQEKQAGES',
    molecularFormula: 'C212H350N56O78S',
    molecularWeight: 4963.44,
    pubchemCID: 16132341,
    structure: 'peptide',
    note: 'Thymosin Beta-4'
  },

  'ghk-cu': {
    name: 'GHK-Cu',
    sequence: 'GHK',
    molecularFormula: 'C14H24CuN6O4',
    molecularWeight: 404.93,
    pubchemCID: 378611,
    structure: 'peptide',
    note: 'Copper peptide complex'
  },

  'ipamorelin': {
    name: 'Ipamorelin',
    sequence: 'Aib-His-D-2-Nal-D-Phe-Lys-NH2',
    molecularFormula: 'C38H49N9O5',
    molecularWeight: 711.85,
    pubchemCID: 9831659,
    structure: 'peptide',
    note: 'Synthetic growth hormone secretagogue'
  },

  'cjc-1295': {
    name: 'CJC-1295',
    sequence: 'YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL',
    molecularFormula: 'C152H252N44O42',
    molecularWeight: 3367.97,
    pubchemCID: 91976842,
    structure: 'peptide',
    note: 'Modified GRF 1-29'
  },

  'melanotan-2': {
    name: 'Melanotan II',
    sequence: 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-NH2',
    molecularFormula: 'C50H69N15O9',
    molecularWeight: 1024.18,
    pubchemCID: 92432,
    structure: 'cyclic-peptide',
    note: 'Cyclic melanocortin analog'
  },

  'selank': {
    name: 'Selank',
    sequence: 'TKPRPGP',
    molecularFormula: 'C33H57N11O9',
    molecularWeight: 751.88,
    pubchemCID: 11765600,
    structure: 'peptide',
    note: 'Synthetic tuftsin analog'
  },

  'semax': {
    name: 'Semax',
    sequence: 'MEHFPGP',
    molecularFormula: 'C37H51N9O10S',
    molecularWeight: 813.92,
    pubchemCID: 9811102,
    structure: 'peptide',
    note: 'ACTH 4-10 analog'
  },

  'epitalon': {
    name: 'Epitalon',
    sequence: 'AEDG',
    molecularFormula: 'C14H22N4O9',
    molecularWeight: 390.35,
    pubchemCID: 219042,
    structure: 'peptide',
    note: 'Synthetic tetrapeptide'
  },

  'dsip': {
    name: 'DSIP',
    sequence: 'WAGGDASGE',
    molecularFormula: 'C35H48N10O15',
    molecularWeight: 848.81,
    pubchemCID: 68816,
    structure: 'peptide',
    note: 'Delta sleep-inducing peptide'
  },

  'pt-141': {
    name: 'PT-141',
    sequence: 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-OH',
    molecularFormula: 'C50H68N14O10',
    molecularWeight: 1025.17,
    pubchemCID: 9941379,
    structure: 'cyclic-peptide',
    note: 'Bremelanotide'
  },

  'aod-9604': {
    name: 'AOD-9604',
    sequence: 'YLRIVQCRSVEGSCGF',
    molecularFormula: 'C78H123N23O23S2',
    molecularWeight: 1815.08,
    pubchemCID: 71300630,
    structure: 'peptide',
    note: 'HGH fragment 176-191'
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
