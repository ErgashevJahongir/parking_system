import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "./header";
import Sidebar from "./sidebar";
import { useAuthStore } from "@/store/authStore";

const Layout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate()
  const { user, token } = useAuthStore((state) => state);

  useEffect(() => {
    if (!user && !token) {
      navigate("/login")
    }

    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, user, token, navigate]);

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
