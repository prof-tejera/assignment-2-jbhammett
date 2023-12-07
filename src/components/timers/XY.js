import React from "react";
import { useContext, useRef, useState, useEffect } from 'react';

import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import { CalculateMinutesSeconds, CalculateTotalSeconds, ResetTimer } from "../../utils/helpers";
import { TimersContext } from "../../utils/TimersProvider";

const XY = ({ id, index, startMinutes, startSeconds, rounds, isRunning }) => {
    const {  timers, currentIndex, setCurrentIndex, } = useContext(TimersContext);
    // const [displayRounds, setDisplayRounds] = useState(1);

    const duration = CalculateTotalSeconds(startMinutes, startSeconds);
    const [counter, setCounter] = useState(duration);
    const secondsCountInterval = useRef(0);
    const totalSeconds = useRef(duration);
    const [roundsCounter, setRoundsCounter] = useState(1);

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
        setRoundsCounter(1);
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
        if (counter === 0 && roundsCounter < rounds){
            setRoundsCounter( prev=> {
                return prev + 1;
            });
            setCounter(duration);
        }; 

        if (counter === 0 && roundsCounter == rounds) {
          // I'm done!
          console.log("done");
          clearInterval(secondsCountInterval.current);
          setCurrentIndex(c => c + 1);
          isRunning = 'completed';
        }
      }, [counter, rounds]);



    // const handleMinutesInput = v => {
    //     setStartMinutes(v);
    //     setCounter(() => {
    //         return CalculateTotalSeconds(v, startSeconds);
    //     }); 
    // };

    // const handleSecondsInput = v => {
    //     setStartSeconds(v);
    //     setCounter(() => {
    //         return CalculateTotalSeconds(startMinutes, v);
    //     });
    // };

    // const handleRoundsInput = v => {
    //     setRounds(v);

    // };


    // const handleStartButton = (value) => {

    //     isRunning.current = true;

    //     let seconds = CalculateTotalSeconds(startMinutes, startSeconds);

    //     totalSeconds.current = seconds;


    //     if (totalSeconds.current > 0 && rounds > 0){

    //     // Start timer
    //         secondsCountInterval.current = setInterval(() => {
    //             let nextTotalSecondsCounter = 0;

    //             setCounter((prevTotalSecondsCount) => {
    //                 if (prevTotalSecondsCount > 0) {
    //                     nextTotalSecondsCounter = prevTotalSecondsCount - 1;
    //                 } 
    //                 if (prevTotalSecondsCount === 0 && displayRounds < rounds){
            
    //                     setDisplayRounds((prevRound) =>{
                    
    //                         const nextRound = prevRound + 1;
                    
    //                         // Stop timer when end time is reached on last round
    //                         if (nextRound > rounds){
    //                             nextTotalSecondsCounter = 0;
                                
    //                             clearInterval(secondsCountInterval.current);
    //                             isRunning.current = false;
    //                             return prevRound;
    //                         }
    //                         // Otherwise, start next round
    //                         else {
    //                             nextTotalSecondsCounter = totalSeconds.current;
    //                             setCounter(() => {

    //                                 return CalculateTotalSeconds(startMinutes, startSeconds);
    //                             });
    //                             return nextRound;
    //                         }
    //                     });
    //                 }
        

    //                 return nextTotalSecondsCounter;
    //             });
            
    //         }, 1000);
            
    //     }
    // };



    // const handleResetButton = (value) => {
    //     // setTimes('00',setStartMinutes, setStartSeconds);
    //     isRunning.current = false;
    //     setCounter(0);
    //     // setRounds(0);
    //     setDisplayRounds(1);
    //     totalSeconds.current = 0;
    //     if (secondsCountInterval.current) {
    //         clearInterval(secondsCountInterval.current);
    //         secondsCountInterval.current = null;
    //     }
    // };

    // const handleEndButton = (value) => { 
    //     setDisplayRounds(rounds);
    //     setCounter(0);
    //     isRunning.current = false;
    //     if (secondsCountInterval.current) {
    //         clearInterval(secondsCountInterval.current);
    //         secondsCountInterval.current = null;
    //     }
    // };

    return (
        <div>
            <Panel type="XY">
            
                {/* <h6 style={{
                    marginBottom:0,
                }}>Minutes : Seconds
                </h6> */}
                {/* <TimerInput options={minutesOptions} value={startMinutes} timeType="Minutes" onChange={handleMinutesInput}/>: */}
                {/* <TimerInput options={secondsOptions} value={startSeconds} timeType="Seconds" onChange={handleSecondsInput}/> */}

                {/* <div>
                    <DisplayTitle title="Rounds" />
                    <TimerInput options={roundsOptions} value={rounds} onChange={handleRoundsInput}/>
                </div> */}

                {/* <DisplayRounds round={displayRounds} totalRounds={rounds} /> */}
                <div>
                    <h5 style = {{
                        textTransform: 'capitalize',
                    }}
                    
                    >{isRunning}</h5>
                </div>
                {isRunning === 'running' && <DisplayRounds round={roundsCounter} totalRounds={rounds} />}
                {(isRunning ==='not running' || isRunning ==='completed') && <DisplayRounds round="1" totalRounds={rounds} />}
                
                
                {/* {isRunning && <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>} */}
                {/* <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/> */}
                {isRunning === 'running' && <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>}
                {isRunning ==='not running' && <DisplayTime minutes={startMinutes} seconds={startSeconds}/>}
                {isRunning ==='completed' && <DisplayTime minutes="0" seconds="0" />}
    
{/* 
                {!isRunning.current && (startMinutes !== '00' || startSeconds !== '00') && (rounds > 0) && (counter === CalculateTotalSeconds(startMinutes, startSeconds)) && 
                    <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
                }
                {/* {isRunning.current && ((displayRounds < rounds) || (( displayRounds === rounds && (CalculateMinutesSeconds(counter)[0] > 0 || CalculateMinutesSeconds(counter)[1] > 0)))) &&   */}
                {/* {isRunning.current &&    
                    <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} /> 
                }   */}
                {/* {
                    (startMinutes !== '00' || startSeconds !== '00') &&
                    <Button value={"Reset"} color='#aaa0ff' onClick={handleResetButton} /> 
                } */}
                {/* {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter)[1]) && */}
                {/* {isRunning.current &&
                    <Button value={"End"} color='#aaa0ff' onClick={handleEndButton} />
                }      */}
            </Panel>        
        </div>

        );
};





export default XY;
