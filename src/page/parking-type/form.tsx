import { useTranslation } from "react-i18next";
import { IParkingTypeFormProps } from "./index.type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function ParkingTypeForm({
  form,
  handleSubmit,
  buttonText,
  isLoading,
}: IParkingTypeFormProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid w-full gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("Turi")}</FormLabel>
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
          name="last_one_hour"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("1 soatchaga vaqt uchun narxi")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("enter")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="last_six_hour"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("6 soatchaga vaqt uchun narxi")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("enter")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="over_six_hour"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("6 soatdan ko'p vaqt uchn narxi")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("enter")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="parking_count"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("Soni")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("enter")} {...field} />
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
