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
import { ChevronDownIcon, Loader, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDelete, useList } from "./services";
import { IParkingType } from "./index.type";
import { loadState } from "@/utils/storage";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, useDebounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ClientUpdate from "./update";
import ClientCreate from "./create";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

export default function ClientPage() {
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
  const { mutate, isPending: isLoadingDelete } = useDelete();
  const {
    data: tableData,
    isLoading,
    refetch,
  } = useList(pageFilter?.page, pageFilter?.size, pageFilter.searchValue);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        toast("Muvaffaqiyatli o'chirildi");
        refetch();
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  useEffect(() => {
    const storedData = JSON.parse(window.localStorage.getItem("columnVisibilityParkingType") || "{}")
    if (storedData) {
      setColumnVisibility(storedData)
    }
  }, [])

  const columns: ColumnDef<IParkingType>[] = [
    {
      accessorKey: "id",
      meta: t("id"),
      header: t("id"),
    },
    {
      accessorKey: "type",
      meta: t("Turi"),
      header: t("Turi"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("type")}</p>,
    },
    {
      accessorKey: "last_one_hour",
      meta: t("1 soatgacha uchun"),
      header: t("1 soatgacha uchun"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("last_one_hour")}</p>,
    },
    {
      accessorKey: "last_six_hour",
      meta: t("6 soatgacha uchun"),
      header: t("6 soatgacha uchun"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("last_six_hour")}</p>,
    },
    {
      accessorKey: "over_six_hour",
      meta: t("6 soatdan ko'p uchun"),
      header: t("6 soatdan ko'p uchun"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("over_six_hour")}</p>,
    },
    {
      accessorKey: "parking_count",
      meta: t("Soni"),
      header: t("Soni"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("parking_count")}</p>,
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
                setEditId(row.original.id);
                setTimeout(() => setEditSheetOpen(true), 200);
              }}
              size="icon"
              className="size-8 md:size-10"
              variant="secondary"
            >
              <Pencil className="w-4 h-4 text-warning md:h-5 md:w-5" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button role="none" size="icon" className="size-8 md:size-10" variant="secondary">
                  <Trash2 className="w-4 h-4 text-destructive md:h-5 md:w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="mb-5">
                  <AlertDialogTitle>Haqiqatdan ham o'chirmoqchimisiz?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Agar tasdiqlasangiz ma'lumot bazadan o'chiriladi
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(row.original.id);
                    }}
                  >
                    Tasdiqlash
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData?.parking_rates || [],
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
          Parkovka turi va narxlar
          <sup className="ml-1.5 text-mediumParagraph">
            {tableData?.count && tableData?.count > 0 && tableData?.count}
          </sup>
        </h2>
        <Button onClick={() => setAddSheetOpen(true)} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Parkovka turi va narx  qo'shish
        </Button>
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
                            "columnVisibilityParkingType",
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
      <div className="relative max-h-[70vh] w-full overflow-y-auto rounded-lg border">
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
            {isLoadingDelete || isLoading ? (
              <TableRow className="h-[62vh] w-full">
                <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
                  <Loader className="mx-auto size-10 animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    // onDoubleClick={() => navigate(`/store/update/${row.original.id}`)}
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
                )
              })
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
      <ClientCreate
        setSheetOpen={setAddSheetOpen}
        sheetOpen={addSheetOpen}
        refetch={refetch}
      />
      <ClientUpdate
        setSheetOpen={setEditSheetOpen}
        sheetOpen={editSheetOpen}
        refetch={refetch}
        id={editId}
        setEditId={setEditId}
      />
    </section>
  );
}
