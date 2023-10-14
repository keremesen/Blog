import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import NotFound from "./NotFound";
import {
  useDeleteBlogMutation,
  useFetchSingleBlogQuery,
} from "../app/features/blog/blogsApi";

const Blog = () => {
  const params = useParams();
  const { data, isLoading, isError } = useFetchSingleBlogQuery(
    String(params.id)
  );
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(String(params.id));
        if (isError) {
          toast.error("Blog not deleted!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success("Blog deleted succesfully!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/");
        }
      }
    });
  };

  if (isError) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100">
      <div className="w-3/4 my-4">
        <button
          className=" hover:bg-zinc-200 text-black rounded-md py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          <IoArrowBackOutline size={24} />
        </button>
      </div>
      <div className="flex max-md:flex-col w-3/4 min-h-[524px] bg-white rounded-lg shadow-xl p-8">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <img
              src="https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="blog"
              className="w-full md:w-1/3 h-4/5 rounded-lg object-cover"
            />
            <div className="flex flex-col flex-1 p-4">
              <h1 className=" text-xl md:text-4xl font-bold mb-4 break-words ">
                {data?.title}
              </h1>
              <p className=" text-base md:text-lg text-gray-800 mb-4 break-words">
                {data?.content}
              </p>
              <div className="mt-auto">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 float-right"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
