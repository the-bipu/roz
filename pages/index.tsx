"use client";

import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export default function Home() {
  const { admin, isNav, setIsNav } = useContext(UserContext);
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add your OMDB API key here
  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API;

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

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      // Example: Fetching popular movies - modify the search term as needed
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=star&type=movie`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  const handleNavigation = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <div className={`w-full min-h-screen bg-[#131E21] h-auto flex flex-col items-center justify-start md:py-6 py-0 pb-6 text-white bg-mando ${isNav && 'scrollHide'}`}>

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
              <Select onValueChange={handleNavigation}>
                <SelectTrigger className="w-[180px] h-10 bg-[#2A3538] text-white border-none">
                  <SelectValue placeholder="Categories" />
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

        <div className='w-11/12 h-auto flex flex-col items-start justify-center'>
          {/* Hero Section */}
          <div className="flex flex-col md:w-[500px] w-full md:mt-0 mt-20">
            <div className="md:text-9xl text-6xl font-bold text-white">Rozzum</div>
            <div className="text-base text-justify font-light ml-1">Rozzum is one of my best creations, and do you know why, as it helps me managing one of my favourite part of my life, which is again Movies; Currently rozz have limitations but one day she'll be grown AI and i'm giving it my all to make this possible.</div>
          </div>

          {/* Movies Section */}
          <div className="w-full mt-16 mb-10">
            <h2 className="text-3xl font-bold mb-6 md:ml-4 ml-0">New Movies</h2>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-xl">Loading movies...</div>
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-between">
                {movies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="bg-[#2A3538] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    <div className="relative w-full h-96">
                      <Image
                        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
                        alt={movie.Title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-1">{movie.Title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{movie.Year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}