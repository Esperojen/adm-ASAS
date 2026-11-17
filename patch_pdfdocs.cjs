const fs = require('fs');
let code = fs.readFileSync('src/components/PdfDocumentsTab.tsx', 'utf8');

// Change pdfUrl to pdfData (Uint8Array)
code = code.replace("const [pdfUrl, setPdfUrl] = useState<string>('');", "const [pdfData, setPdfData] = useState<Uint8Array | null>(null);");

code = code.replace("const pdfBlobUrl = doc.output('bloburl');", "const arrayBuffer = doc.output('arraybuffer');\n      const uint8Array = new Uint8Array(arrayBuffer);");
code = code.replace("setPdfUrl(pdfBlobUrl.toString());", "setPdfData(uint8Array);");

code = code.replace("<PdfViewer url={pdfUrl} />", "<PdfViewer data={pdfData} />");
code = code.replace("url={pdfUrl}", "data={pdfData}"); // just in case

fs.writeFileSync('src/components/PdfDocumentsTab.tsx', code);
