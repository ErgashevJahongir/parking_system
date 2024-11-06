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
import {
  ChevronDownIcon,
  Loader,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
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
import {
  useDelete,
  // useDetails,
  useList,
} from "./services";
import { IAdmin } from "./index.type";
import { loadState } from "@/utils/storage";
import { cn, useDebounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import LoadingComp from "@/components/loadingComp";
import dayjs from "dayjs";
import { adminData } from "@/mock";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

export default function MainPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    // isLoading,
    refetch,
  } = useList(pageFilter?.page, pageFilter?.size, pageFilter.searchValue);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    JSON.parse(window.localStorage.getItem("columnVisibilityStore") || "{}"),
  );

  // const { data: singleData, isLoading: singleLoading } = useDetails(
  //   Number(editId) as number,
  //   !!editId,
  // );

  const handleDelete = (id: number) => {
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

  const columns: ColumnDef<IAdmin>[] = [
    {
      accessorKey: "id",
      meta: t("id"),
      header: t("id"),
    },
    {
      accessorKey: "first_name",
      meta: t("first_name"),
      header: t("first_name"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.first_name}</p>,
    },
    {
      accessorKey: "last_name",
      meta: t("last_name"),
      header: t("last_name"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.last_name}</p>,
    },
    {
      accessorKey: "admin_type",
      meta: t("admin_type"),
      header: t("admin_type"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.admin_type}</p>,
    },
    {
      accessorKey: "username",
      meta: t("username"),
      header: t("username"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.username}</p>,
    },
    {
      accessorKey: "created_at",
      meta: t("created_at"),
      header: t("created_at"),
      cell: () => (
        <p className="whitespace-nowrap">{dayjs(new Date()).format("DD-MM-YYYY HH:mm")}</p>
      ),
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
                navigate(`/store/update/${row.original.id}`);
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
    data: adminData,
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
          Mijozlar
          <sup className="text-mediumParagraph">
            {tableData?.total_count && tableData?.total_count > 0 && tableData?.total_count}
          </sup>
        </h2>
        <Button onClick={() => navigate("/admin/create")} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Mijoz qo'shish
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
          <DropdownMenu modal={false}>
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
            {isLoadingDelete ? (
              <TableRow className="h-[62vh] w-full">
                <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
                  <Loader className="mx-auto size-10 animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onDoubleClick={() => navigate(`/store/update/${row.original.id}`)}
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
