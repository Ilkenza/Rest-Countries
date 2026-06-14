import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useFilters = (initialFilters) => {
    const [filterOption, setFilterOption] = useLocalStorage("filterOption", initialFilters);
    const location = useLocation();
    const navigate = useNavigate();
    const isInitialRun = useRef(true);

    const updateURLParameters = (filters, resetPage) => {
        // Start from the current query so unrelated params (e.g. sort) survive.
        const params = new URLSearchParams(location.search);
        ["unMember", "region", "subRegion", "timeZone"].forEach((key) =>
            params.delete(key)
        );
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
        // Go back to the first page on an actual filter change.
        if (resetPage) {
            params.set("page", "1");
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
        // Don't reset the page on the initial hydration (preserves deep links);
        // only reset it when the user actually changes a filter.
        updateURLParameters(filterOption, !isInitialRun.current);
        isInitialRun.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
