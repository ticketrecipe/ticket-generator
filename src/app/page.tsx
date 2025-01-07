'use client';
import React from 'react';
import Ticket from './components/ticket';
import NewSubmission from './components/newsubmission';


export default function Home() {
   const [data, setData] = React.useState({});
   const [isreset, setIsReset] = React.useState(false);
   const [submitted, setIsSubmitted] = React.useState(false);
   
   const onSubmitCallBack = (res: any) => {
        setData(res);
        setIsSubmitted(true);
   }

   const resetData = (stat: any) => {
      setIsReset(stat);
      setData({});
      setIsSubmitted(stat ? false : true);
   }

  return (
    <>
    {!submitted && <NewSubmission onSubmitCallBack={onSubmitCallBack} isreset={isreset} resetData={resetData}/>}
    {submitted && <Ticket resetData={resetData} data={data}/>}
    </>
  );
}
