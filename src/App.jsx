import { useState, useMemo } from 'react';
import GridBackground from './components/GridBackground';
import ScanlineOverlay from './components/ScanlineOverlay';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PeptideGrid from './components/PeptideGrid';
import { PEPTIDES } from './data/peptides';
import './styles/retro.css';
import './styles/animations.css';
import './styles/index.css';

/**
 * Main App Component
 * Orchestrates the entire peptides database application
 * with filtering, visual effects, and responsive layout
 */
function App() {
  const [activeFilters, setActiveFilters] = useState([]);

  // Filter peptides based on active use case filters
  // A peptide matches if it has ANY of the selected use cases
  const filteredPeptides = useMemo(() => {
    if (activeFilters.length === 0) {
      return PEPTIDES;
    }

    return PEPTIDES.filter(peptide =>
      peptide.useCases.some(useCase => activeFilters.includes(useCase))
    );
  }, [activeFilters]);

  return (
    <>
      {/* Fixed background layers */}
      <GridBackground />
      <ScanlineOverlay />

      {/* Main content */}
      <div className="app-container">
        <Header />

        <FilterBar
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />

        <PeptideGrid peptides={filteredPeptides} />

        {/* Footer info */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          marginTop: '3rem',
          color: 'var(--neon-purple)',
          opacity: 0.6,
          fontSize: '0.85rem',
          fontFamily: 'VT323, monospace'
        }}>
          <p>
            &gt; {filteredPeptides.length} PEPTIDE{filteredPeptides.length !== 1 ? 'S' : ''} DISPLAYED
            • {activeFilters.length} FILTER{activeFilters.length !== 1 ? 'S' : ''} ACTIVE_
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY • CONSULT MEDICAL PROFESSIONALS
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
