import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles/commonStyles";

const PageNotFound = () => {
  const { t } = useTranslation();
  const { textMode, flexCenterCol } = commonStyles;

  return (
    <div className={`${textMode} ${flexCenterCol} font-bold h-[90vh]`}>
      <h1 className="text-5xl">{t("page_not_found")}😥</h1>
      <p className="mt-4 text-md">{t("page_not_found_description")}</p>
    </div>
  );
};

export default PageNotFound;
