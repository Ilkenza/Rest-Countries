import { useEffect, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Languages from "./Languages";
import DarkMode from "./DarkMode";

const Header = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, [t]);

  return (
    <header className="w-full h-20 bg-white dark:bg-el_dark flex items-center justify-around fixed z-20">
      <NavLink
        className="dark:text-white text-text_light font-extrabold text-lg min-[370px]:text-xl"
        to={`/${i18n.language}`}
      >
        <Suspense fallback="Loading...">{t("title")}</Suspense>
      </NavLink>

      <nav className="flex items-center justify-center dark:text-white text-text_light">
        <Languages />
        <DarkMode />
      </nav>
    </header>
  );
};

export default Header;
