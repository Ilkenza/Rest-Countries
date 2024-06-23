/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const CountryCard = ({ country }) => {
  const { t, i18n } = useTranslation();
  const translatedCountryName = t(`country.${country.name}`);
  return (
    <NavLink to={`/${i18n.language}/country/${country.alpha3Code}`}>
      <div className="w-72" title={translatedCountryName}>
        <img
          src={country.flags.png}
          alt={translatedCountryName}
          className="rounded-t-lg h-48 w-full object-cover"
        />
        <div className="p-5 dark:bg-el_dark bg-white text-text_light dark:text-white rounded-b-lg">
          <h2 className="font-bold pb-3 text-xl">{translatedCountryName}</h2>
          <p>
            {t("populationn")}:{" "}
            <span className="font-extralight opacity-80">
              {country.population.toLocaleString()}
            </span>{" "}
          </p>
          <p>
            {t("regionn")}:{" "}
            <span className="font-extralight opacity-80">{country.region}</span>{" "}
          </p>
          <p>
            {t("capitall")}:{" "}
            <span className="font-extralight opacity-80">
              {country.capital}
            </span>{" "}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default CountryCard;
