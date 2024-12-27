import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Suggestion } from "@/types/suggestions";
import { SuggestionsTablePagination } from "./SuggestionsTablePagination";
import { getSuggestionsColumns } from "./SuggestionsTableColumns";
import { SuggestionsTableToolbar } from "./SuggestionsTableToolbar";
import { ViewSuggestionDialog } from "./ViewSuggestionDialog";
import { ReviewSuggestionDialog } from "./ReviewSuggestionDialog";

interface SuggestionsTableProps {
  data: Suggestion[];
  onSuggestionUpdate?: (updatedSuggestion: Suggestion) => void;
}

export function SuggestionsTable({ data: initialData, onSuggestionUpdate }: SuggestionsTableProps) {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [viewSuggestion, setViewSuggestion] = useState<Suggestion | null>(null);
  const [reviewSuggestion, setReviewSuggestion] = useState<Suggestion | null>(null);

  const handleSuggestionUpdate = (updatedSuggestion: Suggestion) => {
    setData(prevData =>
      prevData.map(suggestion =>
        suggestion.id === updatedSuggestion.id ? updatedSuggestion : suggestion
      )
    );
    
    if (onSuggestionUpdate) {
      onSuggestionUpdate(updatedSuggestion);
    }
  };

  const table = useReactTable({
    data,
    columns: getSuggestionsColumns(
      (suggestion) => setViewSuggestion(suggestion),
      (suggestion) => setReviewSuggestion(suggestion)
    ),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <SuggestionsTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No suggestions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <SuggestionsTablePagination table={table} />

      {viewSuggestion && (
        <ViewSuggestionDialog
          suggestion={viewSuggestion}
          open={!!viewSuggestion}
          onOpenChange={(open) => !open && setViewSuggestion(null)}
        />
      )}

      {reviewSuggestion && (
        <ReviewSuggestionDialog
          suggestion={reviewSuggestion}
          open={!!reviewSuggestion}
          onOpenChange={(open) => !open && setReviewSuggestion(null)}
          onSuggestionUpdate={handleSuggestionUpdate}
        />
      )}
    </div>
  );
}