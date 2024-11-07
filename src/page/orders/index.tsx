import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  HandCoins,
  Loader,
  Lock,
  LockKeyholeOpen,
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
  useCreatePayment, useDelete,
  // useDetails,
  useList
} from "./services";
import { IPayment, IStore } from "./index.type";
import { loadState } from "@/utils/storage";
import { useDebounce } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import LoadingComp from "@/components/loadingComp";
import dayjs from "dayjs";
import { TableColumnHide } from "@/page/orders/components/table-column-hide";
import { data } from "@/mock";

interface IPageFilter {
  page: number;
  size: number;
  searchValue: string | null;
}

const formSchema = z.object({
  amount: z.coerce
    .number({
      message: "Maydonni to'ldiring!",
    })
    .min(0),
});

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

  const [payMonitoringSheetOpen, setPayMonitoringSheetOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<IStore | null>(null);
  // const { data: singleData, isLoading: singleLoading } = useDetails(
  //   Number(editId) as number,
  //   !!editId,
  // );
  const { mutate: createPaymentMutate, isPending: isLoadingPayment } = useCreatePayment();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPaymentMutate(values, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }

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

  const columns: ColumnDef<IStore>[] = [
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
      accessorKey: "amount",
      meta: t("amount"),
      header: t("amount"),
      cell: ({ row }) => <p className="whitespace-nowrap">{row.original.amount}</p>,
    },
    {
      accessorKey: "created_at",
      meta: t("created_at"),
      header: t("created_at"),
      cell: () => <p className="whitespace-nowrap">{dayjs(new Date()).format("DD-MM-YYYY HH:mm")}</p>,
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
                  {row.original.block ? (
                    <LockKeyholeOpen className="w-4 h-4 text-destructive md:h-5 md:w-5" />
                  ) : (
                    <Lock className="w-4 h-4 text-destructive md:h-5 md:w-5" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="mb-5">
                  <AlertDialogTitle>
                    {row.original.block
                      ? "Haqiqatdan ham blokdan chiqarmoqchimisiz?"
                      : "Haqiqatdan ham bloklamoqchimisiz?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {row.original.block
                      ? "Agar tasdiqlasangiz do'kon blokdan chiqariladi"
                      : "Agar tasdiqlasangiz do'kon bloklanadi"}
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
    data: data,
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
          Do'konlar
          <sup className="text-mediumParagraph">
            {tableData?.total_count && tableData?.total_count > 0 && tableData?.total_count}
          </sup>
        </h2>
        <Button onClick={() => navigate("/store/create")} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Do'kon qo'shish
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
          <TableColumnHide table={table} columnVisibility={columnVisibility} />
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
            <SheetTitle className="text-left">Do'kon to'lovlari</SheetTitle>
          </SheetHeader>
          {
            // singleLoading ? (
            //   <div className="10">
            //     <LoadingComp />
            //   </div>
            // ) : (
            <div className="grid gap-4 py-4">
              <div>
                <div className="flex justify-end">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default">To'lovni tasqidlash</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogDescription className="hidden">Hide</DialogDescription>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <DialogHeader>
                            <DialogTitle>To'lovni tasdiqlash</DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center w-full">
                            <FormField
                              control={form.control}
                              name="amount"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel>To'lov miqdori</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="To'lov miqdorini kiriting"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <DialogFooter className="justify-end">
                            <DialogClose asChild>
                              <Button onClick={() => form.reset()} type="reset" variant="secondary">
                                Yopish
                              </Button>
                            </DialogClose>
                            <Button disabled={isLoadingPayment} type="submit">
                              {isLoadingPayment ? <Loader className="mr-2 animate-spin" /> : null}
                              Tasdiqlash
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                <h3 className="py-2 font-medium text-mediumParagraph">Umumiy to'lovlar</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">Id</TableHead>
                      <TableHead>To'lov</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead>Qoldiq</TableHead>
                      <TableHead className="text-right">Sanasi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editId?.payment_list.map((payment: IPayment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="py-2 md:py-2">{payment.id}</TableCell>
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
            // )
          }
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
