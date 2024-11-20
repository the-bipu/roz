'use client';

import React, { useContext } from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={`w-full min-h-screen flex flex-col items-center`}>

      <div className='w-10/12 h-auto flex flex-col items-center justify-center text-2xl mt-44'>
        <h1 className='text-3xl mb-4'>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>Go back to the <Link href="/" className='font-semibold transition-all hover:underline'>homepage</Link>.</p>
      </div>

    </div>
  );
}