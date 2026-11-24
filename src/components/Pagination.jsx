function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        &laquo;
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
