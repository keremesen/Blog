import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";
import { fetchBlogs, searchBlogFunc } from "../redux/blogSlice";
import BlogCard from "../components/BlogCard";
import { modalFunc } from "../redux/modalSlice";
import Modal from "../components/Modal";
import { MdPostAdd } from "react-icons/md";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error, keyword } = useSelector(
    (state: RootState) => state.blogs
  );
  const { modal } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredBlog = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return (
    <main className="flex flex-col flex-1 items-center bg-zinc-50">
      <div className="flex items-center justify-end w-full my-4 lg:w-1/2">
        <div className="relative w-2/3 md:w-1/2">
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

      {loading && <Spinner />}
      {error && "Error"}
      <div className="flex flex-wrap items-center w-3/4 justify-center">
        {filteredBlog?.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
    </main>
  );
};

export default Home;