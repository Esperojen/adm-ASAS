const fs = require('fs');
let code = fs.readFileSync('src/components/SeatingPlanTab.tsx', 'utf8');
code = code.replace(
  '            <div className="font-semibold text-slate-700">\n              Bagian Belakang Kelas (Baris 4)\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};',
  '            <div className="font-semibold text-slate-700">\n              Bagian Belakang Kelas (Baris 4)\n            </div>\n          </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};'
);
fs.writeFileSync('src/components/SeatingPlanTab.tsx', code);
