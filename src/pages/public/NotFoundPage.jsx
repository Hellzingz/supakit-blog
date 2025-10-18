import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div className="container my-[50%] mt-50">
      <div className=" flex flex-col gap-5 items-center">
        <h1>Page Not Found</h1>
        <Link to="/">
          <button className="bg-black text-white px-3 py-3 rounded-md cursor-pointer">
            Go To Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
export default NotFoundPage;
