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
import { ChevronDownIcon, HandCoins, Loader, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { useDelete, useList, useListParking } from "./services";
import { IClient, IClientListResponse } from "./index.type";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import dayjs from "dayjs";
import LoadingComp from "@/components/loadingComp";
import { IParking } from "../parkings/index.type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

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

interface ColumnClient {
  id: string;
  header: string;
  accessorKey: keyof IClient | "action";
  cell: (row: IClient) => JSX.Element;
}

export default function ClientPage() {
  const { t } = useTranslation();
  const [pageFilter, setPageFilter] = useState<IPageFilter>({
    page: 1,
    size: loadState("table-limit") || 10,
    searchValue: null,
  });
  const { data, refetch } = useList(pageFilter?.page, pageFilter?.size, pageFilter.searchValue);
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [payMonitoringSheetOpen, setPayMonitoringSheetOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { data: userParkings, isLoading: userParkingsLoading } = useListParking(pageFilter?.page, pageFilter?.size, null, userId as string, !!userId);

  const columnsParking: Column[] = [
    {
      id: "id",
      header: t("id"),
      accessorKey: "id",
      cell: (row) => <p>{row.id}</p>,
    },
    // {
    //   id: "type",
    //   header: t("Turi"),
    //   accessorKey: "type",
    //   cell: (row) => <p>{row.type}</p>,
    // },
    {
      id: "car_number",
      header: t("Mashina raqami"),
      accessorKey: "car_number",
      cell: (row) => <p>{row.car_number}</p>,
    },
    {
      id: "start_time",
      header: t("Kirish vaqti"),
      accessorKey: "start_time",
      cell: (row) => <p>{dayjs(row.start_time).format("YYYY-MM-DD HH:mm:ss")}</p>,
    },
    {
      id: "end_time",
      header: t("Chiqish vaqti"),
      accessorKey: "end_time",
      cell: (row) => <p>{row.end_time ? dayjs(row.end_time).format("YYYY-MM-DD HH:mm:ss") : ""}</p>,
    },
    // {
    //   id: "summ",
    //   header: t("Summa"),
    //   accessorKey: "summ",
    //   cell: (row) => <p>{row.summ}</p>,
    // },
    {
      id: "action",
      header: t("Action"),
      accessorKey: "action",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* <Button onClick={() => { setParkingId(row.id); }} role="none" size="icon" className="size-8 md:size-10" variant="secondary">
                <CircleX className="w-4 h-4 text-destructive md:h-5 md:w-5" />
              </Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="mb-5">
                <AlertDialogTitle>{row.summ || 0} so'm</AlertDialogTitle>
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
                // onClick={() => {
                //   handleDelete(row.id);
                // }}
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
          Mijozlar
          <sup className="text-mediumParagraph ml-1.5">
            {data?.count && data?.count > 0 && data?.count}
          </sup>
        </h2>
        <Button onClick={() => setAddSheetOpen(true)} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Mijoz qo'shish
        </Button>
      </div>
      <TableComp
        data={data?.clients}
        setPageFilter={setPageFilter}
        refetch={refetch}
        setEditId={setEditId}
        setEditSheetOpen={setEditSheetOpen}
        setUserId={setUserId}
        setPayMonitoringSheetOpen={setPayMonitoringSheetOpen}
      />
      <Sheet
        open={payMonitoringSheetOpen}
        onOpenChange={(open) => {
          setPayMonitoringSheetOpen(open);
          !open && setUserId(null);
        }}
      >
        <SheetContent
          className="md:max-w-[700px] lg:max-w-[900px]"
          side="right"
        >
          <SheetDescription className="hidden">hide</SheetDescription>
          <SheetHeader>
            <SheetTitle className="text-left">Mijoz parkovkalari</SheetTitle>
          </SheetHeader>
          {userParkingsLoading ? (
            <div className="h-[200px] flex items-center justify-center">
              <LoadingComp />
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div>
                <div className="relative max-h-[70vh] w-full overflow-y-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columnsParking.map((column) => {
                          return <TableHead className="sticky top-0 z-[1]" key={column.id}>
                            {column.header}
                          </TableHead>;
                        })}
                      </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                      {userParkings?.reservations?.length ? (
                        userParkings?.reservations?.map((row) => (
                          <TableRow key={row.id}>
                            {columnsParking.map((column) => {
                              return <TableCell key={column.id}>{column.cell(row)}</TableCell>;
                            })}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="h-[62vh] w-full">
                          <TableCell rowSpan={5} colSpan={columnsParking.length} className="h-24 text-center">
                            Ma'lumot topilmadi.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
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

const TableComp = ({ setPageFilter, refetch, data, setPayMonitoringSheetOpen, setUserId, setEditSheetOpen, setEditId }: {
  setPageFilter: Dispatch<SetStateAction<IPageFilter>>,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IClientListResponse, Error>>,
  data?: IClient[],
  setEditId: Dispatch<SetStateAction<string | null>>,
  setPayMonitoringSheetOpen: Dispatch<SetStateAction<boolean>>,
  setUserId: Dispatch<SetStateAction<string | null>>,
  setEditSheetOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation();
  const debouncedSearch = useDebounce((newQuery: string) => {
    refetch();
    setPageFilter((prev) => ({
      ...prev,
      page: 1,
      searchValue: newQuery === "" ? null : newQuery,
    }));
  }, 1000);
  const { mutate, isPending: isLoadingDelete } = useDelete();
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  // Load column visibility from localStorage on initial render
  useEffect(() => {
    const storedVisibility = window.localStorage.getItem("columnVisibilityParking");
    if (storedVisibility) {
      setColumnVisibility(JSON.parse(storedVisibility));
    }
  }, []);

  const toggleColumnVisibility = (columnId: string, value: boolean) => {
    const updatedVisibility = { ...columnVisibility, [columnId]: value };
    setColumnVisibility(updatedVisibility);

    // Save the updated visibility in localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("columnVisibilityParking", JSON.stringify(updatedVisibility));
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

  const columns: ColumnClient[] = [
    {
      id: "id",
      header: t("id"),
      accessorKey: "id",
      cell: (row) => <p>{row.id}</p>,
    },
    {
      id: "created_at",
      header: t("created_at"),
      accessorKey: "created_at",
      cell: (row) => <p>{dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>,
    },
    {
      id: "name",
      header: t("FISH"),
      accessorKey: "name",
      cell: (row) => <p>{row.name}</p>,
    },
    {
      id: "phone_number",
      header: t("Telefon nomeri"),
      accessorKey: "phone_number",
      cell: (row) => <p>{row.phone_number}</p>,
    },
    // {
    //   id: "cars",
    //   header: t("Mashinalar"),
    //   accessorKey: "cars",
    //   cell: (row) => <p>{row.cars}</p>, // Update this to display cars correctly, not phone number
    // },
    {
      id: "action",
      header: t("Action"),
      accessorKey: "action",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setUserId(row.id);
              setTimeout(() => setPayMonitoringSheetOpen(true), 200);
            }}
            size="icon"
            className="size-8 md:size-10"
            variant="secondary"
          >
            <HandCoins className="w-4 h-4 md:h-5 md:w-5" />
          </Button>
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
    <>
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
            {isLoadingDelete ? (
              <TableRow className="h-[62vh] w-full">
                <TableCell rowSpan={5} colSpan={columns.length} className="h-24 text-center">
                  <Loader className="mx-auto size-10 animate-spin" />
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              data?.map((row) => (
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
    </>
  )
}