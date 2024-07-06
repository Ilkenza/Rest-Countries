import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useChangeLanguage = (setShowLanguageDropdown) => {
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const changeLanguage = (lng) => {
        const currentPath = location.pathname;
        const currentParams = new URLSearchParams(location.search);
        let newPath;

        if (currentPath.includes("/country/")) {
            const parts = currentPath.split("/");
            const countryCode = parts[parts.length - 1];
            newPath = `/${lng}/country/${countryCode}`;
        } else {
            newPath = `/${lng}${currentPath.replace(`/${i18n.language}`, "")}`;
        }

        const queryParams = new URLSearchParams(currentParams);

        navigate({
            pathname: newPath,
            search: queryParams.toString(),
        });
        i18n.changeLanguage(lng);
        setShowLanguageDropdown(false);
    };

    return changeLanguage;
};

export default useChangeLanguage;
