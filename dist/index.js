// src/index.ts
import fs from "fs";
import { parseArgs } from "node:util";

// src/extractTextNodes.ts
import PDFParser from "pdf2json";
var colorMap = {
  0: "black",
  1: "white"
};
async function extractTextNodes(buffer) {
  const parser = new PDFParser();
  const data = await new Promise((resolve, reject) => {
    parser.on("pdfParser_dataReady", (pdfData) => resolve(pdfData));
    parser.on("pdfParser_dataError", (err) => reject(err));
    parser.parseBuffer(buffer);
  });
  return data.Pages.reduce((acc, page) => {
    const nodes = page.Texts.map((text) => {
      const { x, y, clr, R } = text;
      return {
        x: Math.round(x * 1e3) / 1e3,
        y: Math.round(y * 1e3) / 1e3,
        color: clr !== void 0 ? colorMap[clr] : void 0,
        text: R.map(({ T }) => decodeURIComponent(T).replace(/[\u202F\u00A0]/g, " ")).join("")
      };
    });
    return [
      ...acc,
      ...nodes
    ];
  }, []);
}

// src/parseList.ts
function parseList(nodes) {
  const lines = {};
  nodes.forEach((node) => {
    if (!lines[node.y]) {
      lines[node.y] = [];
    }
    lines[node.y].push(node);
  });
  const sortedLines = Object.entries(lines).sort(
    ([keyA], [keyB]) => Number(keyA) - Number(keyB)
  ).map(
    ([_, nodes2]) => nodes2.sort((a, b) => a.x - b.x)
  );
  const totalIndex = sortedLines.findIndex((line) => line.find((node) => node.text.includes("Total Points")));
  return sortedLines.slice(0, totalIndex + 1);
  return sortedLines;
}

// src/index.ts
var { values } = parseArgs({
  allowPositionals: true,
  args: process.argv,
  options: {
    path: {
      type: "string",
      short: "p"
    }
  }
});
async function main(path) {
  if (!path) {
    throw new Error("No file provided!");
  }
  const buffer = fs.readFileSync(path);
  const content = await extractTextNodes(buffer);
  const parsed = parseList(content);
  console.log(parsed);
}
main(values.path);
