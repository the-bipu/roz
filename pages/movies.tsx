"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Loader from "@/components/common/Loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Head from "next/head";
import Navbar from "@/components/common/Navbar";
import { Square } from "lucide-react";
import { UserContext } from "@/context/userContext";

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

export default function Movies() {
  const { userEmail, admin } = useContext(UserContext);

  const [isActive, setIsActive] = useState('watched');
  const [searchQuery, setSearchQuery] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/public`);
      const another = await fetch(`/api/blogs/fetch`);

      if (!response.ok || !another.ok) {
        throw new Error(`Error fetching data`);
      }

      const data = await response.json();
      const blogs = await another.json();

      setPosts(data);
      setBlogs(blogs);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleMarkAsWatched(movieId: string) {
    try {
      const response = await fetch(`/api/update?id=${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isWatched: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the movie');
      }

      console.log(`Movie ${movieId} marked as watched.`);

      await fetchPosts();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  }

  async function handleMarkAsNotWatched(movieId: string) {
    try {
      const response = await fetch(`/api/update?id=${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isWatched: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the movie');
      }

      console.log(`Movie ${movieId} marked as watched.`);

      // Refetch the posts to update the UI
      await fetchPosts();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
        <title>Rozz</title>
      </Head>

      <div className="w-full h-auto min-h-screen flex flex-col items-center justify-start pb-6 text-white bg-[#131E21]">
        <div className="w-11/12 h-full flex flex-col">

          <Navbar />

          <div className="w-full h-auto mt-6">

            <div className="flex flex-row flex-wrap items-center justify-between mb-8 gap-4">
              <div className="flex flex-row flex-wrap gap-4">
                <Button variant={isActive === 'watched' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('watched')}>Movies Watched</Button>
                <Button variant={isActive === 'wishlist' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('wishlist')}>Wishlist</Button>
                <Button variant={isActive === 'blogs' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('blogs')}>Blogs</Button>
              </div>
              <Input className="w-96 h-10 bg-[#2A3538] placeholder:text-white text-white border-none" placeholder="Search here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
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
                                  <CardTitle className="text-lg font-light flex flex-row justify-between">
                                    <div className="w-auto backdrop-blur-sm">{post.name}</div>
                                    {userEmail && (
                                      <Square
                                        className="cursor-pointer"
                                        onClick={() => handleMarkAsNotWatched(post._id)}
                                      />
                                    )}
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
                    <div key={post._id} className="md:w-[32%] w-full relative border-2 border-white rounded-lg">
                      <Card className="h-full text-white bg-[#000000be] border-none">
                        <CardHeader>
                          <CardTitle className="text-lg font-light flex flex-row justify-between items-center">
                            <div className="w-auto backdrop-blur-sm">{post.name}</div>
                            {(userEmail && admin) && (
                              <Square
                                className="cursor-pointer"
                                onClick={() => handleMarkAsWatched(post._id)}
                              />
                            )}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
              </div>
            )}

            {isActive === 'blogs' && (
              <div className="w-full h-auto flex flex-row justify-between flex-wrap gap-6">
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

      </div>
    </React.Fragment >
  );
}