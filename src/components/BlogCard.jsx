import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";
function BlogCard({ post, isLoading }) {
  const { image, category, title, description, author, date } = post;
  const formattedDate = formatDate(date);

  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-4">
          <Link
            to={`post/${post.id}`}
            className="relative h-[212px] sm:h-[360px]"
          >
            <img
              className="w-full h-full object-cover rounded-md"
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
                className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline"
              >
                {title}
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
              {description}
            </p>
            <div className="flex items-center text-sm">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                alt="Tomson P."
              />
              <span>{author}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogCard;
