import React from 'react';

/**
 * Peptide3DShape Component
 * Renders a rotating 3D geometric shape using pure CSS 3D transforms
 * Each shape is unique to its peptide
 * @param {string} shape - Shape type (cube, sphere, pyramid, etc.)
 * @param {string} color - Wireframe color (hex)
 * @param {boolean} selected - If true, rotates faster
 * @param {string} peptideName - Name for accessibility
 */
const Peptide3DShape = ({ shape, color, selected, peptideName }) => {
  const renderShape = () => {
    switch (shape) {
      case 'cube':
        return <CubeShape color={color} />;
      case 'sphere':
        return <SphereShape color={color} />;
      case 'pyramid':
        return <PyramidShape color={color} />;
      case 'octahedron':
        return <OctahedronShape color={color} />;
      case 'helix':
        return <HelixShape color={color} />;
      case 'star':
        return <StarShape color={color} />;
      case 'torus':
        return <TorusShape color={color} />;
      case 'crystal':
        return <CrystalShape color={color} />;
      case 'dodecahedron':
        return <DodecahedronShape color={color} />;
      case 'crescent':
        return <CrescentShape color={color} />;
      case 'heart':
        return <HeartShape color={color} />;
      case 'prism':
        return <PrismShape color={color} />;
      default:
        return <CubeShape color={color} />;
    }
  };

  return (
    <div
      className={`shape-container ${selected ? 'selected' : ''}`}
      role="img"
      aria-label={`3D ${shape} shape for ${peptideName}`}
    >
      {renderShape()}
    </div>
  );
};

// Individual shape components

const CubeShape = ({ color }) => (
  <div className="shape-3d shape-cube">
    <div className="cube-face front" style={{ borderColor: color }} />
    <div className="cube-face back" style={{ borderColor: color }} />
    <div className="cube-face right" style={{ borderColor: color }} />
    <div className="cube-face left" style={{ borderColor: color }} />
    <div className="cube-face top" style={{ borderColor: color }} />
    <div className="cube-face bottom" style={{ borderColor: color }} />
  </div>
);

const SphereShape = ({ color }) => (
  <div className="shape-3d shape-sphere">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="sphere-ring"
        style={{
          borderColor: color,
          transform: `rotateY(${i * 22.5}deg) translateZ(0)`
        }}
      />
    ))}
  </div>
);

const PyramidShape = ({ color }) => (
  <div className="shape-3d shape-pyramid">
    <div className="pyramid-face front" style={{ borderColor: color }} />
    <div className="pyramid-face right" style={{ borderColor: color }} />
    <div className="pyramid-face back" style={{ borderColor: color }} />
    <div className="pyramid-face left" style={{ borderColor: color }} />
    <div className="pyramid-face base" style={{ borderColor: color }} />
  </div>
);

const OctahedronShape = ({ color }) => (
  <div className="shape-3d shape-octahedron">
    <div className="octahedron-pyramid top">
      <div className="pyramid-face front" style={{ borderColor: color }} />
      <div className="pyramid-face right" style={{ borderColor: color }} />
      <div className="pyramid-face back" style={{ borderColor: color }} />
      <div className="pyramid-face left" style={{ borderColor: color }} />
    </div>
    <div className="octahedron-pyramid bottom">
      <div className="pyramid-face front" style={{ borderColor: color }} />
      <div className="pyramid-face right" style={{ borderColor: color }} />
      <div className="pyramid-face back" style={{ borderColor: color }} />
      <div className="pyramid-face left" style={{ borderColor: color }} />
    </div>
  </div>
);

const HelixShape = ({ color }) => (
  <div className="shape-3d shape-helix">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="helix-segment"
        style={{
          borderColor: color,
          transform: `rotateY(${i * 30}deg) translateX(30px) translateZ(${i * 8 - 48}px)`
        }}
      />
    ))}
  </div>
);

const StarShape = ({ color }) => (
  <div className="shape-3d shape-star">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="star-point"
        style={{
          borderColor: color,
          transform: `rotateZ(${i * 72}deg) translateY(-40px)`
        }}
      />
    ))}
  </div>
);

const TorusShape = ({ color }) => (
  <div className="shape-3d shape-torus">
    {[...Array(16)].map((_, i) => (
      <div
        key={i}
        className="torus-segment"
        style={{
          borderColor: color,
          transform: `rotateY(${i * 22.5}deg) translateZ(40px)`
        }}
      />
    ))}
  </div>
);

const CrystalShape = ({ color }) => (
  <div className="shape-3d shape-crystal">
    <div className="crystal-top">
      <div className="pyramid-face front" style={{ borderColor: color }} />
      <div className="pyramid-face right" style={{ borderColor: color }} />
      <div className="pyramid-face back" style={{ borderColor: color }} />
      <div className="pyramid-face left" style={{ borderColor: color }} />
    </div>
    <div className="crystal-middle" style={{ borderColor: color }} />
    <div className="crystal-bottom">
      <div className="pyramid-face front" style={{ borderColor: color }} />
      <div className="pyramid-face right" style={{ borderColor: color }} />
      <div className="pyramid-face back" style={{ borderColor: color }} />
      <div className="pyramid-face left" style={{ borderColor: color }} />
    </div>
  </div>
);

const DodecahedronShape = ({ color }) => (
  <div className="shape-3d shape-dodecahedron">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="dodecahedron-face"
        style={{
          borderColor: color,
          transform: `rotateY(${i * 30}deg) rotateX(${(i % 3) * 60}deg) translateZ(45px)`
        }}
      />
    ))}
  </div>
);

const CrescentShape = ({ color }) => (
  <div className="shape-3d shape-crescent">
    <div className="crescent-outer" style={{ borderColor: color }} />
    <div className="crescent-inner" style={{ borderColor: color }} />
  </div>
);

const HeartShape = ({ color }) => (
  <div className="shape-3d shape-heart">
    <div className="heart-left" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
    <div className="heart-right" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
    <div className="heart-bottom" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
  </div>
);

const PrismShape = ({ color }) => (
  <div className="shape-3d shape-prism">
    <div className="prism-face front" style={{ borderColor: color }} />
    <div className="prism-face back" style={{ borderColor: color }} />
    <div className="prism-face right" style={{ borderColor: color }} />
    <div className="prism-face left" style={{ borderColor: color }} />
    <div className="prism-face top" style={{ borderColor: color }} />
    <div className="prism-face bottom" style={{ borderColor: color }} />
  </div>
);

export default Peptide3DShape;
