import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDownIcon, Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useList } from "./services";
import { loadState } from "@/utils/storage";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, useDebounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { IPayment } from "./index.type";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

interface Column {
  id: string;
  header: string;
  accessorKey: keyof IPayment | "action";
  cell: (row: IPayment) => JSX.Element;
}

export default function Payments() {
  const { t } = useTranslation();
  const [pageFilter, setPageFilter] = useState<IPageFilter>({
    page: 1,
    size: loadState("table-limit") || 10,
    searchValue: null,
  });
  const debouncedSearch = useDebounce((newQuery: string) => {
    refetch();
    setPageFilter((prev) => ({
      ...prev,
      page: 1,
      searchValue: newQuery === "" ? null : newQuery,
    }));
  }, 1000);
  const {
    data: tableData,
    isLoading,
    refetch,
  } = useList(pageFilter?.page, pageFilter?.size, pageFilter.searchValue);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  // Load column visibility from localStorage on initial render
  useEffect(() => {
    const storedVisibility = window.localStorage.getItem("columnVisibilityPayments");
    if (storedVisibility) {
      setColumnVisibility(JSON.parse(storedVisibility));
    }
  }, []);

  const toggleColumnVisibility = (columnId: string, value: boolean) => {
    const updatedVisibility = { ...columnVisibility, [columnId]: value };
    setColumnVisibility(updatedVisibility);

    // Save the updated visibility in localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("columnVisibilityPayments", JSON.stringify(updatedVisibility));
    }
  };

  const columns: Column[] = [
    {
      id: "id",
      header: t("id"),
      accessorKey: "id",
      cell: (row) => <p>{row.id}</p>,
    },
    {
      id: "summ",
      header: t("Summa"),
      accessorKey: "summ",
      cell: (row) => <p>{row.summ}</p>,
    },
    {
      id: "car_number",
      header: t("Mashina raqami"),
      accessorKey: "car_number",
      cell: (row) => <p>{row.car_number}</p>,
    },
    {
      id: "end_time",
      header: t("Vaqti"),
      accessorKey: "end_time",
      cell: (row) => (
        <p className="whitespace-nowrap">
          {dayjs(row.end_time).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      ),
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="font-semibold text-loginTitle">
          Parkovkalar
          <sup className="ml-1.5 text-mediumParagraph">
            {tableData?.count && tableData?.count > 0 && tableData?.count}
          </sup>
        </h2>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 mb-3 sm:flex-row md:mb-4">
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                debouncedSearch(e.target.value);
              }}
              type="search"
              placeholder="Qidirish..."
              className="w-full pl-8 shadow-none appearance-none bg-background"
            />
          </div>
        </form>
        <div className="flex items-center w-full gap-3 md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={cn(buttonVariants({ variant: "outline", className: "ml-auto" }))}>
                Ustunlarni sozlash <ChevronDownIcon className="w-4 h-4 ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns
                .filter((column) => column.accessorKey && column.header) // Filter columns that have an `accessorKey`
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={columnVisibility[column.id] ?? true} // Check if the column is visible or not
                    onCheckedChange={(value) => toggleColumnVisibility(column.id, !!value)}
                  >
                    {column.header}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="relative max-h-[70vh] w-full overflow-y-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const isVisible = columnVisibility[column.id] ?? true;
                return isVisible ? (
                  <TableHead className="sticky top-0 z-[1]" key={column.id}>
                    {column.header}
                  </TableHead>
                ) : null;
              })}
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isLoading ? (
              <TableRow className="h-[62vh] w-full">
                <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
                  <Loader className="mx-auto size-10 animate-spin" />
                </TableCell>
              </TableRow>
            ) : tableData?.payment?.length ? (
              tableData?.payment?.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    const isVisible = columnVisibility[column.id] ?? true;
                    return isVisible ? <TableCell key={column.id}>{column.cell(row)}</TableCell> : null;
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-[62vh] w-full">
                <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
                  Ma'lumot topilmadi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
