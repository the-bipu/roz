"use client";

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserContext } from "@/context/userContext";
import { FaGoogle } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Home() {
  const { admin } = useContext(UserContext);

  return (
    <div className="w-full md:h-screen h-auto flex flex-col items-center justify-start py-6 text-white bg-mando">

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
            <Link href='/nothing'>
              <div className='pr-6 font-bold text-lg uppercase'>Nothing</div>
            </Link>
          </div>
          {admin ? (
            <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full flex items-center justify-center p-1'>
              <IoPersonCircleOutline className="text-black" />
            </div>
          ) : (
            <div className='mr-2 font-bold text-2xl uppercase cursor-pointer bg-white rounded-full flex items-center justify-center p-1' onClick={() => { signIn("google"); }}>
              <FaGoogle className="text-black" />
            </div>
          )}
        </div>

        <div className="flex flex-col ml-4 md:w-[500px] w-11/12">
          <div className="md:text-9xl text-2xl font-bold text-white">Rozzum</div>
          <div className="text-base text-justify font-light ml-1">Rozzum is one of my best creations, and do you know why, as it helps me managing one of my favourite part of my life, which is again Movies; Currently rozz have limitations but one day she'll be grown AI and i'm giving it my all to make this possible.</div>
        </div>

        <div className="flex flex-row gap-6 flex-wrap items-center justify-center">
          <div className="md:w-[32%] w-full h-52 border-2 border-white bg-[#0f0f0faf] rounded-lg p-6">Feature 1</div>
          <div className="md:w-[32%] w-full h-52 border-2 border-white bg-[#0f0f0faf] rounded-lg p-6">Feature 2</div>
          <div className="md:w-[32%] w-full h-52 border-2 border-white bg-[#0f0f0faf] rounded-lg p-6">Feature 3</div>
        </div>

      </div>

    </div>
  );
}