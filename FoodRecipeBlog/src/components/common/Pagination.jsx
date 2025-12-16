import React from "react";

const Pagination = ({
  totalItems = 0,
  pageSize = 6,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (!totalItems || totalPages <= 1) {
    return null;
  }

  const handleChange = (page) => {
    if (page < 1 || page > totalPages) return;
    if (typeof onPageChange === "function" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination mb-0">
      <li className={`page-item${!canGoPrev ? " disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChange(currentPage - 1);
          }}
          aria-label="Previous"
        >
          <i className="fas fa-arrow-left" />
        </a>
      </li>

      {pages.map((p) => (
        <li
          key={p}
          className={`page-item${p === currentPage ? " active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleChange(p);
            }}
          >
            {p}
            {p === currentPage && <span className="sr-only"> (current)</span>}
          </a>
        </li>
      ))}

      <li className={`page-item${!canGoNext ? " disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChange(currentPage + 1);
          }}
          aria-label="Next"
        >
          <i className="fas fa-arrow-right" />
        </a>
      </li>
    </ul>
  );
};
export default Pagination;
