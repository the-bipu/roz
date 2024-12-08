import React, { useContext, useState } from 'react';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { PackagePlus } from 'lucide-react';
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

interface Post {
    _id: string;
    name: string;
    review: string;
    rating: string;
    isWatched: string;
    createdAt: string;
}

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

    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

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

    return (
        <div className="absolute top-0 flex flex-row justify-between items-center md:w-10/12 w-11/12 h-auto py-6">
            <Link href={'/'}>
                <Image src={'/wild-robot.svg'} alt='wild robot logo' width={120} height={50} />
            </Link>

            <div className='flex flex-row gap-2'>
                {admin && (
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
                )}

                {admin && (
                    <Link href={'/blogs/new'}>
                        <Button variant={'secondary'} className='rounded-full text-base z-50 flex items-center justify-center gap-2'>
                            <PackagePlus className='w-6 h-6' />
                            <span className='font-medium'>New Blog</span>
                        </Button>
                    </Link>
                )}

                {userEmail ? (
                    <div>
                        <Button variant={'secondary'} className='rounded-full text-base z-50 flex items-center justify-center gap-2'>
                            <PackagePlus className='w-6 h-6' />
                            <span className='font-medium'>{userEmail}</span>
                        </Button>
                    </div>
                ) : (
                    <Button type='submit' variant='secondary' onClick={() => { signIn("google"); }} className="w-full h-9 flex flex-row gap-2 mb-6 rounded-full">
                        <FaGoogle className="text-lg" />
                        Login with Google
                    </Button>
                )}
            </div>

        </div>
    )
}

export default Navbar