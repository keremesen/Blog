import React from "react";
import BlogCard from "../components/BlogCard";
import Modal from "../components/Modal";
import { modalFunc } from "../app/features/modal/modalSlice";
import { searchBlogFunc } from "../app/features/blog/blogSlice";
import { useFetchBlogsQuery } from "../app/features/blog/blogsApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { MdPostAdd } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useFetchBlogsQuery();
  const { keyword } = useAppSelector((state) => state.blogs);
  const { modal } = useAppSelector((state) => state.modal);

  let filteredBlog = data?.filter((blog) =>
    blog.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (isError) {
    toast.error("Failed to fetch!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <main className="flex flex-col flex-1 items-center bg-zinc-50">
      <div className="flex items-center justify-center  w-full my-4 lg:w-1/2 ">
        <div className="relative w-2/3 sm:w-1/3 lg:w-1/2 xl:w-1/3">
          <input
            className="w-full h-10 px-4 py-2 border rounded-lg border-zinc-500 text-zinc-800 outline-none placeholder-zinc-500"
            type="text"
            placeholder="Search..."
            onChange={(e) => dispatch(searchBlogFunc(e.target.value))}
          />
        </div>
        <button
          className="ml-4 p-2 bg-zinc-800 rounded-full hover:bg-zinc-900 text-white transition duration-300"
          onClick={() => dispatch(modalFunc())}
        >
          <MdPostAdd size={24} />
        </button>
        {modal && <Modal />}
      </div>
      <div className="flex flex-wrap items-center w-3/4 justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          filteredBlog?.map((blog) => <BlogCard key={blog.id} data={blog} />)
        )}
      </div>
    </main>
  );
};

export default Home;
