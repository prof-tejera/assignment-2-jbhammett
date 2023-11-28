import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import { CalculateTotalSeconds, HandleStopButton, setTimes, CalculateMinutesSeconds } from "../../utils/helpers";



const Stopwatch = ({startMinutes, startSeconds}) =>  {

    // startMinutes = parseInt(startMinutes);
    // startSeconds = parseInt(startSeconds);

    // const [startMinutes, setStartMinutes] = useState('00');
    // const [startSeconds, setStartSeconds] = useState('00');
    const [counter, setCounter] = useState(0);
    
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);

    const isRunning = useRef(false);

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

    

    const handleStartButton = (value) => {
        isRunning.current = true;
  
        let seconds = CalculateTotalSeconds(startMinutes, startSeconds);
    
        totalSeconds.current = seconds;
        
        if (totalSeconds.current > 0){
        // Start timer
            secondsCountInterval.current = setInterval(() => {
                    setCounter((prevTotalSecondsCount) => {
                    const nextTotalSecondsCounter = prevTotalSecondsCount + 1;
                
                    // Stop timer when end time is reached
                    if (nextTotalSecondsCounter === totalSeconds.current) {
                        clearInterval(secondsCountInterval.current);
               
                        isRunning.current = false;
                    }                   
                    return nextTotalSecondsCounter;
                });
                
            }, 1000);
            
        }
      };


      const handleResetButton = (value) => {

        setTimes('00', startMinutes, startSeconds);

        isRunning.current = false;
        setCounter(0);
  
        totalSeconds.current = 0;
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };

      const handleEndButton = (value) => {

        isRunning.current = false;
        setCounter(totalSeconds.current);
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };


	return (
        <div>
            <Panel type="Stopwatch">
      
                <h6 style={{
                    marginBottom:0,
                }}>Minutes : Seconds
                </h6>
                {/* <TimerInput options={minutesOptions} value={startMinutes} timeType="Minutes" onChange={handleMinutesInput}/>: */}
                {/* <TimerInput options={secondsOptions} value={startSeconds} timeType="Seconds" onChange={handleSecondsInput}/> */}

                <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>
                {/* <DisplayTime minutes={startMinutes} seconds={startSeconds}/> */}
            

                {!isRunning.current && (startMinutes !== '00' || startSeconds !== '00') && (counter === 0) && 
                    <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
                }
                {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter.current[1])) &&  
                    <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} /> 
                }  
                {
                    (startMinutes !== '00' || startSeconds !== '00') &&
                    <Button value={"Reset"} color='#aaa0ff' onClick={handleResetButton} /> 
                }
                {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter.current)[1]) &&
                    <Button value={"End"} color='#aaa0ff' onClick={handleEndButton} />
                }    
            </Panel>
        </div>

		);
};
export default Stopwatch;
