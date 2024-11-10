import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Car, CircleDollarSign, SquareParking, Type, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation()

  return (
    <aside className="sticky hidden w-full bg-white border-r-2 screenHeight max-w-16 lg:max-w-20 md:block dark:bg-black">
      <nav className="my-3 bg-white dark:bg-black">
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
                    <SquareParking className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("Parkovkalar")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
          <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              pathname === "/not-ended-parking" && "bg-accent"
            )}
          >
            <Link className="flex" to="/not-ended-parking">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Car className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("Tugallanmagan parkovkalar")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
          <li
            className={cn(
              "p-2 rounded-lg hover:bg-accent",
              pathname === "/payments" && "bg-accent"
            )}
          >
            <Link className="flex" to="/payments">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleDollarSign className="size-10" />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{t("To'lovlar")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
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
                    <Type className="size-10" />
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
