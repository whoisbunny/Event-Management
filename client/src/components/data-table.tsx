import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type OnChangeFn,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  state?: {
    pagination?: {
      pageIndex: number;
      pageSize: number;
    };
    globalFilter?: string;
    sorting?: SortingState;
  };
  onGlobalFilterChange?: (value: string) => void;
  onSortingChange?: OnChangeFn<SortingState>;
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  title?: string;

  nextPage?: boolean;
  previousPage?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  state,
  onGlobalFilterChange,
  onSortingChange,
  onPaginationChange,
  manualPagination,
  manualSorting,
  manualFiltering,
  title,
  nextPage,
  previousPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: state?.pagination,
      sorting: state?.sorting,
      globalFilter: state?.globalFilter,
    },
    onPaginationChange: (updater) => {
      const prev = state?.pagination ?? { pageIndex: 1, pageSize: 10 };
      const next = typeof updater === "function" ? updater(prev) : updater;
      onPaginationChange?.(next);
    },
    onGlobalFilterChange,
    onSortingChange,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination,
    manualSorting,
    manualFiltering,
  });

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-md border">
        <div className="flex justify-between items-center mb-4 px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <Input
            placeholder="Filter..."
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => onGlobalFilterChange?.(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table className="px-2">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between space-x-2 py-4 px-8">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              className="border rounded px-2 py-1"
              value={state?.pagination?.pageSize}
              onChange={(e) =>
                onPaginationChange?.({
                  pageIndex: 1,
                  pageSize: Number(e.target.value),
                })
              }
            >
              {[1, 5, 10, 20, 30, 50].map((size) => (
                <option key={size} value={size} className="dark:bg-gray-800">
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              size="sm"
              onClick={() => table.previousPage()}
              // onClick={() =>
              //   onPaginationChange?.({
              //     pageIndex: (state?.pagination?.pageIndex ?? 0) - 1,
              //     pageSize: state?.pagination?.pageSize ?? 10,
              //   })
              // }
              disabled={!previousPage}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              size="sm"
              onClick={() => table.nextPage()}
       
              disabled={!nextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
