import { useTranslation } from "react-i18next";
import { INotificationFormProps } from "./index.type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/multi-select";

const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function NotificationForm({
  form,
  handleSubmit,
  buttonText,
  isLoading,
}: INotificationFormProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid w-full gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("title")}</FormLabel>
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
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("description")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("enter")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="stores"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("stores")}</FormLabel>
              <FormControl>
                <MultiSelect
                  options={frameworksList}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder={t("select")}
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading ? <Loader className="mr-2 animate-spin" /> : null}
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
