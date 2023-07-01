import {
  Checkbox,
  TableBody as MultiTableBody,
  TableCell,
  TableRow
} from '@mui/material';

import { TableBodyProps } from './Table.types';

export const TableBody = ({ data, onSelect, selectedIds }: TableBodyProps) => {
  return (
    <MultiTableBody>
      {data.map(dataObj => (
        <TableRow key={dataObj.id} hover>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={selectedIds.includes(dataObj.id)}
              onChange={() => onSelect(dataObj.id)}
            />
          </TableCell>
          {dataObj.nodes.map((node, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={index}>{node}</TableCell>
          ))}
        </TableRow>
      ))}
    </MultiTableBody>
  );
};
