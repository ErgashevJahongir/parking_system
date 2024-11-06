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
import { INotification } from "./index.type";
import { loadState } from "@/utils/storage";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, useDebounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NotificationUpdate from "./update";
import NotificationCreate from "./create";
import dayjs from "dayjs";
import { IStore } from "../shops/index.type";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

const storeData: IStore[] = [
  {
    id: 1,
    title: "Example Title 1",
    boss: "Boss Name 1",
    manager: "Manager Name 1",
    responsible_person: "Responsible Person 1",
    password: "password123",
    username: "username1",
    additional_phone_number: "1234567890",
    phone_number: "0987654321",
    location: "Location 1",
    amount: 100,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    payment_list: []
  },
  {
    id: 2,
    title: "Example Title 2",
    boss: "Boss Name 2",
    manager: "Manager Name 2",
    responsible_person: "Responsible Person 2",
    password: "password456",
    username: "username2",
    additional_phone_number: "2345678901",
    phone_number: "9876543210",
    location: "Location 2",
    amount: 200,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    payment_list: []
  },
  {
    id: 3,
    title: "Example Title 3",
    boss: "Boss Name 3",
    manager: "Manager Name 3",
    responsible_person: "Responsible Person 3",
    password: "password789",
    username: "username3",
    additional_phone_number: "3456789012",
    phone_number: "8765432109",
    location: "Location 3",
    amount: 300,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    payment_list: []
  }
]

const data: INotification[] = [
  {
    id: 1,
    title: "Example Title 1",
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    description: "description2",
    stores: [storeData[1], storeData[2]]
  },
  {
    id: 2,
    title: "Example Title 2",
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    description: "description2",
    stores: [storeData[1], storeData[2]]
  },
  {
    id: 3,
    title: "Example Title 3",
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    description: "description2",
    stores: [storeData[1], storeData[0]]
  }
]

export default function NotificationPage() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

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

  useEffect(() => {
    const storedData = JSON.parse(window.localStorage.getItem("columnVisibilityNotification") || "{}")
    if (storedData) {
      setColumnVisibility(storedData)
    }
  }, [])

  const columns: ColumnDef<INotification>[] = [
    {
      accessorKey: "id",
      meta: t("id"),
      header: t("id"),
    },
    {
      accessorKey: "created_at",
      meta: t("created_at"),
      header: t("created_at"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("created_at")}</p>,
    },
    {
      accessorKey: "title",
      meta: t("title_notification"),
      header: t("title_notification"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("title")}</p>,
    },
    {
      accessorKey: "stores",
      meta: "Do'konlar",
      header: "Do'konlar",
      cell: ({ row }) => <div className="flex items-center whitespace-nowrap">{row.original.stores?.map((item) => {
        return <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar>
                <AvatarFallback>{item?.title && Array.from(item?.title)[0]}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item?.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      })}</div>,
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
                // setEditId(row.original.id);
                // setTimeout(() => setEditSheetOpen(true), 200);
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
    data,
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
          Bildirishnomalar
          <sup className="text-mediumParagraph">
            {tableData?.total_count && tableData?.total_count > 0 && tableData?.total_count}
          </sup>
        </h2>
        <Button onClick={() => setAddSheetOpen(true)} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Bildirishnoma qo'shish
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
                            "columnVisibilityNotification",
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
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return(
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
              )})
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
      <NotificationCreate
        setSheetOpen={setAddSheetOpen}
        sheetOpen={addSheetOpen}
        refetch={refetch}
      />
      <NotificationUpdate
        setSheetOpen={setEditSheetOpen}
        sheetOpen={editSheetOpen}
        refetch={refetch}
        id={editId}
        setEditId={setEditId}
      />
    </section>
  );
}
