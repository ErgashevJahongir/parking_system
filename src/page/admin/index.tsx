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
import { ChevronDownIcon, HandCoins, Loader, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
import { IClient } from "./index.type";
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
import dayjs from "dayjs";
import { IOrder } from "../orders/index.type";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

const data: IClient[] = [
  {
    id: 1,
    full_name: "Example Title 1",
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    phone_number: "description2",
    orders: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 5000000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 500000
      },
      {
        id: 10,
        amount: 400000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 200000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
    ]
  },
  {
    id: 2,
    full_name: "Example Title 2",
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    phone_number: "description2",
    orders: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 5000000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 500000
      },
      {
        id: 10,
        amount: 400000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 200000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
    ]
  },
  {
    id: 3,
    full_name: "Example Title 3",
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    phone_number: "description2",
    orders: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 5000000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 500000
      },
      {
        id: 10,
        amount: 400000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 200000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
    ]
  }
]

export default function ClientPage() {
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
  const [payMonitoringSheetOpen, setPayMonitoringSheetOpen] = useState(false);
  const [userId, setUserId] = useState<IClient | null>(null);

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
    const storedData = JSON.parse(window.localStorage.getItem("columnVisibilityClient") || "{}")
    if (storedData) {
      setColumnVisibility(storedData)
    }
  }, [])

  const columns: ColumnDef<IClient>[] = [
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
      accessorKey: "full_name",
      meta: t("FISH"),
      header: t("FISH"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("full_name")}</p>,
    },
    {
      accessorKey: "phone_number",
      meta: t("Telefon nomeri"),
      header: t("Telefon nomeri"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("phone_number")}</p>,
    },
    {
      accessorKey: "cars",
      meta: t("Mashinalar"),
      header: t("Mashinalar"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.getValue("phone_number")}</p>,
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
                setUserId(row.original);
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
          Mijozlar
          <sup className="text-mediumParagraph">
            {tableData?.total_count && tableData?.total_count > 0 && tableData?.total_count}
          </sup>
        </h2>
        <Button onClick={() => setAddSheetOpen(true)} variant="outline">
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
                            "columnVisibilityClient",
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
            <SheetTitle className="text-left">Mijov buyurtmalari</SheetTitle>
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
                  {userId?.orders.map((payment: IOrder) => (
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
