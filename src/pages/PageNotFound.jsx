import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="dark:text-white font-bold text-text_light  flex flex-col items-center justify-center h-[90vh]">
      <h1 className="text-5xl">{t("page_not_found")}😥</h1>
      <p className="mt-4 text-md">{t("page_not_found_description")}</p>
    </div>
  );
};

export default PageNotFound;
