"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppService from "../service";
import Modal from "../components/modal";


const defaultSate = {
  isFetching: false,
  isDeleting: false,
  blogs: [],
  isOpen: false,
};

const BlogList = () => {
  const router = useRouter();
  const [state, setState] = useState<any>(defaultSate);

  const fetchBlogs = async () => {
    setState((prevState: any) => ({ ...prevState, isFetching: true }));
    const { data }: any = await AppService.getBlogs();
    setState((prevState: any) => ({
      ...prevState,
      isFetching: false,
      blogs: data || defaultSate.blogs,
    }));
  };

  const handleDelete = async (id: any) => {
    setState((prevState: any) => ({ ...prevState, isDeleting: true }));
    const { error }: any = await AppService.deleteBlog(id);
    if (!error) {
      fetchBlogs();
    }
    setState((prevState: any) => ({
      ...prevState,
      isDeleting: false,
      isOpen: !error,
    }));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="my-5">
          <h1 className="text-2xl font-bold">Blogs</h1>
        </div>
        <button
          onClick={() => router.push("/blogs/create")}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Create Blogs
        </button>
        {!state.isFetching && !state.blogs.length && (
          <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 text-center">
            <p>No records found. Blogs will be shown here.</p>
          </div>
        )}
        {state.blogs.map((blog: any) => (
          <div
            key={blog.id}
            className="w-full max-w-2xl p-4 bg-white shadow-md rounded-lg my-4"
          >
            <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
            <p className="mt-2 text-gray-600 line-clamp-4">
              {blog.description}
            </p>
            <div className="mt-4">
              <p className="text-xs text-gray-700">
                <strong>Posted By:</strong> {blog.posted_by_name}(
                {blog.posted_by_email})
              </p>
              <p className="text-xs text-gray-700">
                <strong>Posted On:</strong> {blog.date}
              </p>
            </div>
            <button
              onClick={() => router.push(`/blogs/${blog.id}`)}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(blog.id)}
              className="ml-4 mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={state.isOpen}
        onClose={() =>
          setState((prevState: any) => ({ ...prevState, isOpen: false }))
        }
      >
        <div className="text-center">
          <h2 className="text-xl font-bold">Deleted</h2>
          <p>Blog has been deleted successfully.</p>
          <button
            onClick={() =>
              setState((prevState: any) => ({ ...prevState, isOpen: false }))
            }
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BlogList;
