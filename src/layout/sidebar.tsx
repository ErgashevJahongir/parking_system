import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleDollarSign, SquareParking, Store, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation()

  return (
    <aside className="sticky hidden w-full border-r-2 screenHeight max-w-16 lg:max-w-20 md:block">
      <nav className="my-3">
        <ul className="flex flex-col items-center justify-center gap-2 mx-auto">
          <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              (pathname === "/" || pathname.includes("/store")) && "bg-accent"
            )}
          >
            <Link className="flex" to="/">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Store className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("shops")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
          <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              pathname === "/debetor-stores" && "bg-accent"
            )}
          >
            <Link className="flex" to="/debetor-stores">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleDollarSign className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("debt_shops")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
          {/* <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              pathname === "/report-stores" && "bg-accent"
            )}
          >
            <Link className="flex" to="/report-stores">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ChartPie className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("statistic")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li> */}
          <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              pathname === "/client" && "bg-accent"
            )}
          >
            <Link className="flex" to="/client">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <User className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("Mijozlar")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
          <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              pathname === "/parking-type" && "bg-accent"
            )}
          >
            <Link className="flex" to="/parking-type">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SquareParking className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("Parkovka turlari")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
