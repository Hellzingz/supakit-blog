import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/utils/date";

function PostPage() {
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

  return (
    <section className="container mx-auto mt-10">
      <div className="flex flex-col gap-4">
        <img className="w-full rounded-xl" src={data.image} alt={data.title} />
        <div>
          <div className="flex gap-5 items-center">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
              {data.category}
            </span>
            <span>{formatDate(data.date)}</span>
          </div>
          <h1 className="text-4xl font-semibold">{data.title}</h1>
          <div className="markdown">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
          <p>{data.description}</p>
        </div>
      </div>
    </section>
  );
}
export default PostPage;
