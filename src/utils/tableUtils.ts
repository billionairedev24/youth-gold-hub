import { Table } from "@tanstack/react-table";

export function exportToCSV<T>(table: Table<T>, filename: string) {
  const headers = table.getAllColumns()
    .filter((column) => column.getCanHide())
    .map((column) => column.id);

  const csvContent = [
    headers.join(","),
    ...table.getRowModel().rows.map((row) =>
      headers
        .map((header) => {
          const cell = row.getAllCells().find((cell) => cell.column.id === header);
          const value = cell?.getValue();
          return `"${value ?? ""}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}