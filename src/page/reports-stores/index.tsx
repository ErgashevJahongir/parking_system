import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDownIcon, HandCoins, Search } from "lucide-react";
import { 
  // useDetails,
  useList } from "../shops/services";
import { IOrder, IStoreReports } from "../shops/index.type";
import { loadState } from "@/utils/storage";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, useDebounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
// import LoadingComp from "@/components/loadingComp";
import { reportsData } from "@/mock";
import { useState } from "react";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

export default function ReportsStore() {
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
    // isLoading,
    refetch,
  } = useList(pageFilter?.page, pageFilter?.size, pageFilter.searchValue);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    JSON.parse(window.localStorage.getItem("columnVisibilityStore") || "{}"),
  );

  const [payMonitoringSheetOpen, setPayMonitoringSheetOpen] = useState(false);
  const [editId, setEditId] = useState<IStoreReports | null>(null);
  // const { data: singleData, isLoading: singleLoading } = useDetails(
  //   Number(editId) as number,
  //   !!editId,
  // );

  const columns: ColumnDef<IStoreReports>[] = [
    {
      accessorKey: "id",
      meta: t("id"),
      header: t("id"),
    },
    {
      accessorKey: "title",
      meta: t("title"),
      header: t("title"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.title}</p>,
    },
    {
      accessorKey: "sales_count",
      meta: t("Umumiy savdo soni"),
      header: t("Umumiy savdo soni"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.sales_count}</p>,
    },
    {
      accessorKey: "total_sales_price",
      meta: t("Umumiy savdo summasi"),
      header: t("Umumiy savdo summasi"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.total_sales_price}</p>,
    },
    {
      accessorKey: "action",
      meta: t("action"),
      header: t("action"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setEditId(row.original);
                setTimeout(() => setPayMonitoringSheetOpen(true), 200);
              }}
              size="icon"
              className="size-8 md:size-10"
              variant="secondary"
            >
              <HandCoins className="w-4 h-4 md:h-5 md:w-5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: reportsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="font-semibold text-loginTitle">
          Do'konlar hisoboti
          <sup className="text-mediumParagraph">
            {tableData?.total_count && tableData?.total_count > 0 && tableData?.total_count}
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
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        if (typeof window !== "undefined") {
                          window.localStorage.setItem(
                            "columnVisibilityStore",
                            JSON.stringify({ ...columnVisibility, [column.id]: !!value }),
                          );
                        }
                        return column.toggleVisibility(!!value);
                      }}
                    >
                      {typeof column.columnDef.header === "string" && column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Sheet
        open={payMonitoringSheetOpen}
        onOpenChange={(open) => {
          setPayMonitoringSheetOpen(open);
          !open && setEditId(null);
        }}
      >
        <SheetContent
          className="md:max-w-[700px] lg:max-w-[900px]"
          side="right"
        >
          <SheetDescription className="hidden">hide</SheetDescription>
          <SheetHeader>
            <SheetTitle className="text-left">Do'kon buyurtmalari</SheetTitle>
          </SheetHeader>
          {/* {singleLoading ? (
            <div className="10">
              <LoadingComp />
            </div>
          ) : ( */}
            <div className="grid gap-4 py-4">
              <div>
                <div className="flex justify-end"></div>
                <h3 className="py-2 font-medium text-mediumParagraph">Umumiy buyurtmalar</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">Id</TableHead>
                      <TableHead className="w-10">Mahsulot</TableHead>
                      <TableHead className="w-10">Kredit vaqti</TableHead>
                      <TableHead>To'lov</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead>Qoldiq</TableHead>
                      <TableHead className="text-right">Sanasi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editId?.orders.map((payment: IOrder) => (
                      <TableRow key={payment.id}>
                        <TableCell className="py-2 md:py-2">{payment.id}</TableCell>
                        <TableCell className="py-2 md:py-2">{payment.product}</TableCell>
                        <TableCell className="py-2 md:py-2">{payment.month}</TableCell>
                        <TableCell className="py-2 md:py-2">{payment.amount}</TableCell>
                        <TableCell className="py-2 md:py-2">
                          {payment.payed ? (
                            <Button
                              variant="outline"
                              className="text-green-600 border-green-500 h-7 whitespace-nowrap bg-green-100/20 text-smallparagraph hover:text-green-600"
                            >
                              To'langan
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="text-red-600 border-red-500 h-7 whitespace-nowrap bg-red-100/20 text-smallparagraph hover:text-red-600"
                            >
                              To'lanmagan
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="py-2 md:py-2">{payment.residual}</TableCell>
                        <TableCell className="py-2 text-right md:py-2">{payment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          {/* )} */}
        </SheetContent>
      </Sheet>
      <div className="relative h-[70vh] w-full overflow-y-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="sticky top-0 z-[1]" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="w-full">
            {
            // isLoading ? (
            //   <TableRow className="h-[62vh] w-full">
            //     <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
            //       <Loader className="mx-auto size-10 animate-spin" />
            //     </TableCell>
            //   </TableRow>
            // ) : 
            table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onDoubleClick={() => {
                    setEditId(row.original);
                    setTimeout(() => setPayMonitoringSheetOpen(true), 200);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
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
