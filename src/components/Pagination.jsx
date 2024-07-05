/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { commonStyles } from "../styles/commonStyles";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  const { textMode, bgMode, flexCenter } = commonStyles;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const showPagination = totalPages > 1;

  if (!showPagination) return null;

  return (
    <div className={`${flexCenter} my-10 mb-12`}>
      <div
        className={`${textMode} ${bgMode} ${flexCenter} text-xl p-2 rounded-xl`}
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <button
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className="text-2xl"
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className="mx-2">
          {t("page")} {currentPage} {t("of")} {totalPages}
        </span>
        <button
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
