"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { toast } from "sonner"
import { useUser } from '@clerk/nextjs'

import Webcam from 'react-webcam';
import { Mic, StopCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/Schema';
import { db } from '@/utils/db'
import moment from 'moment';
function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const {user}=useUser()
  const [loading,setLoading]=useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setUserAnswer(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const SaveUserAnswer=async()=>{
    if(listening)
    {
      setLoading(true)
      SpeechRecognition.stopListening()
      if(userAnswer?.length<10)
      {
        setLoading(false)
        toast('Error while saving your answer, please record again')
        return ;
      }
      const feedbackPrompt="Question"+mockInterviewQuestion[activeQuestionIndex]?.Question+
      ",User Answer" +userAnswer+", based on question and answer for given interview question ,please give rating for the answer and feedback as area of improvement if any "+
      "in just 3 to 5 lines to improve it in JSON fromat with rating field and feedback field "

      const result = await chatSession.sendMessage(feedbackPrompt)
     
      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','')
      console.log(mockJsonResp)
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
      
      const resp= await db.insert(UserAnswer)
      .values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      })
      if(resp){
        toast('User Answer Recorded Successfuly')
      }
      setUserAnswer('')
      setLoading(false)
    }
    else{
      SpeechRecognition.startListening()
    }
  }
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/Webcam.webp'} width={200} height={200} alt='webcam' className='absolute'/>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <Button disable={loading}
        variant='outline' 
        className='my-10' 
        onClick={SaveUserAnswer}
      >
        {listening ? 
          <h2 className='text-red-600 flex gap-2'>
          <StopCircle/>'Stop Recording'
          </h2> 
          : 
          <h2 className='text-blue-600 flex gap-2'>  <Mic /> 'Record Answer'</h2> 
        }
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
     
    </div>
  );
}

export default RecordAnswerSection;
