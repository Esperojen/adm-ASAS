const fs = require('fs');
let code = fs.readFileSync('src/components/SeatingPlanTab.tsx', 'utf8');

// 1. Add useRef, useEffect
code = code.replace("import React, { useState } from 'react';", "import React, { useState, useRef, useEffect } from 'react';");

// 2. Add Maximize icon
code = code.replace("ZoomOut\n}", "ZoomOut,\n  Maximize\n}");

// 3. Add refs and fitPage logic
const stateInsertion = `  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const fitPage = () => {
    if (containerRef.current && contentRef.current) {
      // The content width is the width of the grid before scaling
      // Actually, since min-w-max is used, let's just assume a typical width for 4 pairs of desks + aisles
      // Typically it's about 800-1000px.
      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = 900; // approximate width of the inner content
      if (containerWidth < contentWidth) {
        setZoomLevel(Number(Math.max(0.3, (containerWidth - 32) / contentWidth).toFixed(2)));
      } else {
        setZoomLevel(1);
      }
    }
  };

  useEffect(() => {
    // Initial fit
    fitPage();
    window.addEventListener('resize', fitPage);
    return () => window.removeEventListener('resize', fitPage);
  }, [activeRoom]);
`;
code = code.replace("  const [zoomLevel, setZoomLevel] = useState(1);", stateInsertion);

// 4. Update the container to have refs
code = code.replace(
  '<div className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto">',
  '<div ref={containerRef} className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto">'
);

code = code.replace(
  '<div style={{ transform: `scale(${zoomLevel})`, transformOrigin: \'top center\', transition: \'transform 0.2s ease\' }} className="min-w-max pb-12">',
  '<div ref={contentRef} style={{ transform: `scale(${zoomLevel})`, transformOrigin: \'top center\', transition: \'transform 0.2s ease\' }} className="min-w-max pb-12 w-[900px] mx-auto">'
);

// 5. Add a Fit Page button to the controls
const controlsOriginal = `            <button onClick={() => setZoomLevel(z => Math.max(0.3, z - 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold w-12 text-center text-slate-700">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => setZoomLevel(z => Math.min(2.0, z + 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>`;
const controlsNew = `            <button onClick={fitPage} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Fit Layout">
              <Maximize className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button onClick={() => setZoomLevel(z => Math.max(0.3, z - 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold w-12 text-center text-slate-700">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => setZoomLevel(z => Math.min(2.0, z + 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>`;
code = code.replace(controlsOriginal, controlsNew);

fs.writeFileSync('src/components/SeatingPlanTab.tsx', code);
