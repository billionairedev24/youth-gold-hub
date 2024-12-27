import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Suggestion } from "@/types/suggestions";

interface SuggestionsTablePaginationProps {
  table: Table<Suggestion>;
}

export function SuggestionsTablePagination({ table }: SuggestionsTablePaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
}