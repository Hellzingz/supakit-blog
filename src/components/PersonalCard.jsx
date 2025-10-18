function PersonalCard({ data }) {
  return (
    <div className="sticky top-5 min-h-[376px] max-w-[343px] mt-10 bg-gray-100 rounded-xl flex flex-col border p-4">
      <div className="flex">
        <div className="flex gap-3 items-center">
          <img src={data?.profilePic} className="rounded-full size-20" />
          <div className="flex flex-col gap-3">
            <p className="text-sm  text-gray-400">Author</p>
            <h2 className="text-xl font-semibold">{data?.name || "Anonymous"}</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5 border-t">
        <p className="mt-3">
          {data?.bio || "No bio available"}
        </p>
      </div>
    </div>
  );
}
export default PersonalCard;
