import { TableContainer, Table as MultiTable } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { TableProps } from './Table.types';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';

export const Table = <T extends string>({
  columnNames,
  data,
  renderBelowTable,
  renderAboveTable
}: TableProps<T | 'id'>) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const dataSortedByColNames = useMemo(
    () =>
      data.map(dataObj => ({
        id: dataObj.id as 'id',
        nodes: Object.keys(dataObj)
          .filter(key => {
            return key !== 'id';
          })
          .sort(
            (a, b) =>
              columnNames.findIndex(col => col.id === a) -
              columnNames.findIndex(col => col.id === b)
          )
          .map(key => {
            return dataObj[key as T];
          })
      })),
    [columnNames, data]
  );

  const isAllSelected = useMemo(
    () => selectedIds.length === data.length,
    [data.length, selectedIds.length]
  );

  const onSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else setSelectedIds(dataSortedByColNames.map(d => d.id));
  }, [dataSortedByColNames, isAllSelected]);

  const onSelect = useCallback(
    (id: string) =>
      setSelectedIds(prev =>
        prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
      ),
    []
  );

  return (
    <>
      {renderAboveTable?.({ selectedIds, onSelect })}
      <TableContainer>
        <MultiTable>
          <TableHead<T | 'id'>
            columnNames={columnNames}
            onSelectAll={onSelectAll}
            isAllSelected={isAllSelected}
          />
          <TableBody
            data={dataSortedByColNames}
            onSelect={onSelect}
            selectedIds={selectedIds}
          />
        </MultiTable>
      </TableContainer>
      {renderBelowTable?.({ selectedIds, onSelect })}
    </>
  );
};
