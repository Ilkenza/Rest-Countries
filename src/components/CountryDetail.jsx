/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { BsArrowLeft } from "react-icons/bs";
import Empty from "./Empty";
import { commonStyles } from "../styles/commonStyles";
import DataComponent from "./DataComponent";
import { useCountryUtils } from "../utils/countryUtils";

const CountryDetail = ({ country, allCountries }) => {
  const { t } = useTranslation();
  const { details } = DataComponent(country);

  const {
    textMode,
    bgMode,
    flexCenter,
    fontExtralight,
    flexCol,
    flexJCenter,
    flexCenterStartCol,
    flexItemsCenterCol,
    boldPb,
    fullWH,
    spaceX,
    underlinePy,
  } = commonStyles;

  const {
    getBorderCountryName,
    handleBorderClick,
    handleGoogleMapClick,
    handleBackClick,
  } = useCountryUtils(allCountries);

  if (!country) return <Empty />;

  return (
    <div className={`${textMode} ${flexCenter} ${fullWH} p-4 min-[950px]:p-8`}>
      <div
        className={`${flexItemsCenterCol} ${fullWH} min-[950px]:flex-row  justify-end min-[950px]:justify-evenly mt-28`}
      >
        <div
          className={`${flexCenterStartCol} ${fullWH} min-[950px]:w-[40rem]`}
        >
          <button
            onClick={handleBackClick}
            className={`${textMode} ${bgMode} font-semibold py-2 px-6 inline-flex rounded-lg items-center`}
          >
            <BsArrowLeft className="mr-2" />
            {t("back")}
          </button>
          <div className="relative w-full">
            <img
              src={country.flags.png}
              alt={`${country.name} flag`}
              className="object-contain min-[500px]:h-[35rem] w-full py-10"
            />
          </div>
        </div>
        <div
          className={`${flexJCenter} ${flexCol} space-y-6 px-0 min-[560px]:px-8 max-w-[40rem] w-full min-[950px]:w-[40rem]`}
        >
          <h1 className={`${boldPb} text-3xl`}>
            {t(`country.${country.name}`)}
          </h1>
          <div
            className={`${flexCol} min-[560px]:flex-row justify-between min-[560px]:space-x-4`}
          >
            <div className="space-y-2">
              {details.slice(0, 5).map(({ label, value }) => (
                <p key={label}>
                  {t(label)}:{" "}
                  <span className={`${fontExtralight}`}>{value}</span>
                </p>
              ))}
            </div>
            <div className="mt-8 mb-3 min-[560px]:my-0 space-y-2">
              {details.slice(5).map(({ label, value }) => (
                <p key={label}>
                  {t(label)}:{" "}
                  <span className={`${fontExtralight}`}>{value}</span>
                </p>
              ))}
            </div>
          </div>
          {country.borders && country.borders.length > 0 && (
            <div
              className={`${flexCol} min-[950px]:flex-row items-start min-[950px]:items-center`}
            >
              <p className="mr-3 mb-3 min-[950px]:mb-0">
                {t("border_countries")}:
              </p>
              <div className={`${spaceX}`}>
                {country.borders
                  .map(getBorderCountryName)
                  .filter(Boolean)
                  .map((borderName) => (
                    <button
                      key={borderName}
                      onClick={() => handleBorderClick(borderName)}
                      className={`${textMode} ${fontExtralight} ${bgMode} py-1 px-3 rounded-sm mb-2`}
                    >
                      {borderName}
                    </button>
                  ))}
              </div>
            </div>
          )}
          <div>
            <button
              onClick={() => handleGoogleMapClick(country.name)}
              className={`${textMode} ${underlinePy}`}
            >
              {t("Cogm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
