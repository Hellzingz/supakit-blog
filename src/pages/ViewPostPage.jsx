import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/utils/date";
import LikeComment from "@/components/LikeComment";
import { comments } from "@/data/comments";
import PersonalCard from "@/components/PersonalCard";

function ViewPostPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  async function getData() {
    const { data } = await axios.get(
      `https://blog-post-project-api.vercel.app/posts/${id}`
    );
    setData(data);
  }

  useEffect(() => {
    getData();
  }, [id]);

  // Share

  return (
    <section className="mx-auto px-5 mt-5">
      {/* Content */}
      <main className="flex flex-col gap-4">
        <img
          className="rounded-xl w-[1200px] h-[587px]"
          src={data.image}
          alt={data.title}
        />
        <div className="max-w-300 mt-5">
            <div className="flex gap-3">
              <button className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                {data.category}
              </button>
              <span>{formatDate(data.date)}</span>
            </div>
            <div className="flex gap-5 items-start">
              <div className="mt-10 flex-1">
                <h1 className="text-4xl font-semibold">{data.title}</h1>
                <div className="markdown">
                  <ReactMarkdown>{data.content}</ReactMarkdown>
                </div>
                <p>{data.description}</p>
                <div className="sm:hidden">
        <PersonalCard />
      </div>
                <LikeComment comments={comments} />
              </div>
              <div className="hidden sm:block sticky top-0 self-start w-80">
                <PersonalCard />
              </div>
            </div>
        </div>
      </main>
    </section>
  );
}
export default ViewPostPage;
