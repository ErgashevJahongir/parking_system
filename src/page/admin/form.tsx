import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { IAdminForm } from "./index.type";

export default function ShopForm({ form, children, handleSubmit }: IAdminForm) {
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("first_name")}</FormLabel>
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
            name="last_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("last_name")}</FormLabel>
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
            name="admin_type"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("admin_type")}</FormLabel>
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
                  <FormLabel>{t("phone_number")}</FormLabel>
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
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("enter")} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("enter")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </form>
    </>
  );
}
