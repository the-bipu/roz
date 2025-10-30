import React, { useContext, useEffect } from 'react';

import Link from 'next/link';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import Image from 'next/image';
import { useRouter } from 'next/router';

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
    const { userEmail, admin, isNav, setIsNav } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (isNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isNav]);

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

    const handleNavigation = (value: string) => {
        router.push(`/${value}`);
    };

    return (
        <div className='h-auto w-full flex flex-row justify-between items-center mt-4'>
            <Link href='/' className="md:w-3/12 w-auto">
                <div className='py-2 font-bold text-lg uppercase cursor-pointer'>Rozzum</div>
            </Link>

            <div className="w-9/12 h-auto flex flex-row gap-2 items-center justify-between">
                <div className='w-full md:flex hidden flex-row gap-2 items-center justify-center'>
                    <Select onValueChange={handleNavigation}>
                        <SelectTrigger className="w-[180px] h-10 bg-[#2A3538] text-white border-none">
                            <SelectValue placeholder="Movies" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2A3538] text-white border-none">
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="movies">Movies</SelectItem>
                                <SelectItem value="blogs">Blogs</SelectItem>
                                <SelectItem value="about">About</SelectItem>
                                <SelectItem value="nothing">Nothing</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input placeholder="Search..." className='w-full h-10 bg-[#2A3538] placeholder:text-white text-white border-none' />
                </div>

                {(userEmail && admin) ? (
                    <Link href='/blogs/new' className='w-auto min-w-32 h-10 bg-[#2A3538] text-white cursor-pointer rounded-md md:flex hidden flex-row gap-1 items-center justify-center py-2 px-2'>
                        <Image src={'/nav/avatar.jpg'} alt="Google" width={36} height={36} className="h-9 rounded" />
                        <div className="flex flex-col">
                            <div className="text-sm font-bold">Add,</div>
                            <div className="text-xs">New Blog</div>
                        </div>
                    </Link>
                ) : (
                    <Link href='/nothing' className='w-auto min-w-32 h-10 bg-[#2A3538] text-white cursor-pointer rounded-md md:flex hidden flex-row gap-1 items-center justify-center py-2 px-2'>
                        <Image src={'/nav/avatar.jpg'} alt="Google" width={36} height={36} className="h-9 rounded" />
                        <div className="flex flex-col">
                            <div className="text-sm font-bold">Login,</div>
                            <div className="text-xs">With Google</div>
                        </div>
                    </Link>
                )}

                {(userEmail && admin) ? (
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className='w-auto min-w-32 h-10 bg-[#2A3538] text-white mr-2 cursor-pointer rounded-md md:flex hidden flex-row gap-1 items-center justify-center py-2 px-2'>
                                <Image src={'/nav/avatar.jpg'} alt="Google" width={36} height={36} className="h-9 rounded" />
                                <div className="flex flex-col">
                                    <div className="text-sm font-bold">Add,</div>
                                    <div className="text-xs">New Movie</div>
                                </div>
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
                ) :
                    <div className='w-auto min-w-32 h-10 bg-[#2A3538] text-white mr-2 cursor-pointer rounded-md md:flex hidden flex-row gap-1 items-center justify-center py-2 px-2' onClick={() => { signIn("google"); }}>
                        <Image src={'/nav/avatar.jpg'} alt="Google" width={36} height={36} className="h-9 rounded" />
                        <div className="flex flex-col">
                            <div className="text-sm font-bold">Login</div>
                            <div className="text-xs">With Google</div>
                        </div>
                    </div>
                }
            </div>

            <div className='cursor-pointer md:hidden flex items-center justify-center' onClick={() => setIsNav(!isNav)}>
                <Image src={'/nav/dash.svg'} alt="menu" width={20} height={20} />
            </div>

            {/* mobile navigation */}
            <div className={`fixed top-0 left-0 w-full h-full z-[100] bg-[#131E21] text-white ${isNav ? 'flex' : 'hidden'} flex-col items-center justify-start`}>
                <div className='h-auto w-11/12 flex flex-row justify-between items-center mt-4'>
                    <Link href='/'>
                        <div className='py-2 font-bold text-lg uppercase cursor-pointer'>Rozzum</div>
                    </Link>
                    <div className='cursor-pointer md:hidden flex items-center justify-center' onClick={() => setIsNav(!isNav)}>
                        <Image src={'/nav/cross.svg'} alt="menu" width={20} height={20} />
                    </div>
                </div>
                <div className='flex flex-col gap-10 items-center justify-center mt-16'>
                    <Link href='/movies'>
                        <div className='pr-6 font-bold text-3xl uppercase'>Movies</div>
                    </Link>
                    <Link href='/blogs'>
                        <div className='pr-6 font-bold text-3xl uppercase'>Blogs</div>
                    </Link>
                    <Link href='/about'>
                        <div className='pr-6 font-bold text-3xl uppercase'>About</div>
                    </Link>
                    <Link href='/nothing'>
                        <div className='pr-6 font-bold text-3xl uppercase'>Nothing</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar