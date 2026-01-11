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
  // State
  const [selectedPeptide, setSelectedPeptide] = useState(PEPTIDES[0]); // Default to first
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and search peptides
  const filteredPeptides = useMemo(() => {
    let result = PEPTIDES;

    // Apply use case filters
    if (activeFilters.length > 0) {
      result = result.filter(peptide =>
        peptide.useCases.some(useCase => activeFilters.includes(useCase))
      );
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(peptide =>
        peptide.name.toLowerCase().includes(query) ||
        peptide.fullName.toLowerCase().includes(query) ||
        peptide.description.toLowerCase().includes(query)
      );
    }

    // Apply sort
    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        const statusOrder = { 'approved': 0, 'clinical-trials': 1, 'unapproved': 2 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, activeFilters, sortBy, sortOrder]);

  // Handle sort order toggle
  const handleOrderChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortBy}
            onOrderChange={handleOrderChange}
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
