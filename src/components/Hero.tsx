'use client'
import { handleScrollSection } from '@/utils';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';


const Hero = () => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'pdf/resume_fr.pdf';  // Path to your resume file.
    link.download = 'Marouane_Resume_Fr.pdf';  // Suggested filename to save as.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  return (
    <section>
        <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className='col-span-7 place-self-center text-center sm:text-left'>
        <h1 className='text-white mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold'>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Marouane",
                1500,
                "Full Stack Developer",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
        </h1>
        <p className='text-[#ADB7BE] text-base sm:text-lg lg:text-xl mb-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, debitis eaque! Repudiandae eius nobis iusto sed porro iure eveniet voluptas libero sapiente dolor? Necessitatibus reiciendis voluptatum aperiam quod, mollitia beatae?
        </p>
        <div >
            <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 
             bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 hover:bg-slate-200'
             onClick={() => handleScrollSection('#contact')}
             >
              Hire Me
            </button>
            <button className='px-1 inline-block py-1 rounded-full w-full sm:w-fit 
                 bg-gradient-to-br from-green-400 to-blue-500 hover:bg-slate-800 
                 mt-3'
                 onClick={handleDownload}
            >
                <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                  Download CV
                </span>
            </button>
        </div>
        </div>
        <div className='col-span-5 place-self-center mt-4 lg:mt-0'>
            <div className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] relative'>
            <Image 
                src='/images/hero-image.png'
                alt='hero image'
                className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                width={300}
                height={300}
            />
            </div>
        </div>
        </div>
    </section>
  )
}

export default Hero