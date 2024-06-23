import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryDetail from "../components/CountryDetail";
import Loader from "../components/Loader";
import data from "../../public/data.json";
import { useTranslation } from "react-i18next";

const CountryPage = () => {
  const { countryCode, language } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchCountry = () => {
      try {
        if (countryCode) {
          const foundCountry = data.find(
            (c) => c.alpha3Code.toLowerCase() === countryCode.toLowerCase()
          );
          setCountry(foundCountry);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country:", error);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <div className="w-full">
      <div>
        {loading ? (
          <Loader />
        ) : country ? (
          <CountryDetail country={country} allCountries={data} />
        ) : (
          <div>{t("countryNotFound")}</div>
        )}
      </div>
    </div>
  );
};

export default CountryPage;
