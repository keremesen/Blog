import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { GrClose } from "react-icons/gr";
import { modalFunc } from "../redux/modalSlice";
import { postBlogs } from "../redux/blogSlice";
import { toast } from "react-toastify";
const { v4: uuidv4 } = require("uuid");

const Modal = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.blogs);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;

    dispatch(postBlogs({ id: uuidv4(), title, content }));
    e.target[0].value = "";
    e.target[1].value = "";
    dispatch(modalFunc());
    if (error) {
      toast.error("Blog not added!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success("Blog added succesfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-40 absolute inset-0"></div>
      <div className="relative w-full max-w-lg p-4 m-2 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-2xl font-bold">Add New Blog</h2>
          <button
            className="focus:outline-none hover:bg-zinc-100 p-2 rounded-lg "
            onClick={() => dispatch(modalFunc())}
          >
            <GrClose size={24} />
          </button>
        </div>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-zinc-800"
            type="text"
            placeholder="Title"
          />
          <textarea
            className="w-full px-4 py-2 h-40 border border-gray-300 rounded-lg focus:outline-none focus:border-zinc-800"
            placeholder="Content"
          ></textarea>
          <button
            className="w-1/2 self-center py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-900"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
