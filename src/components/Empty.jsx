import { useTranslation } from "react-i18next";

function Empty() {
  const { t } = useTranslation();
  return (
    <div className="my-10 dark:text-white text-text_light text-lg sm:text-2xl font-bold">
      {t("ncf")}
    </div>
  );
}

export default Empty;
