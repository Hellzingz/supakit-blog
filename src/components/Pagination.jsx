import { FaFastForward, FaFastBackward } from "react-icons/fa";

const Pagination = ({ totalPages, page, setPage }) => {
  if (totalPages > 6)
    return (
      <div className="flex gap-2">
        <button
          className="px-5 py-1 cursor-pointer"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          1
        </button>
        <button>...</button>
        <div className="flex gap-4">
          {page - 1 > 1 && (
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              {page - 1}
            </button>
          )}
          <button onClick={() => setPage(page)} disabled={page === page}>
            {page}
          </button>
          {page + 1 === totalPages ? (
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === page + 1}
            >
              {page + 1}
            </button>
          ):null}
        </div>

        {page + 1 < totalPages && (
          <button>...</button>
        )}
        <button
          className="px-5 py-1 cursor-pointer"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          {totalPages}
        </button>
      </div>
    );
  return (
    <div className="flex gap-2">
      <button
        className="px-5 py-1 cursor-pointer"
        onClick={() => setPage(1)}
        disabled={page === 1}
      >
        <FaFastBackward />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          className={`w-10 h-10 rounded-full cursor-pointer ${
            page === index + 1
              ? "bg-gray-300 text-white"
              : "bg-primary text-white"
          }`}
          disabled={page === index + 1}
          key={index}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-5 py-1 cursor-pointer"
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
      >
        <FaFastForward />
      </button>
    </div>
  );
};
export default Pagination;
