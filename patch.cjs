const fs = require('fs');
let code = fs.readFileSync('src/components/SeatingPlanTab.tsx', 'utf8');

let idx = code.indexOf('  );\n};\n\n// Sub-component for individual Desk Card');
if (idx > -1) {
    code = code.substring(0, idx) + '</div>\n' + code.substring(idx);
    fs.writeFileSync('src/components/SeatingPlanTab.tsx', code);
    console.log("Patched!");
} else {
    console.log("Could not find insertion point.");
}
