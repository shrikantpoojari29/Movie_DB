import React, { useState, useEffect } from "react";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const newStartPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    setStartPage(newStartPage);
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(totalPages, startPage + 9);

    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="page-link"
            >
              Previous
            </button>
          </li>
        )}
        {renderPageNumbers().map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => onPageChange(number)}
              className={`page-link ${currentPage === number ? 'current-page' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="page-item">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="page-link"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default CustomPagination;
