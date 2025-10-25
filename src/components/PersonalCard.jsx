import { Avatar } from "./ui/avatar";
function PersonalCard({ data }) {
  return (
    <div className="sticky top-5 min-h-[376px] w-full mt-10 bg-gray-100 rounded-xl flex flex-col border p-4">
      <div className="flex">
        <div className="flex gap-3 items-center">
          {data?.user?.profile_pic ? (
            <Avatar className="w-20 h-20 rounded-full">
              <img
              src={data?.user?.profile_pic}
                className="object-cover rounded-full"
                alt="Profile"
              />
            </Avatar>
          ) : (
            <Avatar className="w-20 h-20 rounded-full">
              <span className="text-gray-500 text-xl font-semibold">
                {data?.user?.name.charAt(0)}
              </span>
            </Avatar>
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
