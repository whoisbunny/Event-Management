import React, { useEffect, useState } from "react";
import type {
  ColumnDef,
  OnChangeFn,
  SortingState,
} from "@tanstack/react-table";
import type { IEvent } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pen, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchEvents, removeEvent, updateEvent } from "@/store/eventReducer";
import useDebounce from "@/hooks/use-debounce";
import { DataTable } from "@/components/data-table";
import dayjs from "dayjs";

const EventList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IEvent[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const sortBy = sorting[0]?.id || "";
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";
  const debouncedFilter = useDebounce(globalFilter, 400);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const query = new URLSearchParams({
    page: pageIndex.toString(),
    limit: pageSize.toString(),
    globalFilter: debouncedFilter,
    sortBy,
    sortOrder,
  });
  useEffect(() => {
    dispatch(fetchEvents(query.toString()));
  }, [dispatch, pageIndex, pageSize, debouncedFilter, sortBy, sortOrder]);

  const actions = [
    {
      name: "edit",
      icon: <Pen />,
      doit: (item: IEvent) => dispatch(updateEvent(item)),
    },
    {
      name: "delete",
      icon: <Trash />,
      doit: (item: IEvent) => {
        const confirmMsg = confirm(" Are you sure you want to delete ?");
        if (confirmMsg) {
          dispatch(removeEvent(item._id)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
              dispatch(fetchEvents(query.toString()));
            }
          });
        }
      },
    },
  ];

  const columns: ColumnDef<IEvent>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (row) => {
        const description = row.row.original.description;

        return (
          <div className="text-sm ">
            {description.length > 20
              ? `${description.slice(0, 20)}...`
              : description}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Event Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (row) => {
        const date = new Date(row.row.original.date);
        return <div>{dayjs(date).format("DD-MM-YYYY HH:mm A")}</div>;
      },
    },
    {
      accessorKey: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          {actions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              className={`
                ${
                  action.name === "delete"
                    ? "bg-red-500 text-red-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                    : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                }
                border-opacity-10 text-sm last:mb-0 cursor-pointer
              `}
              onClick={() => action.doit(row.row.original)}
            >
              {action.icon}
            </Button>
          ))}
        </div>
      ),
    },
  ];

  const events = useAppSelector((state) => state.event.events);
  useEffect(() => {
    if (events?.data) {
      setData(events.data as IEvent[]);
      setPagination((prev) => ({
        ...prev,
        pageIndex: events.page,
        pageSize: events.limit || 10,
      }));
      setHasPreviousPage(events.hasPrevPage);
      setHasNextPage(events.hasNextPage);
    }
  }, [events]);

  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSorting);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <DataTable
        columns={columns}
        data={data}
        nextPage={hasNextPage}
        previousPage={hasPreviousPage}
        state={{
          pagination,
          sorting,
          globalFilter,
        }}
        onSortingChange={onSortingChange}
        manualPagination
        manualSorting
        manualFiltering
        onPaginationChange={({ pageIndex, pageSize }) => {

          setPageIndex(pageIndex);
          setPageSize(pageSize);

          setPagination((prev) => ({
            ...prev,
            pageIndex: pageIndex,
            pageSize: pageSize,
          }));
        }}
        onGlobalFilterChange={(value) => {
          setGlobalFilter(value || "");
          setPageIndex(1); // Reset to first page when filtering
        }}
        title={"Event List"}
      />
    </div>
  );
};

export default EventList;
