import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDownIcon, CircleX, Loader, Plus, Search, Trash2 } from "lucide-react";
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
import { useDelete, useList, useSumma } from "./services";
import { IParking } from "./index.type";
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
import ClientCreate from "./create";
import dayjs from "dayjs";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

interface Column {
  id: string;
  header: string;
  accessorKey: keyof IParking | "action";
  cell: (row: IParking) => JSX.Element;
}

export default function Parking() {
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
  const [parkingId, setParkingId] = useState<string | null>(null);
  const { data: sumData } = useSumma(parkingId as string, dayjs().format("YYYY-MM-DD HH:mm:ss"), !!parkingId);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  // Load column visibility from localStorage on initial render
  useEffect(() => {
    const storedVisibility = window.localStorage.getItem("columnVisibilityParkingNotEnded");
    if (storedVisibility) {
      setColumnVisibility(JSON.parse(storedVisibility));
    }
  }, []);

  const toggleColumnVisibility = (columnId: string, value: boolean) => {
    const updatedVisibility = { ...columnVisibility, [columnId]: value };
    setColumnVisibility(updatedVisibility);

    // Save the updated visibility in localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("columnVisibilityParkingNotEnded", JSON.stringify(updatedVisibility));
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
      header: "ID",
      accessorKey: "id",
      cell: (row) => <p>{row.id}</p>,
    },
    {
      id: "name",
      header: "Mijoz",
      accessorKey: "name",
      cell: (row) => <p>{row.name}</p>,
    },
    {
      id: "car_number",
      header: "Mashina raqami",
      accessorKey: "car_number",
      cell: (row) => <p>{row.car_number}</p>,
    },
    {
      id: "start_time",
      header: "Kirish vaqti",
      accessorKey: "start_time",
      cell: (row) => (
        <p>{dayjs(row.start_time).format("YYYY-MM-DD HH:mm:ss")}</p>
      ),
    },
    {
      id: "end_time",
      header: "Chiqish vaqti",
      accessorKey: "end_time",
      cell: (row) => (
        <p>{row.end_time ? dayjs(row.end_time).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
      ),
    },
    {
      id: "type",
      header: "Turi",
      accessorKey: "type",
      cell: (row) => <p>{row.type}</p>,
    },
    {
      id: "summ",
      header: "Summa",
      accessorKey: "summ",
      cell: (row) => <p>{row.summ} so'm</p>,
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "action",
      cell: (row) => (
        <div className="flex items-center gap-2">
          {/* Tasdiqlash dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={() => { setParkingId(row.id) }} role="none" size="icon" className="size-8 md:size-10" variant="secondary">
                <CircleX className="w-4 h-4 text-destructive md:h-5 md:w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="mb-5">
                <AlertDialogTitle>{sumData?.sum} so'm</AlertDialogTitle>
                <AlertDialogDescription>
                  Parkovka summasini faqat naqt ko'rinishda olinadi
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>
                  Tasdiqlash
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* O'chirish dialog */}
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
                <AlertDialogTitle>Haqiqatdan ham o'chirmoqchimisiz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Agar tasdiqlasangiz ma'lumot bazadan o'chiriladi
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(row.id);
                  }}
                >
                  Tasdiqlash
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
          Tugallanmagan parkovkalar
          <sup className="ml-1.5 text-mediumParagraph">
            {tableData?.count && tableData?.count > 0 && tableData?.count}
          </sup>
        </h2>
        <Button onClick={() => setAddSheetOpen(true)} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Parkovka qo'shish
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
            ) : tableData?.reservations?.length ? (
              tableData?.reservations?.map((row) => (
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
    </section>
  );
}
