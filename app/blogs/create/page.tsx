'use client'
import { AppContext } from '@/app/contexts/app';
import AppService from '@/app/service';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, set, useForm } from 'react-hook-form';


type FormValues = {
    title: string;
    description: string;
};

const defaultSate = {
    isCreating: false,
}

const BlogForm: React.FC = () => {
    const { appData, setAppData } = useContext(AppContext);
    const  { user } = useUser();
    const router = useRouter();
    const [state, setState] = React.useState<any>(defaultSate);
    const { reset, getValues, setValue, register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
        setState((prevState: any) => ({ ...prevState, isCreating: true }));
        const { error }: any = await AppService.createBlog({
            ...formData,
            posted_by_name: user?.name,
            posted_by_email: user?.email,
            date: new Date().toISOString()
        });
        if (!error) {
            reset();
            router.push("/blogs");
        }
        setState((prevState: any) => ({ ...prevState, isCreating: false }));
    };

    useEffect(() => {
        if (appData.blog) {
            setValue('title', appData.blog.title);
            setValue('description', appData.blog.description);
        }

        return () => {
            const { title, description } = getValues();
            setAppData('blog', {
                title,
                description
            });
        }
    }, [appData.blog]);

    return (
        <div className='w-1/2 mx-auto mt-10'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className='my-5'>
                    <h1 className="text-2xl font-bold">Create Blog</h1>
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
