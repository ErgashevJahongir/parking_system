import { useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Separator } from "@/components/ui/separator";

export default function UserProfilData() {
  const [navbarLinkSheetOpen, setNavbarLinkSheetOpen] = useState(false);
  const { user, setUser, setToken } = useAuthStore((state) => state);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token-parking");
    setUser(null);
    setToken(null);
    navigate("/login");
  }

  return (
    <Sheet open={navbarLinkSheetOpen} onOpenChange={setNavbarLinkSheetOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="flex hover:bg-transparent hover:opacity-100 focus-visible:ring-transparent"
          >
            <UserRound className="w-5 h-5" />
          </Button>
          <div className="hidden sm:block">
            <h4 className="font-bold text-paragraphDefault">{user?.fullname || "Jamoliddin Toshboyev"}</h4>
            <p className="text-smallparagraph">{`@${user?.phone_number || "jamoliddinadmin"}`}</p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between"
        side="right"
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="flex hover:bg-transparent hover:opacity-100 focus-visible:ring-transparent"
            >
              <UserRound className="w-5 h-5" />
            </Button>
            <div className="text-left">
              <h4 className="font-bold text-paragraphDefault">{user?.fullname || "Jamoliddin Toshboyev"}</h4>
              <p className="text-smallparagraph">{`@${user?.phone_number || "jamoliddinadmin"}`}</p>
            </div>
          </div>
          <Separator className="my-4" />
        </SheetHeader>
        <div className="flex flex-col justify-between gap-4">
          <Button
            onClick={logOut}
            size="icon"
            className="h-8 w-full bg-red-500 !text-paragraphDefault text-white hover:bg-red-500/70 md:h-10"
          >
            <LogOut className="w-4 h-4 mr-2 md:h-5 md:w-5" />
            <span>Chiqish</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
