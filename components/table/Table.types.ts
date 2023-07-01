import { ReactNode } from 'react';

export type ColumnName<T> = {
  id: T;
  displayName: string;
};

export type TranslateColumnName<T> = {
  id: T;
  displayName: T;
};

export type TableBodyRow = {
  id: string;
  nodes: ReactNode[];
};

export type TableBodyProps = {
  data: TableBodyRow[];
  onSelect: (id: string) => void;
  selectedIds: string[];
};

export type TableData<T extends string> = Record<T | 'id', ReactNode>[];

export type TableProps<T extends string> = {
  columnNames: ColumnName<T>[];
  data: TableData<T>;
  renderAboveTable?: (props: RenderAboveTableProps) => JSX.Element;
  renderBelowTable?: (props: RenderAboveTableProps) => JSX.Element;
};

export type TableHeadProps<T> = {
  columnNames: ColumnName<T>[];
  onSelectAll: () => void;
  isAllSelected: boolean;
};

export type RenderAboveTableProps = {
  selectedIds: string[];
  onSelect: (id: string) => void;
};
