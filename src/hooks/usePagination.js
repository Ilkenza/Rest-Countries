import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const usePagination = (initialPage, totalItems, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useLocalStorage("currentPage", initialPage);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = Number(params.get("page")) || initialPage;
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }, [location.search, initialPage, currentPage, setCurrentPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("page", page);
        navigate({ search: queryParams.toString() });
    };

    // If the result set shrinks (e.g. after filtering/searching) and the current
    // page no longer exists, fall back to the first page so the list isn't blank.
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            handlePageChange(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPages]);

    return { currentPage, totalPages, handlePageChange };
};

export default usePagination;
