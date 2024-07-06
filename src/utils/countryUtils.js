import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export const useCountryUtils = (allCountries) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

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
                `/${i18n.language}/country/${borderCode.toLowerCase()}${location.search}`
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

    return {
        getBorderCountryName,
        handleBorderClick,
        handleGoogleMapClick,
        handleBackClick,
    };
};
