import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles/commonStyles";

function Empty() {
  const { t } = useTranslation();
  const { textMode, boldTextLG } = commonStyles;
  return (
    <div className={`${textMode} ${boldTextLG} my-10 sm:text-2xl`}>
      {t("ncf")}
    </div>
  );
}

export default Empty;
