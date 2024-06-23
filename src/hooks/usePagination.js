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

    return { currentPage, totalPages, handlePageChange };
};

export default usePagination;
