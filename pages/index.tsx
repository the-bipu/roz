"use client"
import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserContext } from "@/context/userContext";
import { FaGoogle } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Home() {
  const { admin, userEmail } = useContext(UserContext);

  return (
    <div className="w-full h-auto min-h-screen flex flex-col items-center justify-start py-6 text-white bg-japan">

      <Head>
        <link rel="icon" href="/header.png" type="image/png" sizes="70x70" />
        <title>Roz</title>
      </Head>

      <div className="w-11/12 h-full flex flex-col">

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

      </div>

    </div>
  );
}