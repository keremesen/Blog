import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlogs, fetchSingleBlog } from "../redux/blogSlice";
import { AppDispatch, RootState } from "../redux/store";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import NotFound from "./NotFound";

const Blog = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { singleBlog, loading } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchSingleBlog({ id: params.id }));
  }, [dispatch, params.id]);

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
        dispatch(deleteBlogs({ id: params.id }));
        navigate("/");
        toast.success("Blog deleted succesfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };

  if (Object.keys(singleBlog).length === 0) {
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
      <div className="flex max-md:flex-col w-3/4 h-3/4 bg-white rounded-lg shadow-xl p-8">
        <img
          src="https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="blog"
          className="w-full md:w-1/3 h-4/5 rounded-lg object-cover"
        />
        <div className="flex flex-col flex-1 p-4">
          {loading && <Spinner />}
          <h1 className=" text-xl md:text-4xl font-bold mb-4 break-words ">
            {singleBlog.title}
          </h1>
          <p className=" text-base md:text-lg text-gray-800 mb-4 break-words">
            {singleBlog.content}
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
      </div>
    </div>
  );
};

export default Blog;
