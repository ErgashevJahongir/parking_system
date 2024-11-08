import { Link } from "react-router-dom";

import { ModeToggle } from "@/components/mode-toggle";
import MobileMenu from "@/components/mobile-menu";
import UserProfilData from "@/components/user-profile-drower";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";

// import uzIcon from "@/assets/uz_svg.svg";
// import ruIcon from "@/assets/ru_svg.svg";
// import { loadState, saveState } from "@/utils/storage";

// const isEnableLang = (lang: string) => {
//   switch (lang) {
//     case "uz":
//       return true;
//     case "kr":
//       return true;
//     case "ru":
//       return true;
//     default:
//       return false;
//   }
// };

// const generateNewPath = (langCode: string) => {
//   let newPath = "";
//   const pathname = window.location.pathname;
//   const splitPath = pathname.split("/");

//   if (isEnableLang(splitPath[1])) {
//     splitPath[1] = langCode;

//     newPath = splitPath.join("/");
//   } else {
//     const beingArr = ["", langCode];
//     const arr = [...beingArr, ...splitPath.slice(1)];

//     newPath = arr.join("/");
//   }

//   return newPath;
// };

export default function Header() {
  // const { i18n } = useTranslation();
  // const lang = loadState("locale");

  // function changeLanguage(value: string) {
  //   saveState("locale", value);
  //   i18n.changeLanguage(value);
  //   window.history.pushState("", "", generateNewPath(value));
  //   window.location.reload();
  // }

  return (
    <header className="flex h-[60px] items-center justify-between gap-5 border-b-2 bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <MobileMenu />
        <Link to="/">
          <h1 className="text-2xl font-semibold">Milliy Avtoturargoh</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <img className="size-5" src={lang === "ru" ? ruIcon : uzIcon} alt="icon" />
              <span>{lang === "uz" ? "O'zbekcha" : lang === "kr" ? "Ўзбекча" : "Русский"}</span>
              {}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => changeLanguage("uz")}
                className="flex items-center gap-2"
              >
                <img className="size-5" src={uzIcon} alt="uz" />
                <span>O'zbekcha</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("kr")}
                className="flex items-center gap-2"
              >
                <img className="size-5" src={uzIcon} alt="kr" />
                <span>Ўзбекча</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("ru")}
                className="flex items-center gap-2"
              >
                <img className="size-5" src={ruIcon} alt="uz" />
                <span>Русский</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <ModeToggle />
        <UserProfilData />
      </div>
    </header>
  );
}
