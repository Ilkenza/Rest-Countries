import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles/commonStyles";

const Footer = () => {
  const { t } = useTranslation();
  const { textMode, flexCenter, underlinePy } = commonStyles;
  // Auto-updates every year — no manual change needed.
  const year = new Date().getFullYear();

  return (
    <footer className={`${textMode} ${flexCenter} w-full py-6 text-sm`}>
      <p className="opacity-80">
        {t("Madeby")}{" "}
        <a
          href="https://linktr.ee/ilkenza"
          target="_blank"
          rel="noopener noreferrer"
          className={`${underlinePy} font-semibold hover:opacity-70`}
        >
          Korodić Ilija
        </a>{" "}
        © {year}
      </p>
    </footer>
  );
};

export default Footer;
