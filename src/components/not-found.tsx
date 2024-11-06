import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div
      id="error-page-not-found"
      className="flex flex-col items-center justify-center w-full gap-3 text-center md:gap-6"
    >
      <div>
        <img
          className="mx-auto h-[300px] w-[300px] md:h-[400px] md:w-[400px]"
          src="/404.svg"
          loading="lazy"
          width={400}
          height={400}
          alt="Not Found image"
        />
        <h1 className="font-semibold text-errorTitle">Sahifa topilmadi!</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="!text-paragraphDefault"
          type="button"
        >
          Orqaga qaytish
        </Button>
        <Link to="/">
          <Button className="!text-paragraphDefault" type="button">
            Bosh sahifa
          </Button>
        </Link>
      </div>
    </div>
  );
}
