import React, { useContext } from 'react';

import Link from 'next/link';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';

import { FaGoogle } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { UserContext } from '@/context/userContext';

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

const Navbar = () => {
    const { userEmail, admin } = useContext(UserContext);

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

    return (
        <div className='h-auto flex flex-row justify-between items-center mt-12 border-2 border-white rounded-full shadow'>
            <Link href='/'>
                <div className='py-2 pl-6 font-bold text-lg uppercase cursor-pointer'>Rozzum</div>
            </Link>

            <div className='flex flex-row gap-2 items-center justify-center'>
                <Link href='/movies'>
                    <div className='pr-6 font-bold text-lg uppercase'>Movies</div>
                </Link>
                <Link href='/blogs'>
                    <div className='pr-6 font-bold text-lg uppercase'>Blogs</div>
                </Link>
                <Link href='/about'>
                    <div className='pr-6 font-bold text-lg uppercase'>About</div>
                </Link>
                {(userEmail && admin) ? (
                    <Link href='/blogs/new'>
                        <div className='pr-6 font-bold text-lg uppercase'>Add Blogs</div>
                    </Link>
                ) : (
                    <Link href='/nothing'>
                        <div className='pr-6 font-bold text-lg uppercase'>Nothing</div>
                    </Link>
                )}
            </div>

            {(userEmail && admin) ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full flex items-center justify-center p-1'>
                            <Plus className="text-black" />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white w-full h-auto">
                        <DialogHeader>
                            <DialogTitle>Add the movie here;!</DialogTitle>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name the movie;!</FormLabel>
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
                                                <FormLabel>Your thoughts on this movie;</FormLabel>
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
                                                <FormLabel>Rate it;</FormLabel>
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

                    </DialogContent>
                </Dialog>
            ) : (
                <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full flex items-center justify-center p-1' onClick={() => { signIn("google"); }}>
                    <FaGoogle className="text-black" />
                </div>
            )}
        </div>
    )
}

export default Navbar