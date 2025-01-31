"use client";

import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { UserContext } from "@/context/userContext";
import { FaGoogle } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";

export default function Home() {
  const { admin, isNav, setIsNav } = useContext(UserContext);

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

  return (
    <div className={`w-full md:h-screen h-auto flex flex-col items-center justify-start md:py-6 py-0 pb-6 text-white bg-mando ${isNav && 'scrollHide'}`}>

      <Head>
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
        <title>Rozz</title>
      </Head>

      <div className="w-11/12 h-full flex flex-col justify-between">

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

          {admin ? (
            <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full md:flex hidden items-center justify-center p-1' onClick={() => signOut()}>
              <IoPersonCircleOutline className="text-black" />
            </div>
          ) : (
            <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full md:flex hidden items-center justify-center p-1' onClick={() => { signIn("google"); }}>
              <FaGoogle className="text-black" />
            </div>
          )}

          <div className='mr-4 cursor-pointer md:hidden flex items-center justify-center' onClick={() => setIsNav(!isNav)}>
            <Image src={'/nav/dash.svg'} alt="menu" width={20} height={20} />
          </div>
        </div>

        {/* mobile navigation */}
        <div className={`fixed top-0 left-0 w-full h-full z-[100] bg-black text-white ${isNav ? 'flex' : 'hidden'} flex-col items-center justify-start`}>
          <div className='h-auto w-11/12 flex flex-row justify-between items-center mt-6 border-2 border-white rounded-full shadow'>
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

        <div className="flex flex-col md:ml-4 ml-0 md:w-[500px] w-full md:mt-0 my-20">
          <div className="md:text-9xl text-6xl font-bold text-white">Rozzum</div>
          <div className="text-base text-justify font-light ml-1">Rozzum is one of my best creations, and do you know why, as it helps me managing one of my favourite part of my life, which is again Movies; Currently rozz have limitations but one day she'll be grown AI and i'm giving it my all to make this possible.</div>
        </div>

        <div className="flex flex-row gap-6 flex-wrap items-center justify-center">
          <div className="md:w-[32%] w-full h-52 border-2 border-white bg-[#0f0f0faf] rounded-lg p-6">
            <Image src={'/index/movie.svg'} alt='cinema' width={60} height={60} />
            <div className="font-bold text-xl uppercase mt-2">Track Movies</div>
            <div>Track the movies you watch and your wishlist.</div>
          </div>
          <div className="md:w-[32%] w-full h-52 border-2 border-white bg-[#0f0f0faf] rounded-lg p-6">
            <Image src={'/index/blog.svg'} alt='cinema' width={60} height={60} />
            <div className="font-bold text-xl uppercase mt-2">Write Blogs</div>
            <div>Write blogs for yourself, for the things you want.</div>
          </div>
          <div className="md:w-[32%] w-full h-52 border-2 border-white bg-[#0f0f0faf] rounded-lg p-6">
            <Image src={'/index/enjoy.svg'} alt='cinema' width={60} height={60} />
            <div className="font-bold text-xl uppercase mt-2">Just Chill</div>
            <div>Just enjoy the moment by doing nothing.</div>
          </div>
        </div>

      </div>

    </div>
  );
}