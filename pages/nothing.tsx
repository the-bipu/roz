import Head from 'next/head'
import React from 'react'

const nothing = () => {
  return (
    <div className='bg-black w-full h-screen'>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="70x70" />
        <title>.</title>
      </Head>
    </div>
  )
}

export default nothing