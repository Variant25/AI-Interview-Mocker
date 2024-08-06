"use client"
import React, { useEffect, useState } from 'react';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/Schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviewDetails();
  }, []);

  const fetchInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      setError('Error fetching interview details');
      console.error('Error fetching interview details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionsSection 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video / Audio Recording */}
        <RecordAnswerSection  mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData} />
      </div>

      <div className='flex justify-end gap-6 my-10'>
        {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
       {activeQuestionIndex==mockInterviewQuestion?.length-1&&
       <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
       <Button>End Interview</Button>
       </Link>} 
      </div>
    </div>
  );
}



export default StartInterview;
