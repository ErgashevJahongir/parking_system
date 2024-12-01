import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
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

interface Column {
  id: string;
  header: string;
  accessorKey: keyof IParkingType | "action";
  cell: (row: IParkingType) => JSX.Element;
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
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  // Load column visibility from localStorage on initial render
  useEffect(() => {
    const storedVisibility = window.localStorage.getItem("columnVisibilityParkingType");
    if (storedVisibility) {
      setColumnVisibility(JSON.parse(storedVisibility));
    }
  }, []);

  const toggleColumnVisibility = (columnId: string, value: boolean) => {
    const updatedVisibility = { ...columnVisibility, [columnId]: value };
    setColumnVisibility(updatedVisibility);

    // Save the updated visibility in localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("columnVisibilityParkingType", JSON.stringify(updatedVisibility));
    }
  };

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

  const columns: Column[] = [
    {
      id: "id",
      header: t("ID"),
      accessorKey: "id",
      cell: (row) => <p className="whitespace-nowrap">{row.id}</p>,
    },
    {
      id: "type",
      header: t("Turi"),
      accessorKey: "type",
      cell: (row) => <p className="whitespace-nowrap">{row.type}</p>,
    },
    {
      id: "last_one_hour",
      header: t("1 soatgacha uchun"),
      accessorKey: "last_one_hour",
      cell: (row) => <p className="whitespace-nowrap">{row.last_one_hour}</p>,
    },
    {
      id: "last_six_hour",
      header: t("6 soatgacha uchun"),
      accessorKey: "last_six_hour",
      cell: (row) => <p className="whitespace-nowrap">{row.last_six_hour}</p>,
    },
    {
      id: "over_six_hour",
      header: t("6 soatdan ko'p uchun"),
      accessorKey: "over_six_hour",
      cell: (row) => <p className="whitespace-nowrap">{row.over_six_hour}</p>,
    },
    {
      id: "parking_count",
      header: t("Soni"),
      accessorKey: "parking_count",
      cell: (row) => <p className="whitespace-nowrap">{row.parking_count}</p>,
    },
    {
      id: "action",
      header: t("action"),
      accessorKey: "action",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setEditId(row.id);
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
              <Button
                role="none"
                size="icon"
                className="size-8 md:size-10"
                variant="secondary"
              >
                <Trash2 className="w-4 h-4 text-destructive md:h-5 md:w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="mb-5">
                <AlertDialogTitle>{t("Haqiqatdan ham o'chirmoqchimisiz?")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("Agar tasdiqlasangiz ma'lumot bazadan o'chiriladi")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("Bekor qilish")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(row.id);
                  }}
                >
                  {t("Tasdiqlash")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

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
            {isLoadingDelete || isLoading ? (
              <TableRow className="h-[62vh] w-full">
                <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
                  <Loader className="mx-auto size-10 animate-spin" />
                </TableCell>
              </TableRow>
            ) : tableData?.parking_rates?.length ? (
              tableData?.parking_rates?.map((row) => (
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
