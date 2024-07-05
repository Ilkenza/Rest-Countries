/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { commonStyles } from "../styles/commonStyles";

const CountryCard = ({ country }) => {
  const { t, i18n } = useTranslation();
  const translatedCountryName = t(`country.${country.name}`);
  const { textMode, fontExtralight, bgMode, boldPb } = commonStyles;

  const countryDetails = [
    { label: t("populationn"), value: country.population.toLocaleString() },
    { label: t("regionn"), value: country.region },
    { label: t("capitall"), value: country.capital },
  ];

  return (
    <NavLink to={`/${i18n.language}/country/${country.alpha3Code}`}>
      <div className="w-72" title={translatedCountryName}>
        <img
          src={country.flags.png}
          alt={translatedCountryName}
          className="rounded-t-lg h-48 w-full object-cover"
        />
        <div className={`${textMode} ${bgMode} p-5 rounded-b-lg`}>
          <h2 className={`${boldPb} text-xl`}>{translatedCountryName}</h2>
          {countryDetails.map(({ label, value }) => (
            <p key={label}>
              {label}: <span className={`${fontExtralight}`}>{value}</span>
            </p>
          ))}
        </div>
      </div>
    </NavLink>
  );
};

export default CountryCard;
