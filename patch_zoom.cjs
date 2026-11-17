const fs = require('fs');

function patchSeatingPlan() {
    let code = fs.readFileSync('src/components/SeatingPlanTab.tsx', 'utf8');

    // Remove auto fitPage
    let useEffectRegex = /useEffect\(\(\) => \{\n\s*\/\/\s*Initial fit\n\s*fitPage\(\);\n\s*window\.addEventListener\('resize', fitPage\);\n\s*return \(\) => window\.removeEventListener\('resize', fitPage\);\n\s*\}, \[activeRoom\]\);/g;
    code = code.replace(useEffectRegex, `useEffect(() => {
    // Zoom default 95%
    setZoomLevel(0.95);
  }, [activeRoom]);`);

    // Add handleZoomInput function
    const inputHandler = `  const handleZoomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setZoomLevel(val / 100);
    }
  };`;
    
    code = code.replace('const fitPage = () => {', inputHandler + '\n\n  const fitPage = () => {');

    // Replace Zoom Controls
    const oldControls = `<button onClick={() => setZoomLevel(z => Math.max(0.3, z - 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold w-12 text-center text-slate-700">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => setZoomLevel(z => Math.min(2.0, z + 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>`;
    
    const newControls = `<button onClick={() => setZoomLevel(z => Math.max(0.1, z - 0.05))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom Out (-5%)">
              <ZoomOut className="w-4 h-4" />
            </button>
            <input 
              type="number" 
              value={Math.round(zoomLevel * 100)} 
              onChange={handleZoomInput}
              className="w-14 text-center text-xs font-bold text-slate-700 bg-transparent border border-slate-200 rounded py-0.5 focus:outline-none focus:ring-1 focus:ring-teal-500 hide-arrows"
              title="Ketik zoom (1-300)"
            />
            <span className="text-xs font-bold text-slate-500 -ml-2">%</span>
            <button onClick={() => setZoomLevel(z => Math.min(3.0, z + 0.05))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition-colors" title="Zoom In (+5%)">
              <ZoomIn className="w-4 h-4" />
            </button>`;
            
    code = code.replace(oldControls, newControls);
    
    // Default zoom state
    code = code.replace('const [zoomLevel, setZoomLevel] = useState(1);', 'const [zoomLevel, setZoomLevel] = useState(0.95);');

    fs.writeFileSync('src/components/SeatingPlanTab.tsx', code);
}

function patchPdfViewer() {
    let code = fs.readFileSync('src/components/PdfViewer.tsx', 'utf8');

    // Add handleZoomInput function
    const inputHandler = `  const handleZoomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setScale(val / 100);
    }
  };`;
    code = code.replace('const fitWidth = () => {', inputHandler + '\n\n  const fitWidth = () => {');

    // Remove auto fitPage
    code = code.replace('setTimeout(fitPage, 100);', 'setScale(0.95);');

    // Replace Zoom Controls
    const oldControls = `<button 
            onClick={() => setScale(s => Math.max(0.3, s - 0.2))} 
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold w-12 text-center text-slate-700 select-none">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={() => setScale(s => Math.min(3.0, s + 0.2))} 
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>`;
          
    const newControls = `<button 
            onClick={() => setScale(s => Math.max(0.1, s - 0.05))} 
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Zoom Out (-5%)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <input 
            type="number" 
            value={Math.round(scale * 100)} 
            onChange={handleZoomInput}
            className="w-14 text-center text-xs font-bold text-slate-700 bg-transparent border border-slate-300 rounded py-0.5 focus:outline-none focus:ring-1 focus:ring-teal-500 hide-arrows"
            title="Ketik zoom"
          />
          <span className="text-xs font-bold text-slate-500 -ml-2">%</span>
          <button 
            onClick={() => setScale(s => Math.min(3.0, s + 0.05))} 
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Zoom In (+5%)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>`;
          
    code = code.replace(oldControls, newControls);
    
    // Default scale state
    code = code.replace('const [scale, setScale] = useState<number>(1.0);', 'const [scale, setScale] = useState<number>(0.95);');

    fs.writeFileSync('src/components/PdfViewer.tsx', code);
}

patchSeatingPlan();
patchPdfViewer();

