import { useTranslation } from "react-i18next";

const DataComponent = (country, data) => {
    const { t } = useTranslation();

    const countryDetails = country ? [
        { label: t("populationn"), value: country.population.toLocaleString() },
        { label: t("regionn"), value: country.region },
        { label: t("capitall"), value: country.capital },
    ] : [];

    const details = country ? [
        { label: "native_name", value: country.nativeName },
        { label: "populationn", value: country.population.toLocaleString() },
        { label: "regionn", value: t(`region.${country.region}`) },
        { label: "subregionn", value: t(`subRegion.${country.subregion}`) },
        { label: "capitall", value: country.capital },
        { label: "top_level_domain", value: country.topLevelDomain },
        {
            label: "currencies",
            value: country.currencies?.map((currency) => currency.name).join(", "),
        },
        {
            label: "languages",
            value: country.languages?.map((language) => language.name).join(", "),
        },
    ] : [];

    const sortCountries = (countries, sortOption) => {
        const translatedCountries = countries.map((country) => ({
            ...country,
            translatedName: t(`country.${country.name}`),
        }));

        switch (sortOption) {
            case "name-asc":
                return translatedCountries.sort((a, b) =>
                    a.translatedName.localeCompare(b.translatedName, "pt")
                );
            case "name-desc":
                return translatedCountries.sort((a, b) =>
                    b.translatedName.localeCompare(a.translatedName, "pt")
                );
            case "population-asc":
                return countries.sort((a, b) => a.population - b.population);
            case "population-desc":
                return countries.sort((a, b) => b.population - a.population);
            default:
                return countries;
        }
    };

    const languages = [
        { code: "en", label: "english" },
        { code: "sr", label: "serbian" },
        { code: "es", label: "spanish" },
        { code: "pt", label: "portuguese" },
        { code: "fr", label: "french" },
        { code: "it", label: "italian" },
        { code: "ru", label: "russian" },
    ];

    const sortOptions = [
        { value: "name-asc", label: t("sortByNameAsc") },
        { value: "name-desc", label: t("sortByNameDesc") },
        { value: "population-asc", label: t("sortByPopulationAsc") },
        { value: "population-desc", label: t("sortByPopulationDesc") },
    ];

    const categories = data ? [
        {
            label: t("unMember"),
            data: [
                { value: "true", label: "yes" },
                { value: "false", label: "no" },
            ],
            name: "unMember",
            translate: true,
        },
        {
            label: t("regionn"),
            data: data.regions.map((region) => ({
                value: region,
                label: `region.${region}`,
            })),
            name: "region",
            translate: true,
        },
        {
            label: t("subregionn"),
            data: data.subRegions.map((subRegion) => ({
                value: subRegion,
                label: `subRegion.${subRegion}`,
            })),
            name: "subRegion",
            translate: true,
        },
        {
            label: t("timezone"),
            data: data.timeZones.map((timeZone) => ({
                value: timeZone,
                label: timeZone,
            })),
            name: "timeZone",
            translate: false,
        },
    ] : [];

    return { countryDetails, details, sortCountries, languages, sortOptions, categories };
};

export default DataComponent;
