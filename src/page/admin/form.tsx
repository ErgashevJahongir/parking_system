import { useTranslation } from "react-i18next";
import { IClientFormProps } from "./index.type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function NotificationForm({
  form,
  handleSubmit,
  buttonText,
  isLoading,
}: IClientFormProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid w-full gap-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("FISH")}</FormLabel>
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
          name="phone_number"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("Telefon nomer")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("+998 99 123 45 65")} {...field} />
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
