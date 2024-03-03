import { Hero, Navbar } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Navbar/>
     <div className="container mt-24 mx-auto px-12 py-4">
       <Hero/>
      </div>
      
    </main>
  );
}
