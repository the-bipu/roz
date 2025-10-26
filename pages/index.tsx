"use client";

import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { UserContext } from "@/context/userContext";
import { FaGoogle } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

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
    <div className={`w-full md:h-screen bg-[#131E21] h-auto flex flex-col items-center justify-start md:py-6 py-0 pb-6 text-white bg-mando ${isNav && 'scrollHide'}`}>

      <Head>
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
        <title>Rozz</title>
      </Head>

      <div className="w-11/12 h-full flex flex-col justify-between">

        {/* navbar */}
        <div className='h-auto w-full flex flex-row justify-between items-center mt-4'>
          <Link href='/' className="md:w-3/12 w-auto">
            <div className='py-2 font-bold text-lg uppercase cursor-pointer'>Rozzum</div>
          </Link>

          <div className="w-9/12 h-auto flex flex-row gap-2 items-center justify-between">
            <div className='w-full md:flex hidden flex-row gap-2 items-center justify-center'>
              <Select>
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

            {admin ? (
              <div className='w-auto min-w-32 h-10 bg-[#2A3538] text-white mr-2 cursor-pointer rounded-md md:flex hidden flex-row gap-1 items-center justify-center py-2 px-2' onClick={() => signOut()}>
                <Image src={'/nav/avatar.jpg'} alt="Google" width={36} height={36} className="h-9 rounded" />
                <div className="flex flex-col">
                  <div className="text-sm font-bold">Hello,</div>
                  <div className="text-xs">Admin Sahb</div>
                </div>
              </div>
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

        <div className="flex flex-col md:ml-4 ml-0 md:w-[500px] w-full md:mt-0 my-20">
          <div className="md:text-9xl text-6xl font-bold text-white">Rozzum</div>
          <div className="text-base text-justify font-light ml-1">Rozzum is one of my best creations, and do you know why, as it helps me managing one of my favourite part of my life, which is again Movies; Currently rozz have limitations but one day she'll be grown AI and i'm giving it my all to make this possible.</div>
        </div>

      </div>

    </div>
  );
}