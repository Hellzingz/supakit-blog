import { NavBar } from "@/components/NavBar";
import { DoneRight } from "@/assets/img/doneRight";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center mt-20">
        <main className="w-full max-w-[789px] bg-gray-100 rounded-sm flex justify-center items-center">
          <div className="w-full flex flex-col items-center gap-10 px-30 py-15">
            <div className="flex justify-center items-center bg-[#12B279] rounded-full w-20 h-20">
            <DoneRight width="30" height="30" color="white" />
            </div>
            <h2 className="text-[40px] font-semibold text-center">
              Registration success
            </h2>
            <div className="flex justify-center rounded-md">
              <button className="w-full max-w-[154px] bg-black text-white px-10 py-3 rounded-[999px] cursor-pointer"
              onClick={() => navigate("/")}
              >
                Home
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default RegisterSuccess;
