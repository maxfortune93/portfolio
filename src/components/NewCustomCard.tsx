import { CardProps } from "../../types";
import Link from 'next/link';
import Image from 'next/image';

interface CardComponentProps{
    imgUrl: string;
    imgAlt: string;
    title: string;
    description: string;
    
}

// ({imgUrl, title, description, gitUrl, previewUrl}: CardProps)
const CardComponent = ({ imgUrl, imgAlt, title, description, gitUrl, previewUrl }: CardProps) => {
  return (
    <div className="relative sm:h-[21rem] w-full mb-6 bg-gray-800 rounded-3xl overflow-hidden shadow-custom group">
      <img
        loading='lazy'
        rel="preload"
        src={imgUrl}
        alt={imgAlt}
        className="w-full h-80 sm:h-96 object-cover opacity-40 opacity sm:group-hover:opacity-50 transition-opacity duration-500 ease-in-out "
      />
      <div className="absolute bottom-0 w-54 text-white px-8 py-10 text-start transition-all duration-500 ease-in-out group-hover:hidden hidden sm:block">
        <h2 className="font-semibold text-2xl leading-8">
          {title}
        </h2>
        
      </div>
      <div className="sm:absolute sm:inset-0 w-full p-6 sm:px-8 sm:py-10 flex-col items-start justify-center sm:text-start text-center bg-[#21252e] bg-opacity-95 text-white sm:opacity-0 sm:transition-opacity sm:duration-500 sm:ease-in-out sm:group-hover:opacity-100 shadow">
        <h2 className="font-semibold text-2xl leading-7 mb-4">
          {title}
        </h2>
        <p className="tracking-wide text-sm font-light text-[#949699] break-words">
          {description}
        </p>
        <div className='flex mt-3 w-64 items-end' >
                <Link href={gitUrl} type="button" className="w-full py-2 px-3 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center inline-flex items-center ">
                    <Image src='/github.svg' alt='github' width={22} height={22} className="me-2" />
                    Repository
                </Link>
                {previewUrl && (
                <Link href={previewUrl} type="button" className="w-full py-2 px-3 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center inline-flex items-center ">
                    <Image src='/github.svg' alt='github' width={22} height={22} className="me-2" />
                    Visitar
                </Link>
                )}
            </div>
      </div>
    </div>
  );
};

export default CardComponent;