import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import useLocalStorage from "../hooks/useLocalStorage";

function DarkMode() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useLocalStorage(
    "darkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <button onClick={toggleDarkMode} className="flex items-center">
      <div className="p-2 pr-0 text-lg">
        {darkMode ? (
          <IoSunnyOutline className="" />
        ) : (
          <IoMoonOutline className="" />
        )}
      </div>
      <span className="py-2 min-[570px]:p-2 pl-0 transition-opacity duration-500 ease-in-out font-bold text-lg">
        {darkMode ? t("light_mode") : t("dark_mode")}
      </span>
    </button>
  );
}

export default DarkMode;
