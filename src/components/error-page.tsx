import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Unknown error";
    }
  }

  function goHome() {
    navigate("/");
  }

  return (
    <div id="error-page" className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-semibold">Uxxx!</h1>
        <p className="mt-5 mb-5 text-2xl font-semibold">Shu yerda nimadir xato ketdi.</p>
        <p className="text-xl font-semibold">
          <i>{errorMessage(error)}</i>
        </p>
        <Button variant="secondary" onClick={goHome} className="px-10 py-2 mt-5 font-bold rounded">
          Bosh sahifaga qaytish
        </Button>
      </div>
    </div>
  );
}
