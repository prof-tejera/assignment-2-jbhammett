import React from "react";
import {  useContext, useRef, useState, useEffect } from 'react';

import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import { CalculateMinutesSeconds, CalculateTotalSeconds, ResetTimer } from "../../utils/helpers";
import { TimersContext } from "../../utils/TimersProvider";


const Stopwatch = ({id, index, startMinutes, startSeconds, isRunning }) =>  {
    const { currentIndex, setCurrentIndex } = useContext(TimersContext);
    const [counter, setCounter] = useState(0);
    const secondsCountInterval = useRef(0);
    const totalSeconds = useRef(CalculateTotalSeconds(startMinutes, startSeconds));
    

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
        // HandleStopButton(isRunning, secondsCountInterval, handleTimerStart);
        ResetTimer(isRunning, secondsCountInterval, setCounter, 0);

        if (isRunning === 'paused') {
            console.log('paused');

            clearInterval(secondsCountInterval);
        }
        
    }, [isRunning]);

    useEffect(() => {
        if (index === currentIndex) {
            secondsCountInterval.current = setInterval(() => {
            setCounter(prev => {
              return prev + 1;
            });
          }, 1000);
        }
    
        return () => {
          clearInterval(secondsCountInterval.current);
        };
      }, [currentIndex]);
    
      useEffect(() => {
        if (counter === totalSeconds.current) {
          clearInterval(secondsCountInterval.current);
          setCurrentIndex(c => c + 1);
          isRunning = 'completed';
        }
      }, [counter]);



	return (
        <div>
            <Panel type="Stopwatch">
      
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
