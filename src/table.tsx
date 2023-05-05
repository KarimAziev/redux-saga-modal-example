import * as React from 'react';

export interface RowDefault extends Record<string | number | symbol, any> {}

export function isFunction(v: any): v is Function {
  return typeof v === 'function';
}

export interface Column<
  RowData extends RowDefault,
  Prop extends keyof RowData
> {
  title?: React.ReactNode;
  render: (value: RowData[Prop], idx: number, row: RowData) => React.ReactNode;
  rowCellProps?: HTMLTableCellElement;
}

export interface TableProps<RowItem extends RowDefault> {
  rows: RowItem[];
  loading?: boolean;
  skeletonCount?: number;
  idAttr: keyof RowItem;
  loadingIds?: Record<keyof RowItem, boolean>;
}

export type TableConfig<
  RowItem extends RowDefault,
  KeysToRender extends keyof RowItem
> = {
  [P in KeysToRender]: Partial<Column<RowItem, P>>;
};

export const makeTable = <Row extends RowDefault, Config>(columnsConfig: {
  [P in keyof Config]: Partial<{
    render: (
      value: P extends keyof Row ? Row[P] : undefined,
      idx: number,
      row: Row
    ) => React.ReactNode;
    title: React.ReactNode;
    rowCellProps?: HTMLTableCellElement;
  }>;
}) => {
  const columns: Column<Row, any>[] = Object.values(columnsConfig);
  const renderRowCells = (row: Row, idx: number, loading?: boolean) => {
    return Object.keys(columnsConfig).map((key) => {
      const col = (columnsConfig as Record<string, any>)[key];

      const value = row[key];
      const child = isFunction(col.render)
        ? col.render(value, idx, row)
        : value;
      return (
        <td
          style={loading ? { opacity: 0.5 } : {}}
          {...col.rowCellProps}
          key={`${key}{idx.toString()}`}
        >
          {child}
        </td>
      );
    });
  };

  const TableHeader = (
    <thead>
      <tr>
        {columns.map(({ title }, idx) => (
          <th key={`th-${idx.toString()}`}>{title}</th>
        ))}
      </tr>
    </thead>
  );

  const TableData = ({ rows, loadingIds, idAttr }: TableProps<Row>) => {
    return (
      <table>
        {TableHeader}
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx.toString()}>
              {renderRowCells(row, idx, loadingIds && loadingIds[row[idAttr]])}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return TableData;
};
