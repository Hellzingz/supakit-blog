import { Textarea } from "./ui/textarea";
import { comments } from "@/data/comments";

const CommentSection = ({ isAuthenticated, setOpen }) => {
  const handleSend = () => {
    if (!isAuthenticated) {
      setOpen(true);
      return;
    }
  };
  return (
    <div className="mt-10">
      <div className="mb-20">
        <h3 className="text-lg font-semibold mb-2">Comment</h3>
        <div>
          <Textarea
            onFocus={() => {
              if (!isAuthenticated) {
                setOpen(true);
              }
            }}
            placeholder="What are your thoughts?"
            className="w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSend}
              className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <div className="flex gap-5">
              <img
                src={comment.image}
                alt={comment.name}
                className="rounded-full size-12 object-cover"
              />
              <div>
                <div className="flex flex-col items-start justify-between">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
              </div>
            </div>
            <p className=" text-gray-600">{comment.comment}</p>
            {index < comments.length - 1 && (
              <hr className="border-gray-300 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CommentSection;
