import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGlobeOutline } from "react-icons/io5";
import { commonStyles } from "../styles/commonStyles";
import DataComponent from "./DataComponent";
import useChangeLanguage from "../hooks/useChangeLanguage";

function Languages() {
  const { t } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const sortingRef = useRef(null);
  const { languages } = DataComponent();
  const {
    bgMode,
    flexCenterItems,
    flexCol,
    transOpacity,
    transAll,
    absP2RoundShadow,
    flexItemsCenterCol,
  } = commonStyles;

  useClickOutside(sortingRef, () => {
    setShowLanguageDropdown(false);
  });
  const changeLanguage = useChangeLanguage(setShowLanguageDropdown);

  return (
    <div className="relative">
      <button
        className={`${flexItemsCenterCol} relative border-text_light border-1`}
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        ref={sortingRef}
      >
        <div className={`${flexCenterItems} text-lg py-2 pl-2 min-[370px]:p-2`}>
          <IoGlobeOutline />
          <IoMdArrowDropdown
            className={`${transAll} ${
              showLanguageDropdown ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`${bgMode} ${flexCol} ${transAll} ${absP2RoundShadow} top-10 right-0 ${
          showLanguageDropdown
            ? "opacity-100 max-h-60"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {languages.map((language) => (
          <button
            key={language.code}
            className={`${transOpacity} cursor-pointer my-1 
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
