const fs = require('fs');
let code = fs.readFileSync('src/components/SeatingPlanTab.tsx', 'utf8');

code = code.replace(
  '<div ref={containerRef} className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto flex justify-center items-start h-[calc(100vh-320px)] min-h-[500px]">',
  '<div ref={containerRef} className="bg-slate-100/90 rounded-2xl p-4 sm:p-6 border border-slate-300 overflow-auto h-[calc(100vh-320px)] min-h-[500px] relative">'
);

fs.writeFileSync('src/components/SeatingPlanTab.tsx', code);
