import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { IoIosSkipForward, IoIosSkipBackward } from "react-icons/io";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex gap-2 items-center">
      <button
        className={`rounded-full p-1 ${
          isFirstPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
        }`}
        onClick={() => !isFirstPage && onPageChange(1)}
        disabled={isFirstPage}
      >
        <IoIosSkipBackward size={20} />
      </button>
      <button
        className={`rounded-full p-1 ${
          isFirstPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
        }`}
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        <IoCaretBack size={20} />
      </button>
      <p className="text-sm text-black font-medium">
        {currentPage} of {totalPages}
      </p>
      <button
        className={`rounded-full p-1 ${
          isLastPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
        }`}
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        <IoCaretForward size={20} />
      </button>
      <button
        className={`rounded-full p-1 ${
          isLastPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
        }`}
        onClick={() => !isLastPage && onPageChange(totalPages)}
        disabled={isLastPage}
      >
        <IoIosSkipForward size={20} />
      </button>
    </div>
  );
};
export default Pagination;
