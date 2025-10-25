import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";
import { Avatar } from "./ui/avatar";
function BlogCard({ post }) {
  const { image, category, title, description, date } = post;
  const formattedDate = formatDate(date);
  return (
    <>
        <div className="flex flex-col gap-4">
          <Link
            to={`post/${post.id}`}
            className="relative h-[212px] sm:h-[360px] cursor-pointer"
          >
            <img
              className="w-full h-full object-fill rounded-md"
              src={image}
              alt="Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do"
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex">
              <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                {category}
              </span>
            </div>
            <div>
              <Link
                to={`post/${post.id}`}
                className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline cursor-pointer"
              >
                {title}
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
              {description}
            </p>
            <div className="flex items-center text-sm">
              {post.user.profile_pic ? (
                <Avatar className="w-8 h-8 rounded-full mr-2">
                  <img
                  className="object-cover rounded-full"
                  src={post.user.profile_pic}
                  alt="author name"
                  />
                </Avatar>
              ) : (
                <Avatar className="w-8 h-8 rounded-full mr-2 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xl font-semibold">
                    {post.user.name.charAt(0)}
                  </span>
                </Avatar>
              )}
              <span>{post.user.name}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
    </>
  );
}

export default BlogCard;
