"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Loader from "@/components/common/Loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Head from "next/head";
import Navbar from "@/components/common/Navbar";
import { Square } from "lucide-react";

interface Post {
  _id: string;
  name: string;
  review: string;
  rating: string;
  isWatched: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  postedBy: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [isActive, setIsActive] = useState('watched');
  const [searchQuery, setSearchQuery] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public`);
        const another = await fetch(`/api/blogs/fetch`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        if (!another.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const blogs = await another.json();

        setPosts(data);
        setBlogs(blogs);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <div className="w-full h-auto min-h-screen flex flex-col items-center justify-start py-20 bg-[#0d1117] text-white">

        <Head>
          <link rel="icon" href="/header.png" type="image/png" sizes="70x70" />
          <title>Rozum Unit 7134</title>
        </Head>

        <div className="md:w-10/12 w-11/12 h-full flex flex-col">

          <Navbar />

          <div className="w-full h-auto mt-10">

            <div className="flex flex-row items-center justify-center gap-4 mb-8">
              <Button variant={isActive === 'watched' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('watched')}>Movies Watched</Button>
              <Button variant={isActive === 'wishlist' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('wishlist')}>Wishlist</Button>
              <Button variant={isActive === 'blogs' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('blogs')}>Blogs</Button>
              <Input className="w-96 h-9 rounded-full indent-4" placeholder="Search here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
            </div>

            {isActive === 'watched' && (
              <div>
                {error && <p className="error">{error}</p>}

                {loading ? (
                  <Loader />
                ) : (
                  <div>
                    {posts.length === 0 ? (
                      <Loader />
                    ) : (
                      <div className="w-full h-auto flex flex-row justify-between flex-wrap gap-6">
                        {posts
                          .filter((post) => post.isWatched && post.name.toLowerCase().includes(searchQuery))
                          .map((post) => (
                            <div key={post._id} className="md:w-[32%] min-h-40 w-full relative">
                              <Card className="h-full text-white bg-roz border-none flex flex-col justify-between">
                                <CardHeader>
                                  <CardTitle className="text-lg font-light flex items-start justify-start">
                                    <div className="w-auto backdrop-blur-sm">{post.name}</div>
                                  </CardTitle>
                                  <CardDescription className="text-base font-light text-white backdrop-blur-sm">
                                    {post.review}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex flex-col">
                                    <span>{'⭐'.repeat(Number(post.rating))}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {isActive === 'wishlist' && (
              <div className="w-full h-auto flex flex-row justify-between flex-wrap gap-6">
                {posts
                  .filter((post) => !post.isWatched && post.name.toLowerCase().includes(searchQuery))
                  .map((post) => (
                    <div key={post._id} className="md:w-[32%] w-full relative">
                      <Card className="h-full text-white bg-black border-none">
                        <CardHeader>
                          <CardTitle className="text-lg font-light flex flex-row justify-between items-center">
                            <div className="w-auto backdrop-blur-sm">{post.name}</div>
                            <Square className="cursor-pointer" />
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
              </div>
            )}

            {isActive === 'blogs' && (
              <div className="w-full h-auto flex flex-row justify-between flex-wrap gap-6">
                {blogs
                  .map((blog) => (
                    <div key={blog._id} className="w-full relative">
                      <Card className="h-auto w-full border-none flex flex-col justify-between overflow-hidden">
                        <CardHeader className='flex flex-row justify-between'>
                          <div className='flex flex-col'>
                            <CardTitle className="text-lg font-light flex items-start justify-start">
                              <div className="w-auto backdrop-blur-sm">{blog.title}</div>
                            </CardTitle>
                            <CardDescription className="text-base font-light backdrop-blur-sm">
                              {blog.description}
                            </CardDescription>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className='text-sm button-56' role="button">
                                View Post
                              </button>
                            </DialogTrigger>
                            <DialogContent className='bg-white'>
                              <DialogHeader>
                                <DialogTitle>By, {blog.postedBy}</DialogTitle>
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

      </div>
    </React.Fragment >
  );
}