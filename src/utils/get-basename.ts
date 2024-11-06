import { loadState, saveState } from "./storage";

export const getBaseName = () => {
  const currentLangCode = loadState("locale");

  let base = window.location.pathname.split("/")[1];
  const include = ["uz", "kr", "ru"].filter((lang: string) => lang === base);

  if (include.length > 0) {
    if (currentLangCode !== base) {
      window.location.pathname = base + "/" + window.location.pathname.slice(4);
      saveState("locale", base);
    }
  } else if (window.location.pathname === "/") {
    window.location.pathname = "uz";
    base = "uz";
  } else {
    window.location.pathname =
      `${currentLangCode}/` + window.location.pathname.slice(base.length + 2);
    base = currentLangCode;
  }

  return base;
};
