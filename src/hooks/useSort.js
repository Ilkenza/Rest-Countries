// useSort.js

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useSort = (initialSortOption = "") => {
    const [sortOption, setSortOption] = useLocalStorage("sortOption", initialSortOption); // Čita iz lokalnog skladišta

    const location = useLocation();
    const navigate = useNavigate();

    const handleSort = (option) => {
        setSortOption(option);
        updateUrlWithSort(option);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const storedSortOption = localStorage.getItem("sortOption");

        if (storedSortOption && queryParams.get("sort") !== storedSortOption) {
            queryParams.set("sort", storedSortOption);
            navigate({ search: queryParams.toString() }, { replace: true });
        }
    }, [location, navigate]);

    const updateUrlWithSort = (option) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("sort", option);
        queryParams.set("page", 1);
        navigate({ search: queryParams.toString() });
    };

    return {
        sortOption,
        handleSort,
    };
};

export default useSort;
