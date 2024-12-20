'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
        <title>Not Found - 404</title>
      </Head>

      <div className="w-full h-screen flex flex-col items-center justify-start py-6 text-white bg-mando">

        <div className='w-11/12 h-auto flex flex-row justify-between items-center mt-6 border-2 border-white rounded-full shadow'>
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
          <Link href='/' className='mr-6'>
            <div className='py-2 font-bold text-lg uppercase cursor-pointer'>714</div>
          </Link>
        </div>

        <div className='w-11/12 h-auto flex flex-col items-start justify-center text-2xl mt-44 font-light'>
          <h1 className='text-5xl mb-4 font-bold'>404 - Page Not Found</h1>
          <p>Sorry, i think i haven't written this chapter yet.</p>
          <p>But we can explore our <Link href="/" className='font-semibold transition-all hover:underline'>home</Link> together.</p>
        </div>

      </div>
    </React.Fragment>
  );
}