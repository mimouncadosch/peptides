import { useState, useMemo } from 'react';
import GridBackground from './components/GridBackground';
import ScanlineOverlay from './components/ScanlineOverlay';
import Header from './components/Header';
import LeftPane from './components/LeftPane/LeftPane';
import RightPane from './components/RightPane/RightPane';
import { PEPTIDES } from './data/peptides';
import './styles/retro.css';
import './styles/animations.css';
import './styles/index.css';
import './styles/two-pane-layout.css';
import './styles/left-pane.css';
import './styles/right-pane.css';

/**
 * Main App Component - Two-Pane Pokedex Layout
 * Left pane: Searchable/filterable list of peptides
 * Right pane: Detailed view with 3D molecule
 */
function App() {
  const [selectedPeptide, setSelectedPeptide] = useState(PEPTIDES[0]);
  const [activeFilters, setActiveFilters] = useState([]);

  // Filter peptides by use case
  const filteredPeptides = useMemo(() => {
    if (activeFilters.length === 0) return PEPTIDES;
    return PEPTIDES.filter(peptide =>
      peptide.useCases.some(useCase => activeFilters.includes(useCase))
    );
  }, [activeFilters]);

  return (
    <>
      {/* Fixed background layers */}
      <GridBackground />
      <ScanlineOverlay />

      {/* Main container */}
      <div className="app-container two-pane">
        {/* Compact Header */}
        <header className="app-header-compact">
          <h1 className="app-title">CHINESE PEPTIDES</h1>
          <p className="app-subtitle">生物肽数据库 • BIOHACKING DATABASE</p>
        </header>

        {/* Two-pane content */}
        <div className="app-content">
          {/* Left Pane - List */}
          <LeftPane
            peptides={filteredPeptides}
            selectedPeptide={selectedPeptide}
            onSelectPeptide={setSelectedPeptide}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />

          {/* Right Pane - Detail View */}
          <RightPane peptide={selectedPeptide} />
        </div>
      </div>
    </>
  );
}

export default App;
