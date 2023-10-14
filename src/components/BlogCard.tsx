import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  data: {
    id: string;
    title: string;
    content: string;
  };
}

const BlogCard = ({ data }: BlogCardProps) => {
  return (
    <div className="flex flex-col h-96 w-72 m-2 bg-white rounded-md shadow-lg overflow-hidden">
      <img
        src="https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="blog"
        className="w-full h-40 object-cover"
      />

      <div className="flex flex-col justify-between h-full p-4 text-center">
        <div className="flex flex-col">
          <h1 className="font-semibold text-xl text-zinc-800 mb-2 truncate">
            {data.title}
          </h1>
          <p className="font-medium text-zinc-600 text-sm line-clamp-4 mb-4 break-words">
            {data.content}
          </p>
        </div>
        <Link
          to={`/blog/${data.id}`}
          className="flex items-center justify-center h-10 bg-zinc-800 text-white rounded-full hover:bg-zinc-900 transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
