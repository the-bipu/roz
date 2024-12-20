"use client";

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { UserContext } from "@/context/userContext";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";

export default function About() {
    const { isNav, setIsNav } = useContext(UserContext);

    return (
        <div className={`w-full md:h-screen h-auto flex flex-col items-center justify-start py-6 text-white bg-mando ${isNav && 'scrollHide'}`}>

            <Head>
                <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
                <title>About Rozz</title>
            </Head>

            <div className="w-11/12 h-full flex flex-col justify-start">

                {/* navbar */}
                <div className='h-auto flex flex-row justify-between items-center mt-6 border-2 border-white rounded-full shadow'>
                    <Link href='/'>
                        <div className='py-2 pl-6 font-bold text-lg uppercase cursor-pointer'>Rozzum</div>
                    </Link>
                    <div className='md:flex hidden flex-row gap-2 items-center justify-center'>
                        <Link href='/movies'>
                            <div className='pr-6 font-bold text-lg uppercase'>Movies</div>
                        </Link>
                        <Link href='/blogs'>
                            <div className='pr-6 font-bold text-lg uppercase'>Blogs</div>
                        </Link>
                        <Link href='/about'>
                            <div className='pr-6 font-bold text-lg uppercase'>About</div>
                        </Link>
                        <Link href='/nothing'>
                            <div className='pr-6 font-bold text-lg uppercase'>Nothing</div>
                        </Link>
                    </div>

                    <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full md:flex hidden items-center justify-center p-1'>
                        <IoPersonCircleOutline className="text-black" />
                    </div>

                    <div className='mr-4 cursor-pointer md:hidden flex items-center justify-center' onClick={() => setIsNav(!isNav)}>
                        <Image src={'/nav/dash.svg'} alt="menu" width={20} height={20} />
                    </div>
                </div>

                {/* mobile navigation */}
                <div className={`fixed top-0 left-0 w-full h-full z-[100] bg-black text-white ${isNav ? 'flex' : 'hidden'} flex-col items-center justify-start`}>
                    <div className='h-auto w-11/12 flex flex-row justify-between items-center mt-12 border-2 border-white rounded-full shadow'>
                        <Link href='/'>
                            <div className='py-2 pl-6 font-bold text-lg uppercase cursor-pointer'>Rozzum</div>
                        </Link>
                        <div className='mr-4 cursor-pointer md:hidden flex items-center justify-center' onClick={() => setIsNav(!isNav)}>
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

                <div className="flex flex-col ml-4 md:w-[500px] w-11/12 my-20">
                    <div className="md:text-9xl text-8xl font-bold text-white">Rozzum</div>
                    <div className="text-base text-justify font-light ml-1">Rozzum is one of my best creations, and do you know why, as it helps me managing one of my favourite part of my life, which is again Movies; Currently rozz have limitations but one day she'll be grown AI and i'm giving it my all to make this possible.</div>
                </div>

            </div>

        </div>
    );
}