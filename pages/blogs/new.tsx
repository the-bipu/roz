"use client";

import React, { useState } from 'react';
import dynamic from "next/dynamic";
import { generateSlug } from "@/lib/generateSlug";
import { Plus } from "lucide-react";
import parse from "html-react-parser";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';

const CreateBlogs = () => {
    // const router = useRouter();
    const postedBy = "the-bipu";

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    function handleTitle(e: any) {
        const newTitle = e.target.value;
        setTitle(newTitle);
        const autoSlug = generateSlug(newTitle);
        setSlug(autoSlug);
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const newBlog = {
            title,
            slug,
            description,
            content,
            postedBy,
        };

        try {
            const response = await fetch(`/api/blogs/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Announcement creation failed with status: ${response.status}, response: ${errorText}`);
            }

            const result = await response.json();
            // router.push('/');
        } catch (error) {
            console.log('You"ve got an error bruh!');
        }
    }

    //Custom Tool Bar
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "color", "image"],
            [{ "code-block": true }],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "image",
        "code-block",
        "color",
    ];

    return (
        <div className='flex flex-col w-full min-h-screen items-center justify-center bg-[#0d1117]'>

            <Head>
                <link rel="icon" href="/header.png" type="image/png" sizes="70x70" />
                <title>Rozum Unit 7134</title>
            </Head>

            <div className='flex flex-col items-center justify-center h-full w-full overflow-y-auto scrollHide'>
                <div className='md:w-10/12 w-11/12 h-full flex flex-col justify-start'>

                    <Navbar />

                    <div className='flex flex-col gap-4 items-start justify-start w-full h-full py-2 px-0 mt-24'>
                        <div className='p-0 flex flex-row flex-wrap w-full'>

                            <div className="flex flex-row gap-4 w-full">

                                {/* Announcement Editor */}
                                <div className="md:w-1/2 w-full p-5 mb-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
                                    <h2 className="text-2xl font-bold border-b border-gray-400 pb-2 mb-5 ">
                                        Announcement Editor
                                    </h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            {/* Title */}
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="title"
                                                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                                                >
                                                    Announcement Title
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        onChange={handleTitle}
                                                        type="text"
                                                        value={title}
                                                        name="title"
                                                        id="title"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                                        placeholder="Type the Course title"
                                                    />
                                                </div>
                                            </div>
                                            {/* Slug */}
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="slug"
                                                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                                                >
                                                    Announcement Slug
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        onChange={(e) => setSlug(e.target.value)}
                                                        type="text"
                                                        value={slug}
                                                        name="slug"
                                                        id="slug"
                                                        autoComplete="slug"
                                                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                                        placeholder="Type the Course title"
                                                    />
                                                </div>
                                            </div>
                                            {/* Description */}
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="description"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Announcement Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    value={description}
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 "
                                                    placeholder="Write your thoughts here..."
                                                ></textarea>
                                            </div>

                                            {/* Content */}
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="content"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Announcement Content
                                                </label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={content}
                                                    onChange={setContent}
                                                    modules={modules}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            <span>Create Blog Post</span>
                                        </button>
                                    </form>
                                </div>

                                {/* Announcement View */}
                                <div className=" blog-view md:w-1/2 w-full p-8 py-5 mb-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
                                    <h2 className="text-2xl font-bold border-b border-gray-400 pb-2 mb-5 ">
                                        Announcement View
                                    </h2>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                                        {/* Title */}
                                        <div className="sm:col-span-2">
                                            <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                                                Announcement Title
                                            </h2>
                                            <div className="mt-2">
                                                <p className="text-2xl font-bold">{title}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="sm:col-span-2">
                                            <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Announcement Description
                                            </h2>
                                            <p>{description}</p>
                                        </div>

                                        {/* Announcement Content */}
                                        <div className="sm:col-span-full">
                                            <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Announcement Content
                                            </h2>
                                            {parse(content)}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateBlogs