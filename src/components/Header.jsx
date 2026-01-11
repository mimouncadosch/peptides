import React from 'react';

/**
 * Header Component
 * Displays the app title and tagline with retro-futuristic styling
 */
const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">CHINESE PEPTIDES</h1>
      <p className="app-subtitle">生物肽数据库 • BIOHACKING DATABASE</p>
      <p className="app-tagline">
        &gt; SYSTEM ONLINE • PEPTIDE ARCHIVE ACCESSED_
      </p>
    </header>
  );
};

export default Header;
