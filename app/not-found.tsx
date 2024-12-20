'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function NotFound() {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
        <title>Not Found - 404</title>
      </Head>

      <div className={`w-full min-h-screen flex flex-col items-center`}>

        <div className="absolute top-0 flex flex-row justify-between items-center md:w-10/12 w-11/12 h-auto py-6">
          <Link href={'/'}>
            <Image src={'/wild-robot.svg'} alt='wild robot logo' width={120} height={50} />
          </Link>
        </div>

        <div className='w-10/12 h-auto flex flex-col items-center justify-center text-2xl mt-44'>
          <h1 className='text-3xl mb-4'>404 - Page Not Found</h1>
          <p>Sorry, i think i haven't created this route yet.</p>
          <p>But we can explore the <Link href="/" className='font-semibold transition-all hover:underline'>homepage</Link> together.</p>
        </div>

      </div>
    </React.Fragment>
  );
}