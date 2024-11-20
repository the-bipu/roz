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
import Link from "next/link"
import Loader from "@/components/common/Loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackagePlus } from "lucide-react";

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
      <div className="w-full h-auto min-h-screen flex flex-col items-center justify-start py-20 bgWild">
        <div className="md:w-10/12 w-11/12 h-full flex flex-col">

          <div className="absolute top-0 flex flex-row justify-between items-center md:w-10/12 w-11/12 h-auto py-6">
            <span className="text-2xl font-normal uppercase text-white">Rozum Unit 7134</span>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'secondary'} className='rounded-full text-base z-50 flex items-center justify-center gap-2'>
                  <PackagePlus className='w-5 h-5' />
                  <span className='pt-[3px]'>Add New</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white w-full h-auto">
                <DialogHeader>
                  <DialogTitle>This is the title</DialogTitle>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Write your username here;!</FormLabel>
                            <FormControl>
                              <Input placeholder="kenobi" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name, don't use original one.
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
                            <FormLabel>Write your confession here;!</FormLabel>
                            <FormControl>
                              <Textarea placeholder="shadcn" {...field} className="min-h-32" />
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
                                  <SelectValue placeholder="Select a college to display" />
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
                              Select one of these colleges or other if you can't find yours.{" "}
                              <Link href="/request-college" className="font-bold text-[#101010]">request your college.</Link>.
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
              </DialogContent>
            </Dialog>

          </div>

          <div className="w-full h-auto">
            <div>Movies Watched</div>
            <div>
              {error && <p className="error">{error}</p>}

              {loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  {posts.length === 0 ? (
                    <Loader />
                  ) : (
                    <div className="w-full h-auto flex flex-row flex-wrap gap-4">
                      {posts
                        .filter((post) => post.isWatched)
                        .map((post) => (
                          <div key={post._id} className="w-96 relative">
                            <Card className="h-full">
                              <CardHeader>
                                <CardTitle className="text-lg font-light">
                                  {post.name}
                                </CardTitle>
                                <CardDescription className="text-base font-medium">
                                  {post.review}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-end space-x-1.5 text-red-500 absolute top-4 right-4">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex flex-col">
                                  <span>{'⭐'.repeat(Number(post.rating))}</span>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="w-full h-auto">
            <div>Wishlist</div>
            <div>
              {posts
                .filter((post) => !post.isWatched)
                .map((post) => (
                  <div key={post._id} className="w-96 relative">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg font-light">{post.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}
