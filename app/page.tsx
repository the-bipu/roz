"use client"
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch";
import Loader from "@/components/common/Loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackagePlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  review: z.string().min(2, {
    message: "Confession must be at least 2 characters.",
  }),
  rating: z.string({
    required_error: "Please select a college to display.",
  }),
  isWatched: z.boolean().default(false),
})

interface Post {
  _id: string;
  name: string;
  review: string;
  rating: string;
  isWatched: string;
  createdAt: string;
}

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      review: "",
      rating: "",
      isWatched: false,
    },
  })

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isActive, setIsActive] = useState('watched');
  const [searchQuery, setSearchQuery] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_FORM_PASSWORD) {
      setIsPasswordVerified(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    try {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Submission failed with status: ${response.status}, response: ${errorText}`);
      }

      const result = await response.json();
      toast({
        title: "Success!",
        description: "Your confession was submitted successfully.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Error!",
        description: `There was an issue with your submission: ${error.message}`,
        variant: "destructive",
      });
    }
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
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

          <div className="absolute top-0 flex flex-row justify-between items-center md:w-10/12 w-11/12 h-auto py-6">
            <Link href={'/'}>
              <Image src={'/wild-robot.svg'} alt='wild robot logo' width={120} height={50} />
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'secondary'} className='rounded-full text-base z-50 flex items-center justify-center gap-2'>
                  <PackagePlus className='w-6 h-6' />
                  <span className='font-medium'>Add New</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white w-full h-auto">
                {!isPasswordVerified ? (
                  <div className="flex flex-col items-center justify-center gap-4 p-6">
                    <DialogTitle>Enter Password</DialogTitle>
                    <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center gap-4">
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="border rounded-md px-4 py-2"
                        placeholder="Enter password"
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </div>
                ) : (
                  <DialogHeader>
                    <DialogTitle>Add the movie here;!</DialogTitle>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name of the movie;!</FormLabel>
                              <FormControl>
                                <Input placeholder="Star Wars" {...field} />
                              </FormControl>
                              <FormDescription>
                                Try using full name pls;
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="review"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Write your thoughts on this movie;</FormLabel>
                              <FormControl>
                                <Textarea placeholder="liked it;" {...field} className="min-h-32" />
                              </FormControl>
                              <FormDescription>
                                This is your public confession, don't include your personal details;
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>College</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="How much you liked this one;" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">⭐</SelectItem>
                                  <SelectItem value="2">⭐⭐</SelectItem>
                                  <SelectItem value="3">⭐⭐⭐</SelectItem>
                                  <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                                  <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
                                  <SelectItem value="0">😵‍💫</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                if it's a waste of time, select 😵‍💫;
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="isWatched"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Have you watched it?</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <span>{field.value ? "Yes" : "No"}</span>
                                </div>
                              </FormControl>
                              <FormDescription>
                                Toggle the switch to indicate if you have watched this movie.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-auto">Submit</Button>
                      </form>
                    </Form>
                  </DialogHeader>
                )}
              </DialogContent>
            </Dialog>

          </div>

          <div className="w-full h-auto mt-10">

            <div className="flex flex-row items-center justify-center gap-4 mb-8">
              <Button variant={isActive === 'watched' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('watched')}>Movies Watched</Button>
              <Button variant={isActive === 'wishlist' ? 'secondary' : 'outline'} className={`text-base font-medium rounded-full px-6 py-2`} onClick={() => setIsActive('wishlist')}>Wishlist</Button>
              <Input className="w-96 h-9 rounded-full indent-4" placeholder="Search here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
            </div>

            {isActive === 'watched' ? (
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
                                  <CardDescription className="text-base font-medium">
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
            ) : (
              <div>
                {posts
                  .filter((post) => !post.isWatched && post.name.toLowerCase().includes(searchQuery))
                  .map((post) => (
                    <div key={post._id} className="md:w-[32%] w-full relative">
                      <Card className="h-full text-white bg-roz border-none">
                        <CardHeader>
                          <CardTitle className="text-lg font-light flex items-start justify-start">
                            <div className="w-auto backdrop-blur-sm">{post.name}</div>
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}
