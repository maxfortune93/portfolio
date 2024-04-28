import { About, Hero, Navbar, Project } from "@/components";
import { EmailSection } from "@/components/EmailSection";
import { Footer } from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Navbar/>
     <div className="container mt-24 mx-auto px-12 py-4">
       <Hero/>
       <About/>
       <Project/>
       <EmailSection />
      </div>
      <Footer/>
      <ToastContainer className='w-96 text-sm' />
    </main>
  );
}
