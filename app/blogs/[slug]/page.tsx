'use client'
import AppService from '@/app/service';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


type FormValues = {
    title: string;
    description: string;
};

const defaultSate = {
    isFetching: false,
    isUpdating: false,
    blog: {}
}

const BlogForm = ({ params }: { params: { slug: string } }) => {
    const router = useRouter();
    const [state, setState] = React.useState<any>(defaultSate);
    const { watch, register, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
        setState((prevState: any) => ({ ...prevState, isUpdating: true }));
        const { error }: any = await AppService.updateBlog(formData);
        if (!error) {
            router.push("/blogs");
        }
        setState((prevState: any) => ({ ...prevState, isUpdating: false }));
    };


  const fetchBlog = async (id: any) => {
    setState((prevState: any) => ({ ...prevState, isFetching: true }));
    const { data }: any = await AppService.getBlogs(id);
    if (data) {
        ['title', 'description', 'date', 'posted_by_name', 'posted_by_email', 'id'].map((key: any) => {
            setValue(key, data[key]);
        });
    }
    setState((prevState: any) => ({
      ...prevState,
      isFetching: false,
      blog: data || defaultSate.blog
    }));
  };

  useEffect(() => {
    params.slug && fetchBlog(params.slug)
  }, [params.slug])

    return (
        <div className='w-1/2 mx-auto mt-10'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className='my-5'>
                    <h1 className="text-2xl font-bold">Edit Blog</h1>
                </div>
                
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        placeholder='Enter title...'
                        id="title"
                        type="text"
                        {...register('title', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.title && <span className="text-xs text-red-500">This field is required</span>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        placeholder='Write description...'
                        id="description"
                        {...register('description', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={3}
                    ></textarea>
                    {errors.description && <span className="text-xs text-red-500">This field is required</span>}
                </div>

                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Update
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
