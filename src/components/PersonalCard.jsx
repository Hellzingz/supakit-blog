import { UserAvartar } from "./icons/UserAvartar";
function PersonalCard({ data }) {
  return (
    <div className="sticky top-5 min-h-[376px] w-full mt-10 bg-gray-100 rounded-xl flex flex-col border p-4">
      <div className="flex">
        <div className="flex gap-3 items-center">
          {data?.user?.profile_pic ? (
            <img
              src={data?.user?.profile_pic}
              className="rounded-full size-20"
              alt="Profile"
            />
          ) : (
            <div className="rounded-full size-20 bg-gray-200 flex items-center justify-center">
              <UserAvartar />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <p className="text-sm  text-gray-400">Author</p>
            <h2 className="text-xl font-semibold">
              {data?.user?.name || "Anonymous"}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5 border-t">
        <p className="mt-3">{data?.user?.bio || "No bio available"}</p>
      </div>
    </div>
  );
}
export default PersonalCard;
