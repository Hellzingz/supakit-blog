import { PropagateLoader } from "react-spinners";

const LoadingSpinner = ({ message}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <PropagateLoader color="gray" size={30} />
      {message && <p className="text-gray-800 text-2xl font-semibold mt-4">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
