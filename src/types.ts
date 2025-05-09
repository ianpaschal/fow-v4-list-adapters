// For Combat Command internal use only:
export type ForceList = {
  _id: string;
  _creationTime: number;
  modifiedAt: number;
  authorId: string;
  locked: boolean;
  clonedFromId: string;
  data: FowV4ForceListData; // This is the important bit shared between tools
};

// MASTER DATA
export type DefinitionMeta = {
  displayName: string;
  faction: string;
  sourceBook?: string;
  era?: 'EW' | 'MW' | 'LW';
};
export type DefinitionId = string;
export type FowV4FormationDefinition = {
  id: DefinitionId; // e.g. LG469 or 'BERLIN_GERMAN_SUPPORT'
  meta: DefinitionMeta;
  slots: {
    type: 'armor' | 'infantry' | string;
    isHq: boolean;
    required: boolean;
    unitOptions: DefinitionId[];
  }[];
  // When rendering slots, check if any CC adds or removes slots
};
export type FowV4UnitDefinition = {
  id: DefinitionId; // e.g. LG469
  meta: DefinitionMeta;
  configs: {
    points: number;
    pointsVersion: string | null; // null is book points, all others are 2025_01, etc.
    isFullStrength: boolean;
    teams: Record<string, number>; // e.g. { mg42_team: 7, sd_kfz_251: 4 }
  }[];
  modifiers: {
    id: string;
    meta: DefinitionMeta;
    cost: number;
    limit: [number, 'unit'|'formation'|'force'];
  }[]; // Not sure how to handle this
};
export type FowV4CommandCardDefinition = {
  id: string; // CC's don't have IDs sadly?
  meta: DefinitionMeta;
  limit: [number, 'unit'|'formation'|'force'];
  cost: (force: FowV4ForceListData) => number; 
};
// replaces team a with team b
// replaces unit a with unit b
// changes units soft stats
// changes formations soft stats

// USER DATA
export type FowV4FormationId = string;
export type FowV4UnitId = string;
export type FowV4ForceListData = {
  formations: FowV4FormationInstance[];
  units: FowV4UnitInstance[];
  commandCards: FowV4CommandCardInstance[];
};
export type FowV4FormationInstance = {
  id: FowV4FormationId;
  definitionId: string; // e.g. LG469
};
export type FowV4UnitInstance = {
  id: FowV4UnitId;
  definitionId: string; // e.g. LG469
  formationId: FowV4FormationId;
  configIndex: number;
  modifiers: string[]; // Really not sure how to handle this
};
export type FowV4CommandCardInstance = {
  definitionId: string;
  appliedTo: FowV4FormationId | FowV4UnitId;
};
