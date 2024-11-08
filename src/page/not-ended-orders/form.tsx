import { useTranslation } from "react-i18next";
import { IParkingFormProps } from "./index.type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useList } from "../parking-type/services";
import { useList as useListClient } from "../admin/services";

export default function ParkingForm({
  form,
  handleSubmit,
  buttonText,
  isLoading,
}: IParkingFormProps) {
  const { t } = useTranslation();
  const {
    data: parkingType,
  } = useList(1, 100, null);
  const {
    data: clientData
  } = useListClient(1, 100, null);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid w-full gap-4">
        <FormField
          control={form.control}
          name="car_number"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("Mashina raqami")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("enter")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="parking_rate_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("Turi")}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Turini tanlang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        parkingType?.parking_rates?.map((item) => {
                          return <SelectItem key={item.id} value={item.id}>{item.type}</SelectItem>
                        })
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("Mijoz")}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mijozni tanlang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        clientData?.clients?.map((item) => {
                          return <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        })
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button disabled={isLoading}>
          {isLoading ? <Loader className="mr-2 animate-spin" /> : null}
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
