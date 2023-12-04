import React from "react";
import {  useContext, useRef, useState, useEffect } from 'react';

import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import { CalculateMinutesSeconds, CalculateTotalSeconds } from "../../utils/helpers";
import { TimersContext } from "../../utils/TimersProvider";


const Stopwatch = ({id, startMinutes, startSeconds, isRunning }) =>  {
    const { timers, counter, handleTimerStart, currentTimerCheck, currentTimer, setCurrentTimer } = useContext(TimersContext);
    // const { timers, handleTimerStart, currentTimerCheck, currentTimer, setCurrentTimer, start } = useContext(TimersContext);
    // const [counter, setCounter] = useState(0);
    // const secondsCountInterval = useRef(0);
    
    // console.log(`current timer ${currentTimerCheck.current}`);
    // console.log(id);
    // const current = currentTimerCheck.current;
    // const currentId = current.id;
    // console.log(`currentId ${currentId}`);

    // if (id === currentTimer.id){
    //     const timer = timers.find((t) => t.id = id);
    //     handleStartTimer(timer);
    // }

    // startMinutes = parseInt(startMinutes);
    // startSeconds = parseInt(startSeconds);

    // const [startMinutes, setStartMinutes] = useState('00');
    // const [startSeconds, setStartSeconds] = useState('00');
    // const [counter, setCounter] = useState(0);
    
    // const totalSeconds = useRef(0);
    // const secondsCountInterval = useRef(null);
    
    // const isRunning = useRef(false);

    // const secondsOptions = [0, 15, 30, 45];
    // const minutesOptions = []
    // for (let i=0; i < 60; i++){
    //     minutesOptions.push(i);
    // }


    // const handleMinutesInput = (value) => {
    //     setStartMinutes(value);
    //     setCounter(0);
    // };

    // const handleSecondsInput = (value) => {
    //     setStartSeconds(value);
    //     setCounter(0);
    // };







    const timer = timers.find((t) => t.id = id);
    // const nextTimer = timers[timers.indexOf(timer) + 1];
    // console.log(`timer index ${timers.indexOf(timer)}`);
    // console.log(`nextTimer index ${timers.indexOf(timer) + 1}`);
    // console.log(`current id ${timer.id}`);
    // for (let i = 0; i < timers.length; i++ ){
    //     console.log(`id ${timers[i].id}`);
    // }

    // const handleStartButton = () => {
   
    // if (start && timer === currentTimer) {
    // if (timer === currentTimer) {
    //     handleTimerStart(timer)
    // }
    //     isRunning = 'running';
    //     console.log('running');
  
    //     let seconds = CalculateTotalSeconds(startMinutes, startSeconds);
    
    //     totalSeconds.current = seconds;
    //     console.log(`totalSeconds.current ${totalSeconds.current}`);
        
    //     if (totalSeconds.current > 0){
    //     // Start timer
    //         secondsCountInterval.current = setInterval(() => {
    //             setCounter((prevTotalSecondsCount) => {
    //             const nextTotalSecondsCounter = prevTotalSecondsCount + 1;
            
    //             // Stop timer when end time is reached
    //             if (nextTotalSecondsCounter === totalSeconds.current) {
    //                 clearInterval(secondsCountInterval.current);
            
    //                 isRunning = 'completed';
                    
    //                 // if (prevTotalSecondsCount === 0){
    //                 console.log(`timers ${timers}`);
    //                 console.log(`nextTimer ${nextTimer.id}`);
    //                 setCurrentTimer(nextTimer);
    //                 console.log(`nextTimer after ${nextTimer.id}`);
    //                 currentTimerCheck.current = nextTimer;
    //                 // }
    //             }                   
    //             return nextTotalSecondsCounter;
    //         });
                
    //         }, 1000);
            
    //     }
    // }

    //   };

  
        // console.log(`currentTimer ${currentTimer}`);
        // console.log(`check ${currentTimerCheck.current}`);
        // // const timer = timers.find((t) => t.id = id);
        // console.log(`timer ${timer.id}`);
        // // const nextTimer = timers[timers.indexOf(timer) + 1];
        // console.log(`timer ${timer}`);
        // // if (currentTimerCheck.current === timer ){
        // // const current = currentTimer;
        // // if (currentTimer === timer){
        // const count = counter;
        // const current = currentTimer;
        // console.log(`count ${count}`);
        // console.log(`current ${current}`);
        // if (currentTimer === timer && counter < totalSeconds.current){
        //     console.log("current timer === timer");
        //     // handleTimerStart(timer);
        //     handleStartButton();
        //     // if (isRunning === 'completed'){
        //     //     setCurrentTimer(timers[timerIndex + 1]);
        //     // }
        
        // }
        // else{
        //     console.log("don't match");
        // }
 
    



    //   const handleResetButton = (value) => {

    //     setTimes('00', startMinutes, startSeconds);

    //     isRunning.current = false;
    //     setCounter(0);
  
    //     totalSeconds.current = 0;
    //     if (secondsCountInterval.current) {
    //         clearInterval(secondsCountInterval.current);
    //         secondsCountInterval.current = null;
    //     }
    //   };

    //   const handleEndButton = (value) => {

    //     isRunning.current = false;
    //     setCounter(totalSeconds.current);
    //     if (secondsCountInterval.current) {
    //         clearInterval(secondsCountInterval.current);
    //         secondsCountInterval.current = null;
    //     }
    //   };
 



	return (
        <div>
            <Panel type="Stopwatch">
      
                {/* <h6 style={{
                    marginBottom:0,
                }}>Minutes : Seconds
                </h6> */}
                {/* <TimerInput options={minutesOptions} value={startMinutes} timeType="Minutes" onChange={handleMinutesInput}/>: */}
                {/* <TimerInput options={secondsOptions} value={startSeconds} timeType="Seconds" onChange={handleSecondsInput}/> */}

                {/* ORIGINALLY WORKED */}
                {/* <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/> */}
                <div>
                    <h5 style = {{
                        textTransform: 'capitalize',
                    }}
                    
                    >{isRunning}</h5>
                </div>
                
                {isRunning === 'running' && <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>}
                {isRunning === 'not running' && <DisplayTime minutes="0" seconds="0"/>}
                {isRunning === 'completed' && <DisplayTime minutes={startMinutes} seconds={startSeconds}/>}
                
                
                
                
                {/* <DisplayTime minutes={startMinutes} seconds={startSeconds}/> */}
            

                {/* {!isRunning.current && (startMinutes !== '00' || startSeconds !== '00') && (counter === 0) && 
                    <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
                } */}


                {/* PAUSE/RESUME BUTTON */}
                {/* {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter.current[1])) &&  
                    <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} /> 
                }   */}


{/* 
                {
                    (startMinutes !== '00' || startSeconds !== '00') &&
                    <Button value={"Reset"} color='#aaa0ff' onClick={handleResetButton} /> 
                }
                {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter.current)[1]) &&
                    <Button value={"End"} color='#aaa0ff' onClick={handleEndButton} />
                }     */}
            </Panel>
        </div>

		);
};
export default Stopwatch;
