import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useFilters = (initialFilters) => {
    const [filterOption, setFilterOption] = useLocalStorage("filterOption", initialFilters);
    const location = useLocation();
    const navigate = useNavigate();

    const updateURLParameters = (filters) => {
        const params = new URLSearchParams();
        if (filters.unMember) {
            params.set("unMember", filters.unMember);
        }
        if (filters.region.length) {
            params.set("region", filters.region.join(","));
        }
        if (filters.subRegion.length) {
            params.set("subRegion", filters.subRegion.join(","));
        }
        if (filters.timeZone.length) {
            params.set("timeZone", filters.timeZone.join(","));
        }
        navigate(`?${params.toString()}`, { replace: true });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilterOption = {
            unMember: params.get("unMember") || filterOption.unMember || "",
            region: params.get("region") ? params.get("region").split(",") : filterOption.region || [],
            subRegion: params.get("subRegion") ? params.get("subRegion").split(",") : filterOption.subRegion || [],
            timeZone: params.get("timeZone") ? params.get("timeZone").split(",") : filterOption.timeZone || [],
        };

        if (
            newFilterOption.unMember !== filterOption.unMember ||
            JSON.stringify(newFilterOption.region) !== JSON.stringify(filterOption.region) ||
            JSON.stringify(newFilterOption.subRegion) !== JSON.stringify(filterOption.subRegion) ||
            JSON.stringify(newFilterOption.timeZone) !== JSON.stringify(filterOption.timeZone)
        ) {
            setFilterOption(newFilterOption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    useEffect(() => {
        updateURLParameters(filterOption);
    }, [filterOption]);

    const handleFilter = (option) => {
        setFilterOption(option);
    };

    const handleResetFilters = () => {
        const resetFilters = {
            unMember: "",
            region: [],
            subRegion: [],
            timeZone: [],
        };
        setFilterOption(resetFilters);
    };

    return { filterOption, handleFilter, handleResetFilters };
};

export default useFilters;
