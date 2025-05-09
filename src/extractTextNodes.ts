import PDFParser, { Output } from 'pdf2json';

export type TextNode = {
  x: number;
  y: number;
  color?: string;
  text: string;
};

const colorMap: Record<number, string> = {
  0: 'black',
  1: 'white',
};

export async function extractTextNodes(buffer: Buffer): Promise<TextNode[]> {
  const parser = new PDFParser();
  const data = await new Promise<Output>((resolve, reject) => {
    parser.on('pdfParser_dataReady', (pdfData) => resolve(pdfData));
    parser.on('pdfParser_dataError', (err) => reject(err));
    parser.parseBuffer(buffer);
  });
  return data.Pages.reduce((acc, page) => {
    const nodes = page.Texts.map((text) => {
      const { x,y,clr, R } = text;
      return {
        x: Math.round(x * 1000) / 1000,
        y: Math.round(y * 1000) / 1000,
        color: clr !== undefined ? colorMap[clr] : undefined,
        text: R.map(({ T }: { T: string; }) => decodeURIComponent(T).replace(/[\u202F\u00A0]/g, ' ')).join(''),
      };
    });
    return [
      ...acc,
      ...nodes,
    ];
  }, [] as TextNode[]);
}
