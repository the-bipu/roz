'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from '@/components/common/Navbar';
import Loader from '@/components/common/Loader';

interface Blog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  postedBy: string;
  content: string;
  createdAt: string;
}

const GetBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/blogs/fetch`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        setBlogs(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='flex w-full h-screen items-center justify-center bg-mando text-white'>

      <div className="w-11/12 h-full flex flex-col">
        <Navbar />

        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-auto flex flex-row justify-between flex-wrap gap-6 mt-28">
            {blogs.map((blog) => (
              <div key={blog._id} className="w-full relative border-2 border-white bg-[#0f0f0faf] rounded-lg">
                <Card className="h-auto w-full border-none flex flex-col justify-between overflow-hidden bg-transparent rounded-lg text-white">
                  <CardHeader className='flex flex-row justify-between items-start'>
                    <div className='flex flex-col'>
                      <CardTitle className="text-lg font-light flex items-start justify-start">
                        <div className="w-auto backdrop-blur-sm font-bold">{blog.title}</div>
                      </CardTitle>
                      <CardDescription className="text-base font-light backdrop-blur-sm">
                        {blog.description}
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <div className='pr-6 font-semibold text-base uppercase'>View Post</div>
                      </DialogTrigger>
                      <DialogContent className='bg-white'>
                        <DialogHeader>
                          <DialogTitle className='mb-3'>By, {blog.postedBy}</DialogTitle>
                          <DialogDescription>
                            <div dangerouslySetInnerHTML={{ __html: (blog.content) }} />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <span>{blog.postedBy}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GetBlogs