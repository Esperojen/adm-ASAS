const fs = require('fs');
let code = fs.readFileSync('src/components/SeatingPlanTab.tsx', 'utf8');

const fitLogic = `  const fitPage = () => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.clientWidth - 32; // padding
      const containerHeight = containerRef.current.clientHeight - 32;
      
      const contentWidth = 900; // Fixed width layout
      const contentHeight = contentRef.current.offsetHeight; // Actual unscaled height

      const scaleX = containerWidth / contentWidth;
      const scaleY = containerHeight / contentHeight;
      
      const scale = Math.min(scaleX, scaleY);
      setZoomLevel(Number(Math.max(0.2, scale).toFixed(2)));
    }
  };`;

// replace old fitPage
let idx1 = code.indexOf('  const fitPage = () => {');
let idx2 = code.indexOf('  useEffect(() => {');
if (idx1 !== -1 && idx2 !== -1) {
    code = code.substring(0, idx1) + fitLogic + "\n\n" + code.substring(idx2);
}

// Adjust the container classes to constrain height and prevent overflow with fitPage
// <div ref={containerRef} className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto">
code = code.replace(
  '<div ref={containerRef} className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto">',
  '<div ref={containerRef} className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto flex justify-center items-start h-[calc(100vh-320px)] min-h-[500px]">'
);

fs.writeFileSync('src/components/SeatingPlanTab.tsx', code);
