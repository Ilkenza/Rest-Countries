import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGlobeOutline } from "react-icons/io5";

function Languages() {
  const { t, i18n } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const sortingRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useClickOutside(sortingRef, () => {
    setShowLanguageDropdown(false);
  });

  const changeLanguage = (lng) => {
    const currentPath = location.pathname;
    const currentParams = new URLSearchParams(location.search);
    let newPath;

    if (currentPath.includes("/country/")) {
      const parts = currentPath.split("/");
      const countryCode = parts[parts.length - 1];
      newPath = `/${lng}/country/${countryCode}`;
    } else {
      newPath = `/${lng}${currentPath.replace(`/${i18n.language}`, "")}`;
    }

    const queryParams = new URLSearchParams(currentParams);

    navigate({
      pathname: newPath,
      search: queryParams.toString(),
    });
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
  };

  const languages = [
    { code: "en", label: "english" },
    { code: "sr", label: "serbian" },
    { code: "es", label: "spanish" },
    { code: "pt", label: "portuguese" },
    { code: "fr", label: "french" },
    { code: "it", label: "italian" },
    { code: "ru", label: "russian" },
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center flex-col relative border-text_light border-1"
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        ref={sortingRef}
      >
        <div className="flex items-center text-lg py-2 pl-2 min-[370px]:p-2">
          <IoGlobeOutline />
          <IoMdArrowDropdown
            className={`transition-all duration-300 transform ${
              showLanguageDropdown ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`flex flex-col absolute top-10 right-0 bg-white dark:bg-el_dark shadow-md rounded-md p-2 transition-all duration-100 ease-in-out ${
          showLanguageDropdown
            ? "opacity-100 max-h-60"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {languages.map((language) => (
          <button
            key={language.code}
            className={`cursor-pointer my-1 transition-opacity transform duration-300 delay-150 ease-in-out
          ${showLanguageDropdown ? "opacity-100" : "opacity-0"}
        `}
            onClick={() => changeLanguage(language.code)}
          >
            {t(language.label)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Languages;
