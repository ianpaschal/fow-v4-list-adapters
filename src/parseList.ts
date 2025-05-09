import { TextNode } from './extractTextNodes';

type Unit = {
  name: string;
  count: number;
  points?: number;
  isUpgrade?: boolean;
};

type ForceEntry = {
  id: string;
  name?: string;
  points: number;
  units: Unit[];
  notes?: string[];
};

export function parseList(nodes: TextNode[]) {
  
  // Sort into lines

  const lines: Record<number, TextNode[]> = {};

  nodes.forEach((node) => {
    if (!lines[node.y]) {
      lines[node.y] = [];
    }
    lines[node.y].push(node);
  });

  const sortedLines = Object.entries(lines).sort(
    ([keyA], [keyB]) => Number(keyA) - Number(keyB),
  ).map(
    ([_, nodes]) => nodes.sort((a, b) => a.x - b.x),
  );

  // Sort into sections

  // Identify supportIndex

  // Identify pickListIndex
  const totalIndex = sortedLines.findIndex((line) => line.find((node) => node.text.includes('Total Points')));

  return sortedLines.slice(0, totalIndex + 1);

  const formationNames = [
    
  ];
  const unitNames = [
    'Clausewitz Panzersturm Company HQ',
    'Clausewitz Armoured Panzergrenadier Platoon',
    'Clausewitz Armoured 2cm FlaK Platoon',
  ];
  
  return sortedLines;
}
