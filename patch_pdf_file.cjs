const fs = require('fs');
let code = fs.readFileSync('src/components/PdfViewer.tsx', 'utf8');

// Import useMemo
code = code.replace(
  "import React, { useState, useEffect, useRef } from 'react';", 
  "import React, { useState, useEffect, useRef, useMemo } from 'react';"
);

// Add useMemo for file
const useMemoLogic = `
  const fileOptions = useMemo(() => {
    if (!data) return null;
    return { data: data };
  }, [data]);
`;
code = code.replace(
  "  const containerRef = useRef<HTMLDivElement>(null);",
  "  const containerRef = useRef<HTMLDivElement>(null);\n" + useMemoLogic
);

// Replace file={{ data: data }} with file={fileOptions}
code = code.replace(
  "file={{ data: data }}",
  "file={fileOptions!}"
);

fs.writeFileSync('src/components/PdfViewer.tsx', code);
