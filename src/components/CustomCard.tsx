import React from 'react'
import Image from 'next/image';
import { CardProps } from '../../types';
import Link from 'next/link';

const CustomCard = ({imgUrl, title, description, gitUrl, previewUrl}: CardProps) => {
  return (
    

    <div className="max-w-xl border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='h-72 w-auto relative' >
            {/* <img className="rounded-t-lg" src="/images/about-image.png" alt="" /> */}
            <Image className=" object-cover rounded-t-lg" src={imgUrl} alt="" fill
          sizes="(min-width: 808px) 50vw, 100vw"
            quality={100}
            />
        </div>
        <div className="p-2">
            
                <h3 className="mb-1 text-lg  text-center font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h3>

            <p className="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">
               {description}
            </p>
            <div className='flex gap-3 mt-3'>
                <Link href={gitUrl} type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center inline-flex items-center ">
                    <Image src='/github.svg' alt='github' width={25} height={25} className="me-2" />
                    Repository
                </Link>
                {previewUrl && (
                <Link href={previewUrl} type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center inline-flex items-center ">
                    <Image src='/github.svg' alt='github' width={25} height={25} className="me-2" />
                    Visitar
                </Link>
                )}
            </div>
        </div>
    </div>

  )
}

export default CustomCard;