const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages   = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button
        className="btn btn-sm btn-ghost"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>

      {visible.map((page, i) => {
        const prev = visible[i - 1];
        return (
          <span key={page}>
            {prev && page - prev > 1 && (
              <span className="btn btn-sm btn-ghost btn-disabled">…</span>
            )}
            <button
              className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        className="btn btn-sm btn-ghost"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;