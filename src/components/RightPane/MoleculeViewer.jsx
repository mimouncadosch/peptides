import React, { useEffect, useRef, useState } from 'react';
import { getMolecularStructure } from '../../data/molecularStructures';

/**
 * MoleculeViewer Component - 3D molecular visualization with 3Dmol.js
 */
const MoleculeViewer = ({ peptideId }) => {
  const viewerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const molecularData = getMolecularStructure(peptideId);

  useEffect(() => {
    if (!viewerRef.current || !molecularData) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Dynamically import 3Dmol to avoid SSR issues
    const load3DMol = async () => {
      try {
        const $3Dmol = (await import('3dmol')).default;

        // Clear previous viewer
        viewerRef.current.innerHTML = '';

        // Create viewer
        const config = {
          backgroundColor: molecularData.visualization.backgroundColor
        };
        const viewer = $3Dmol.createViewer(viewerRef.current, config);

        // For now, create a simple placeholder representation
        // In future, we can add real PDB data or generate from sequence
        const atomCount = molecularData.sequence.length;

        // Create a simple chain representation
        for (let i = 0; i < atomCount; i++) {
          viewer.addSphere({
            center: { x: i * 3 - atomCount * 1.5, y: Math.sin(i * 0.5) * 2, z: 0 },
            radius: 1.0,
            color: getColorForPosition(i, atomCount)
          });

          // Add bonds between adjacent atoms
          if (i < atomCount - 1) {
            viewer.addCylinder({
              start: { x: i * 3 - atomCount * 1.5, y: Math.sin(i * 0.5) * 2, z: 0 },
              end: { x: (i + 1) * 3 - atomCount * 1.5, y: Math.sin((i + 1) * 0.5) * 2, z: 0 },
              radius: 0.3,
              color: '#00ffff'
            });
          }
        }

        viewer.zoomTo();
        viewer.render();
        viewer.rotate(45, 'y');
        viewer.render();

        // Add rotation animation
        let frame = 0;
        const animate = () => {
          viewer.rotate(1, 'y');
          viewer.render();
          frame = requestAnimationFrame(animate);
        };
        animate();

        setLoading(false);

        // Cleanup
        return () => {
          cancelAnimationFrame(frame);
        };
      } catch (err) {
        console.error('Failed to load 3Dmol:', err);
        setError('Failed to load molecular viewer');
        setLoading(false);
      }
    };

    load3DMol();
  }, [peptideId, molecularData]);

  const getColorForPosition = (position, total) => {
    const ratio = position / total;
    if (ratio < 0.33) return '#00ffff'; // Cyan
    if (ratio < 0.66) return '#ff00ff'; // Magenta
    return '#9d00ff'; // Purple
  };

  if (!molecularData) {
    return (
      <div className="molecule-viewer-container">
        <div className="molecule-viewer-loading">
          <p>No molecular data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="molecule-viewer-section">
      <div className="molecule-viewer-container">
        <div ref={viewerRef} className="molecule-viewer" />
        {loading && (
          <div className="molecule-viewer-loading">
            <div className="molecule-viewer-loading-spinner" />
            <p>Loading Structure...</p>
          </div>
        )}
        {error && (
          <div className="molecule-viewer-loading">
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="molecule-info">
        <div className="molecule-info-item">
          <span className="molecule-info-label">Formula</span>
          <span className="molecule-info-value">{molecularData.molecularFormula}</span>
        </div>
        <div className="molecule-info-item">
          <span className="molecule-info-label">Weight</span>
          <span className="molecule-info-value">{molecularData.molecularWeight} g/mol</span>
        </div>
        <div className="molecule-info-item">
          <span className="molecule-info-label">Sequence</span>
          <span className="molecule-info-value">{molecularData.sequence}</span>
        </div>
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--neon-purple)',
        opacity: 0.7,
        marginTop: 'var(--spacing-sm)'
      }}>
        {molecularData.note}
      </p>
    </div>
  );
};

export default MoleculeViewer;
