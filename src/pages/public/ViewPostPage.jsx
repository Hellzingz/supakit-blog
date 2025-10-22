import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import AlertLogin from "@/components/AlertLogin";
import { formatDate } from "@/utils/date";
import PersonalCard from "@/components/PersonalCard";
import useFetch from "@/hooks/useFetch";
import CommentSection from "@/components/CommentSection";
import LikeShare from "@/components/LikeShare";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

function ViewPostPage() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, state } = useAuth();
  const { id } = useParams();
  const user = state.user;

  const { data, isLoading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts/${id}`
  );
  const likes = data.likes_count;
  if (isLoading) {
    return (
      <section className="mx-auto px-5 mt-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </section>
    );
  }
  // Error state
  if (error) {
    return (
      <section className="mx-auto px-5 mt-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-5 mt-5">
      {/* Content */}
      <main className="flex flex-col gap-4">
        <img
          className="rounded-xl max-w-[1200px] max-h-[587px] px-2"
          src={data.image}
          alt={data.title}
        />
        <div className="max-w-[1200px] mt-5">
          <div className="flex gap-3">
            <button className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2 cursor-pointer">
              {data.category}
            </button>
            <span>{formatDate(data.date)}</span>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="mt-10 flex-1">
              <h1 className="text-4xl font-semibold">{data.title}</h1>
              <div className="markdown">
                <ReactMarkdown>{data.content}</ReactMarkdown>
              </div>
              <p>{data.description}</p>
              <div className="flex justify-center items-center w-full">
                <div className=" w-full max-w-[300px] sm:hidden">
                  <PersonalCard data={data} />
                </div>
              </div>

              <LikeShare
                isAuthenticated={isAuthenticated}
                likes={likes}
                user={user}
                postData={data}
                setOpen={setOpen}
              />
              <CommentSection
                isAuthenticated={isAuthenticated}
                setOpen={setOpen}
                user={user}
                postData={data}
              />
            </div>
            <div className="hidden sm:block sticky top-0 self-start w-80">
              <PersonalCard data={data} />
            </div>
          </div>
        </div>
      </main>
      <AlertLogin open={open} setOpen={setOpen} />
    </section>
  );
}
export default ViewPostPage;
