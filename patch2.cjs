const fs = require('fs');
let code = fs.readFileSync('src/components/A4DocumentPreview.tsx', 'utf8');
code = code.replace(/student\.rankingJenjang/g, 'student.peringkatJenjang').replace(/st\.rankingJenjang/g, 'st.peringkatJenjang');
fs.writeFileSync('src/components/A4DocumentPreview.tsx', code);
