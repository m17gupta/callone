export type CallCheckDataset = {
  id: string;
  name: string;
  slug: string;
  type: "generic";
  sourceFileName: string;
  description?: string;
  columns: string[];
  rowCount: number;
  uniqueValues?: Record<string, string[]>;
  createdAt: string;
};

export type CallCheckRow = {
  _id?: string;
  [key: string]: unknown;
};
