import { useEffect, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Languages from "./Languages";
import DarkMode from "./DarkMode";
import { commonStyles } from "../styles/commonStyles";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { textMode, bgMode, flexCenter, flexCenterItems } = commonStyles;

  useEffect(() => {
    document.title = t("title");
  }, [t]);

  return (
    <header
      className={`${bgMode} ${flexCenterItems} w-full h-20 justify-around fixed z-20`}
    >
      <NavLink
        className={`${textMode} font-extrabold text-lg min-[370px]:text-xl`}
        to={`/${i18n.language}`}
      >
        <Suspense fallback="Loading...">{t("title")}</Suspense>
      </NavLink>

      <nav className={`${textMode} ${flexCenter} `}>
        <Languages />
        <DarkMode />
      </nav>
    </header>
  );
};

export default Header;
