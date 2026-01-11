# 🌙 Chinese Peptides Database

A retro-futuristic web application showcasing Chinese wellness peptides with an authentic 80s cyberpunk aesthetic. Built with React and featuring neon colors, grid backgrounds, CRT scanlines, and comprehensive peptide information.

![80s Aesthetic](https://img.shields.io/badge/aesthetic-80s%20retro-ff00ff?style=for-the-badge)
![React](https://img.shields.io/badge/react-18.3.1-00ffff?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/vite-7.3.1-9d00ff?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 80s Retro-Futuristic Design
- **Neon color scheme** - Cyan, magenta, purple with glow effects
- **Grid backgrounds** - Tron-style perspective grids
- **Scanline effects** - CRT monitor aesthetic with subtle flicker
- **Retro typography** - Orbitron, Share Tech Mono, and VT323 fonts

### 📚 Comprehensive Peptide Database
- **12+ peptides** with detailed information
- **Real PubMed studies** linked for each peptide
- **Chinese market context** - Sourcing, popularity, and quality notes
- **Approval status** - FDA approved, clinical trials, or research only
- **Use case filtering** - Find peptides by goal (sleep, weight loss, etc.)

### 🔍 Interactive Features
- **Multi-select filtering** - Filter by multiple use cases simultaneously
- **Expandable cards** - Show more/less information on demand
- **Responsive design** - Works on desktop, tablet, and mobile
- **Accessibility** - Keyboard navigation and ARIA labels

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd peptides
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
peptides/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # App title and branding
│   │   ├── FilterBar.jsx           # Use case filter buttons
│   │   ├── PeptideGrid.jsx         # Responsive grid layout
│   │   ├── PeptideCard.jsx         # Individual peptide display
│   │   ├── StatusBadge.jsx         # Approval status indicator
│   │   ├── GridBackground.jsx      # Tron-style grid effect
│   │   └── ScanlineOverlay.jsx     # CRT scanline effect
│   ├── data/
│   │   └── peptides.js             # Peptide database
│   ├── styles/
│   │   ├── retro.css               # 80s aesthetic styles
│   │   ├── animations.css          # Keyframe animations
│   │   └── index.css               # Layout and components
│   ├── App.jsx                      # Main application
│   └── main.jsx                     # React entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies
└── vite.config.js                   # Vite configuration
```

## 🧬 Peptides Included

1. **BPC-157** - Healing, muscle recovery, gut health
2. **TB-500** - Tissue repair, flexibility
3. **GHK-Cu** - Skin health, hair growth, anti-aging ✅ *FDA Approved*
4. **Ipamorelin** - Growth hormone, sleep
5. **CJC-1295** - Muscle recovery, weight loss
6. **Melanotan II** - Weight loss, tanning ⚠️ *Not approved*
7. **Selank** - Cognitive enhancement, anxiety
8. **Semax** - Cognitive enhancement, neuroprotection
9. **Epitalon** - Longevity, sleep, anti-aging
10. **DSIP** - Deep sleep improvement
11. **PT-141** - Libido enhancement ✅ *FDA Approved*
12. **AOD-9604** - Fat loss, metabolism ⚠️ *Not approved*

## 🎯 Use Cases / Filters

- 🌙 Sleep
- ⚖️ Weight Loss
- 💇 Hair Growth
- 💪 Muscle Recovery
- ✨ Anti-Aging
- 🧴 Skin Health
- 🧠 Cognitive
- 🩹 Injury Healing
- 🫃 Gut Health
- 🤸 Flexibility
- 😌 Anxiety
- 🛡️ Neuroprotection
- ⏳ Longevity
- 🧘 Stress
- ❤️ Libido
- 💕 Sexual Health
- 🔥 Fat Loss

## 🎨 Customization

### Adding New Peptides

Edit `src/data/peptides.js` and add your peptide object:

```javascript
{
  id: 'new-peptide',
  name: 'Peptide Name',
  fullName: 'Full Chemical Name',
  status: 'clinical-trials', // 'approved' | 'unapproved' | 'clinical-trials'
  description: 'Detailed description...',
  useCases: ['sleep', 'cognitive'],
  chineseContext: {
    sourcing: 'Information about Chinese manufacturing...',
    popularity: 'Usage in communities...',
    notes: 'Important notes...'
  },
  studies: [
    {
      title: 'Study Title',
      url: 'https://pubmed.ncbi.nlm.nih.gov/...',
      year: 2024,
      summary: 'Study findings...'
    }
  ],
  dosage: 'Recommended dosage...',
  sideEffects: 'Known side effects...'
}
```

### Modifying Colors

Edit `src/styles/retro.css` to change the neon color scheme:

```css
:root {
  --neon-cyan: #00ffff;
  --neon-magenta: #ff00ff;
  --neon-purple: #9d00ff;
  /* Add your custom colors */
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import repository in Vercel
3. Deploy (zero configuration needed)

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy

### GitHub Pages
1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json:
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## ⚠️ Disclaimer

**FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY**

This application provides information about peptides used in biohacking and wellness communities. The information presented:
- Is NOT medical advice
- Should NOT replace consultation with healthcare professionals
- May include peptides not approved for human use
- References ongoing research and clinical trials

Always consult qualified medical professionals before using any peptides or supplements.

## 🔧 Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 7.3.1
- **Styling:** Pure CSS (no frameworks)
- **Fonts:** Google Fonts (Orbitron, Share Tech Mono, VT323)
- **Deployment:** Static hosting (Vercel, Netlify, GitHub Pages)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Add new peptides with verified information
- Improve the UI/UX
- Fix bugs or issues
- Enhance documentation

## 🌟 Acknowledgments

- Peptide data sourced from PubMed and scientific literature
- 80s aesthetic inspired by Tron, cyberpunk, and retro computing
- Built for the biohacking and longevity community

---

**Made with 💜 in the retro-futuristic style of the 1980s**

> SYSTEM ONLINE • PEPTIDE ARCHIVE ACCESSED_
