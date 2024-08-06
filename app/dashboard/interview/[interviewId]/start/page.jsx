"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/Schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';


function StartInterview({params}) {
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
    useEffect(()=>{
        fetchInterviewDetails();
    },[])
    const fetchInterviewDetails = async () => {
        try {
          const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp)
            setMockInterviewQuestion(jsonMockResp)
            setInterviewData(result[0])          
        } catch (error) {
          console.error('Error fetching interview details:', error);
        }
      };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

            {/*   Questions   */}

                <QuestionsSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                />
             {/*  Video . AudioRecording  */}
             <RecordAnswerSection/>

        </div>
    </div>
  )
}

export default StartInterview