// DataTable.js
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface DataTableProps {
  data: any[]; // Remplacez `any[]` par le type approprié de vos données
  columns: ColumnDefinition[]; // Remplacez `TableColumn[]` par le type approprié de vos colonnes
}

export interface ColumnDefinition {
  accessor: string;
  cell: (info: any) => any;
  header: () => string | JSX.Element;
}

const DataTable = ({ data, columns }) => {
  const columnHelper = createColumnHelper();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <table className="table table-striped round shadow-sm">
      <thead className="table-dark">
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className="capitalize" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
