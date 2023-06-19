import * as React from 'react';

export type RowDefault = Record<string | number | symbol, any>;

export function isFunction(v: any): v is Function {
  return typeof v === 'function';
}

interface TableComponents<RowItem, IdAttr extends keyof RowItem> {
  tr: (
    props: { children?: React.ReactNode } & {
      [P in IdAttr as P]: RowItem[P];
    }
  ) => React.JSX.Element;
}

interface TableExtraConfig<RowItem, IdAttr extends keyof RowItem> {
  components: Partial<TableComponents<RowItem, IdAttr>>;
}

export interface Column<
  RowData extends RowDefault,
  Prop extends keyof RowData
> {
  title?: React.ReactNode;
  render: (value: RowData[Prop], idx: number, row: RowData) => React.ReactNode;
  rowCellProps?: JSX.IntrinsicElements['td'];
}

export interface TableProps<RowItem extends RowDefault> {
  rows: RowItem[];
  loading?: boolean;
  idAttr: keyof RowItem;
}

export type TableConfig<RowItem extends RowDefault> = Partial<{
  [P in keyof RowItem]: Partial<Column<RowItem, P>>;
}>;

export const makeTable = <Row extends RowDefault, Config>(
  columnsConfig: {
    [P in keyof Config]: Partial<{
      render: (
        value: P extends keyof Row ? Row[P] : undefined,
        idx: number,
        row: Row
      ) => React.ReactNode;
      title: React.ReactNode;
      rowCellProps?: JSX.IntrinsicElements['td'];
    }>;
  },
  extraConfig: TableExtraConfig<Row, keyof Row>
) => {
  const columns: Column<Row, keyof Config>[] = Object.values(columnsConfig);
  const components = extraConfig.components;
  const DefaultTr: TableComponents<Row, keyof Row>['tr'] = (props) => (
    <tr>{props.children}</tr>
  );
  const CustomRow = components.tr || DefaultTr;

  const colsKeys = Object.keys(columnsConfig);
  const renderRowCells = (row: Row, idx: number) =>
    colsKeys.map((key) => {
      const col = columnsConfig[key as keyof typeof columnsConfig];

      const value = row[key];
      const child = isFunction(col.render)
        ? col.render(value, idx, row)
        : value;

      return (
        <td {...col.rowCellProps} key={`${key}-{idx.toString()}`}>
          {child}
        </td>
      );
    });

  const TableHeader = (
    <thead>
      <tr>
        {columns.map(({ title }, idx) => (
          <th key={`th-${idx.toString()}`}>{title}</th>
        ))}
      </tr>
    </thead>
  );

  const TableData = ({ rows, idAttr }: TableProps<Row>) => (
    <table>
      {TableHeader}
      <tbody>
        {rows.map((row, idx) => (
          <CustomRow {...row} key={`tr-${row[idAttr]}`}>
            {renderRowCells(row, idx)}
          </CustomRow>
        ))}
      </tbody>
    </table>
  );
  return TableData;
};
