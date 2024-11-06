import { useState } from "react";
import { AlignJustify } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [navbarLinkSheetOpen, setNavbarLinkSheetOpen] = useState(false);

  return (
    <Sheet open={navbarLinkSheetOpen} onOpenChange={setNavbarLinkSheetOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "flex focus-visible:ring-transparent md:hidden",
          }),
        )}
        asChild
      >
        <AlignJustify className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left" >
        <SheetHeader>
          <SheetTitle className="text-left">Sahifalar</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">SIDEBAR</div>
      </SheetContent>
    </Sheet>
  );
}
