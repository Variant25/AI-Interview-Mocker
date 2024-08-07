import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 ">
      <div className='flex p-4 items-center justify-between bg-gray-100 shadow-sm'>
        <Image src={'/logo.svg'} width={50} height={80} alt='logo' />
        <Link href="/dashboard"> <Button className='rounded-xl'>Dashboard</Button></Link>
      </div>
      <div className="relative h-[80vh] flex items-center justify-center">
        <Image 
          src={'/bg.jpg'} 
          layout="fill" 
          objectFit="cover" 
          alt="background-image" 
          className="h-full w-full object-cover "
        />
        <div className="absolute text-center text-white ">
        <h2 className="text-xl md:text-5xl font-bold">Prepare for your Interview with AI</h2>  
        <h2 className="text-lg   md:text-3xl mt-5">Get ready to ace your next job interview with our AI-driven tool</h2>
        </div>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5 px-5'>
      <div className="mt-12 px-5">
      <h2 className="text-xl md:text-3xl font-bold text-left">Creating Mock Interview</h2>  
      <p className="text-md md:text-lg mt-5 text-left ">Set up your mock interview with our advanced AI technology. Tailor your practice sessions effectively by leveraging the power of the Gemini API. Follow the simple steps to create, conduct, and receive feedback on your mock interviews. </p>
      <ul className="list-decimal list-inside text-left mt-2">
            <li className="my-2">Create Mock Interview</li>
            <li className="my-2">Read Instructions</li>
            <li className="my-2">Give Interview</li>
            <li className="my-2">Receive Feedback & Rating</li>
          </ul>
      </div>
    <div  className=" relative h-[50vh] flex items-center justify-center rounded-md overflow-hidden">
    <Image 
          src={'/ai.avif'} 
          layout="fill" 
          objectFit="cover" 
          alt="background-image" 
          className="h-full w-full object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
        />
    </div>
      </div>

      <section className="mt-16">
          
         
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5 px-5'>
     
    <div  className=" relative h-[50vh] flex items-center justify-center rounded-md overflow-hidden">
    <Image 
          src={'/Ai_interview.jpg'} 
          layout="fill" 
          objectFit="cover" 
          alt="interview-image" 
          className="h-full w-full  rounded-lg transform transition-transform duration-500 hover:scale-110"
        />
    </div>
    <div className="mt-12 px-5">
      <h2 className="text-xl md:text-3xl font-bold text-left">Giving Interview</h2>  
      <p className="text-md md:text-lg mt-5 text-left ">During the mock interview, it's crucial to focus on your attention and presentation. Make sure to answer each question thoughtfully and clearly. This process will help you get accustomed to the interview environment and improve your performance.</p>
      
      </div>
      </div>
        </section>

        <section className="mt-16">
            
     
           
             <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5 px-5'>


             <div className="mt-12 px-5">
       <h2 className="text-xl md:text-3xl font-bold text-left">Receiving Feedback</h2>  
       <p className="text-md md:text-lg mt-5 text-left ">After completing your mock interview, you will receive detailed feedback based on your responses. This feedback will include a comparison of your answers with the expected answers, highlighting areas of improvement. Use this feedback to refine your answers and enhance your preparation for actual interviews.</p>
       
       </div>
     
     <div  className=" relative h-[50vh] flex items-center justify-center rounded-md overflow-hidden">
     <Image 
           src={'/feedback.jpg'} 
           layout="fill" 
           objectFit="cover" 
           alt="background-image" 
           className="h-full w-full object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
         />
     </div>
    
       </div>
           </section>

           <footer className="bg-white shadow mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          

          <div className="mt-8 flex justify-center space-x-8">
            
            <a href="#" className="text-gray-700">Pricing</a>
         
           
            <a href="#" className="text-gray-700">About us</a>
            <a href="#" className="text-gray-700">Contact us</a>
            <a href="#" className="text-gray-700">Terms</a>
            <a href="#" className="text-gray-700">Privacy</a>
          </div>

          <div className="mt-8">
            <p className="text-gray-500">&copy; Variant25, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
