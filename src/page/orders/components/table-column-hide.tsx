import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Table, VisibilityState } from "@tanstack/react-table";
import { IStore } from "../index.type";

export function TableColumnHide({columnVisibility, table}: {columnVisibility:VisibilityState, table: Table<IStore>}){
  return <DropdownMenu modal={false}>
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
}