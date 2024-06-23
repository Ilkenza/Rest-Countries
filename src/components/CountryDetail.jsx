/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import Empty from "./Empty";

const CountryDetail = ({ country, allCountries }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const translatedCountryName = t(`country.${country.name}`);

  if (!country) return <Empty />;

  const getBorderCountryName = (borderCode) => {
    const borderCountry = allCountries.find((c) => c.alpha3Code === borderCode);
    return borderCountry ? t(`country.${borderCountry.name}`) : null;
  };

  const getBorderCountryCode = (borderName) => {
    const borderCountry = allCountries.find(
      (c) => t(`country.${c.name}`) === borderName
    );
    return borderCountry ? borderCountry.alpha3Code : null;
  };

  const handleBorderClick = (borderName) => {
    const borderCode = getBorderCountryCode(borderName);
    if (borderCode) {
      navigate(
        `/${i18n.language}/country/${borderCode.toLowerCase()}${
          location.search
        }`
      );
    }
  };

  const handleGoogleMapClick = (countryName) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      countryName
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleBackClick = () => {
    navigate(`/${i18n.language}${location.search}`);
  };

  return (
    <div className="text-text_light dark:text-white flex justify-center items-center w-full h-full p-4 min-[950px]:p-8">
      <div className="flex flex-col min-[950px]:flex-row w-full h-full items-center justify-end min-[950px]:justify-evenly mt-28">
        <div className="flex justify-center items-start flex-col h-full w-full min-[950px]:w-[40rem]">
          <button
            onClick={handleBackClick}
            className="dark:text-white text-text_light bg-white dark:bg-el_dark font-semibold py-2 px-6 inline-flex rounded-lg items-center"
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
        <div className="flex flex-col justify-center space-y-6 px-0 min-[560px]:px-8 max-w-[40rem] w-full min-[950px]:w-[40rem]">
          <h1 className="font-bold pb-3 text-3xl">{translatedCountryName}</h1>
          <div className="flex flex-col min-[560px]:flex-row justify-between min-[560px]:space-x-4">
            <div className="space-y-2">
              <p>
                {t("native_name")}:{" "}
                <span className="font-extralight opacity-80">
                  {country.nativeName}
                </span>
              </p>
              <p>
                {t("populationn")}:{" "}
                <span className="font-extralight opacity-80">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p>
                {t("regionn")}:{" "}
                <span className="font-extralight opacity-80">
                  {t(`region.${country.region}`)}
                </span>
              </p>
              <p>
                {t("subregionn")}:{" "}
                <span className="font-extralight opacity-80">
                  {t(`subRegion.${country.subregion}`)}
                </span>
              </p>
              <p>
                {t("capitall")}:{" "}
                <span className="font-extralight opacity-80">
                  {country.capital}
                </span>
              </p>
            </div>
            <div className="mt-8 mb-3 min-[560px]:my-0 space-y-2">
              <p>
                {t("top_level_domain")}:{" "}
                <span className="font-extralight opacity-80">
                  {country.topLevelDomain}
                </span>
              </p>
              <p>
                {t("currencies")}:{" "}
                {country.currencies && country.currencies.length > 0 && (
                  <span className="font-extralight opacity-80">
                    {country.currencies.map((currency) => (
                      <span key={currency.code}>{currency.name}</span>
                    ))}
                  </span>
                )}
              </p>
              <p>
                {t("languages")}:{" "}
                {country.languages && country.languages.length > 0 && (
                  <span className="font-extralight opacity-80">
                    {country.languages.map((language) => (
                      <span key={language.iso639_1}> {language.name}</span>
                    ))}
                  </span>
                )}
              </p>
            </div>
          </div>
          {country.borders && country.borders.length > 0 && (
            <div className="flex flex-col min-[950px]:flex-row items-start min-[950px]:items-center">
              <p className="mr-3 mb-3 min-[950px]:mb-0">
                {t("border_countries")}:
              </p>
              <div className="space-x-2">
                {country.borders
                  .map(getBorderCountryName)
                  .filter(Boolean)
                  .map((borderName) => (
                    <button
                      key={borderName}
                      onClick={() => handleBorderClick(borderName)}
                      className="dark:text-white text-text_light bg-white font-extralight opacity-80 dark:bg-el_dark py-1 px-3 rounded-sm mb-2"
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
              className="dark:text-white text-text_light py-1 underline"
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
