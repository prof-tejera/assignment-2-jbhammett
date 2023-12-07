import React from "react";
import { useState, useEffect, useRef, useContext } from 'react';

import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import { TimersContext } from "../../utils/TimersProvider";

import { CalculateMinutesSeconds, CalculateTotalSeconds, ResetTimer } from "../../utils/helpers";

/** *
 * Change counter to state variable. Will need to change all of these from .current
 * Set isRunning useRef
*/
const Countdown = ({ id, index, startMinutes, startSeconds, isRunning })=> {
    const { timers, currentIndex, setCurrentIndex } = useContext(TimersContext);
    
    const duration = CalculateTotalSeconds(startMinutes, startSeconds);
    const [counter, setCounter] = useState(duration);
    const secondsCountInterval = useRef(0);
    const totalSeconds = useRef(duration);

    if (index === currentIndex){
        isRunning = 'running';
    }
    else if (index < currentIndex){
        isRunning = 'completed';
    }
    else {
        isRunning = 'not running';
    }

    useEffect(() => {
        ResetTimer(isRunning, secondsCountInterval, setCounter, duration);
    }, [isRunning]);

    useEffect(() => {
        if (index === currentIndex) {
            secondsCountInterval.current = setInterval(() => {
            setCounter(prev => {
              return prev - 1;
            });
          }, 1000);
        }
    
        return () => {
          clearInterval(secondsCountInterval.current);
        };
      }, [currentIndex]);
    
      useEffect(() => {
        if (counter === 0) {
          // I'm done!
          console.log("done");
          clearInterval(secondsCountInterval.current);
          setCurrentIndex(c => c + 1);
          isRunning = 'completed'; //don't need this here. 
        }
      }, [counter]);
    // const [startMinutes, setStartMinutes] = useState('00');
    // const [startSeconds, setStartSeconds] = useState('00');
    // const [countdownCounter, setCountdownCounter] = useState(CalculateTotalSeconds(startMinutes, startSeconds));
    
    // const totalSeconds = useRef(0);
    // const secondsCountInterval = useRef(null);


    // isRunning = useRef();


    

    // const secondsOptions = [0, 15, 30, 45];
    // const minutesOptions = [];
    // for (let i=0; i < 60; i++){
    //     minutesOptions.push(i);
    // }

    // const handleMinutesInput = v => {
    //     setStartMinutes(v);
      
        // setCounter(() => {
        //     return CalculateTotalSeconds(v, startSeconds);
        // });        
    // };

    // const handleSecondsInput = v => {
    //     setStartSeconds(v);
    //     setCounter(() => {
    //         return CalculateTotalSeconds(startMinutes, v);
    //     });
    // };



    // const handleStartButton = () => {
        
    //     isRunning.current = true;
 
    //     let seconds = CalculateTotalSeconds(startMinutes, startSeconds);
    
    //     totalSeconds.current = seconds;
        
    
    //     if (totalSeconds.current > 0){

    //         // Start timer
    //         secondsCountInterval.current = setInterval(() => {
    //             setCounter((prevTotalSecondsCount) => {
    //             const nextTotalSecondsCounter = prevTotalSecondsCount - 1;
        
    //             // Stop timer when end time is reached
    //             if (nextTotalSecondsCounter === 0) {
    //                 clearInterval(secondsCountInterval.current);
    //                 isRunning.current = false;
    //             }
                
    //             return nextTotalSecondsCounter;
    //         });
    //         }, 1000);
            
    //     }
    //   };


    //   const handleResetButton = (value) => {
    
    //     // setTimes('00', setStartMinutes, setStartSeconds);
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
    //     setCounter(0);
    //     if (secondsCountInterval.current) {
    //         clearInterval(secondsCountInterval.current);
    //         secondsCountInterval.current = null;
    //     }
    //   };

	return (
        <div>
            <Panel type="Countdown">
      
                {/* <h6 style={{
                    marginBottom:0,
                }}>Minutes : Seconds
                </h6> */}
                {/* <TimerInput options={minutesOptions} value={startMinutes} timeType="Minutes" onChange={handleMinutesInput}/>: */}
                {/* <TimerInput options={secondsOptions} value={startSeconds} timeType="Seconds" onChange={handleSecondsInput}/> */}

                <div>
                    <h5 style = {{
                        textTransform: 'capitalize',
                    }}
                    
                    >{isRunning}</h5>
                </div>

                {isRunning === 'running' && <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>}
                {isRunning === 'not running' && <DisplayTime minutes={startMinutes} seconds={startSeconds}/>}
                {isRunning === 'completed' && <DisplayTime minutes="0" seconds="0" />}
                {/* <DisplayTime minutes={startMinutes} seconds={startSeconds}/> */}

                {/* {!isRunning.current && (startMinutes !== '00' || startSeconds !== '00') && (counter === CalculateTotalSeconds(startMinutes, startSeconds)) && 
                    <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
                
                {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter.current[1])) &&  
                    <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} /> 
                }  
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


export default Countdown;
