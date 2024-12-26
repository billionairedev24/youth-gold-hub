import { Table } from "@tanstack/react-table";

export function exportToCSV<T>(table: Table<T>, filename: string) {
  const headers = table.getAllColumns()
    .filter(column => column.getCanHide())
    .map(column => column.id)
    .join(',');

  const rows = table.getRowModel().rows.map(row => {
    return table.getAllColumns()
      .filter(column => column.getCanHide())
      .map(column => {
        const value = row.getValue(column.id);
        return typeof value === 'string' ? `"${value}"` : value;
      })
      .join(',');
  }).join('\n');

  const csv = `${headers}\n${rows}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}