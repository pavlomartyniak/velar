// Генерує мок PDF-презентацію з коректною xref-таблицею.
// Запуск: node scripts/gen-mock-pdf.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const lines = (arr) => arr.join("\n");

const content = lines([
  "BT /F1 28 Tf 60 760 Td (VELAR) Tj ET",
  "BT /F2 16 Tf 60 730 Td (Premium Villas \\267 Demo Presentation) Tj ET",
  "BT /F2 13 Tf 60 690 Td (Your configured villa:) Tj ET",
  "BT /F2 12 Tf 60 660 Td (\\267 Style, area and options selected in the configurator) Tj ET",
  "BT /F2 12 Tf 60 638 Td (\\267 AI floor plan and 3D visualization) Tj ET",
  "BT /F2 12 Tf 60 616 Td (\\267 Estimated budget range) Tj ET",
  "BT /F2 11 Tf 60 80 Td (This is a mock document for demonstration purposes.) Tj ET",
]);

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
pdf += `startxref\n${xrefStart}\n%%EOF`;

mkdirSync("public", { recursive: true });
writeFileSync("public/mock-presentation.pdf", pdf, "latin1");
console.log("Wrote public/mock-presentation.pdf", pdf.length, "bytes");
