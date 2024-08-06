"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/Schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link';


function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    fetchInterviewDetails();
  }, []);

  const fetchInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5'>
          {interviewData ? (
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
              <h2 className='text-lg'>
                <strong>Job Role/Job Position: </strong>
                {interviewData.jobPosition}
              </h2>
              <h2 className='text-lg'>
                <strong>Job Description/Tech Stack: </strong>
                {interviewData.jobDesc}
              </h2>
              <h2 className='text-lg'>
                <strong>Years of Experience: </strong>
                {interviewData.jobExperience}
              </h2>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div>
          <Alert>
 
  <AlertTitle>Information!</AlertTitle>
  <AlertDescription>
   <h2>
    {process.env.NEXT_PUBLIC_INFORMATION}
   </h2>
  </AlertDescription>
</Alert>

          </div>
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{ height: 400, width: 800 }}
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-10 bg-gray-100 rounded-lg border' />
              <Button variant='ghost' className='w-full ' onClick={() => setWebcamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
          )}
        </div>
      </div>
          <div className='flex justify-end items-end my-10'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
            <Button className>Start Interview</Button>
            </Link>
         
          </div>
      
    </div>
  );
}

export default Interview;
