import { Loader } from "lucide-react";

function PageLoading() {
  return (
    <section className="flex items-center justify-center pageSreenHeight">
      <Loader className="mx-auto size-10 animate-spin" />
    </section>
  );
}

export default PageLoading;
