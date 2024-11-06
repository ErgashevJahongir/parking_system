import { Button } from "@/components/ui/button";

function PageLayout({ title, buttonText }: { title: string; buttonText: string }) {
  return (
    <section className="">
      <div className="flex items-center justify-between gap-3 mb-3 md:mb-5">
        <h1 className="font-semibold text-loginTitle">{title}</h1>
        <Button type="submit">{buttonText}</Button>
      </div>
    </section>
  );
}

export default PageLayout;
