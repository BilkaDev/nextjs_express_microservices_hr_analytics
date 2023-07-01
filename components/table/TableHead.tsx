import {
  Checkbox,
  TableCell,
  TableHead as MultiTableHead,
  TableRow
} from '@mui/material';

import { TableHeadProps } from './Table.types';

export const TableHead = <T extends string>({
  columnNames,
  onSelectAll,
  isAllSelected
}: TableHeadProps<T>) => {
  return (
    <MultiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isAllSelected}
            onChange={onSelectAll}
            color="primary"
          />
        </TableCell>
        {columnNames.map(colName => (
          <TableCell key={colName.id}>{colName.displayName}</TableCell>
        ))}
      </TableRow>
    </MultiTableHead>
  );
};
