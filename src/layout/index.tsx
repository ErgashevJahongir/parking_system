import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "./header";
import Sidebar from "./sidebar";

const Layout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div className="layout">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <main className="w-full p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
