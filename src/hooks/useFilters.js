import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useFilters = (initialFilters) => {
    const [filterOption, setFilterOption] = useLocalStorage(
        "filterOption",
        initialFilters
    );
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilterOption = {
            unMember: params.get("unMember") || filterOption.unMember || "",
            region: params.get("region") ? params.get("region").split(",") : filterOption.region || [],
            subRegion: params.get("subRegion") ? params.get("subRegion").split(",") : filterOption.subRegion || [],
            timeZone: params.get("timeZone") ? params.get("timeZone").split(",") : filterOption.timeZone || [],
        };

        // Update filter options only if they are different
        if (
            newFilterOption.unMember !== filterOption.unMember ||
            JSON.stringify(newFilterOption.region) !== JSON.stringify(filterOption.region) ||
            JSON.stringify(newFilterOption.subRegion) !== JSON.stringify(filterOption.subRegion) ||
            JSON.stringify(newFilterOption.timeZone) !== JSON.stringify(filterOption.timeZone)
        ) {
            setFilterOption(newFilterOption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, filterOption, setFilterOption]);

    const handleFilter = (option) => {
        setFilterOption(option);
        const params = new URLSearchParams();
        if (option.unMember) {
            params.set("unMember", option.unMember);
        }
        if (option.region.length) {
            params.set("region", option.region.join(","));
        }
        if (option.subRegion.length) {
            params.set("subRegion", option.subRegion.join(","));
        }
        if (option.timeZone.length) {
            params.set("timeZone", option.timeZone.join(","));
        }
        navigate(`?${params.toString()}`);
    };

    const handleResetFilters = () => {
        setFilterOption({
            unMember: "",
            region: [],
            subRegion: [],
            timeZone: [],
        });
        navigate(`/`);
    };

    return { filterOption, handleFilter, handleResetFilters };
};

export default useFilters;
