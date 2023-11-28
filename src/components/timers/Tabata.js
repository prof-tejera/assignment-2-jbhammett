import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";
import { CalculateTotalSeconds, HandleStopButton, setTimes, CalculateMinutesSeconds } from "../../utils/helpers";


const Tabata = () => {

    const [displayRounds, setDisplayRounds] = useState(1);
    
    
    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    const [rounds, setRounds] = useState(0);
    const [startRestMinutes, setStartRestMinutes] = useState('00');
    const [startRestSeconds, setStartRestSeconds] = useState('00');

    
    const totalSeconds = useRef(0);
    const totalRestSeconds = useRef(0);
    const secondsCountInterval = useRef(null);
    const work = useRef(true);
    const [counter, setCounter] = useState(0);
    const [restCounter, setRestCounter] = useState(0);
    const isRunning = useRef(false);

    const secondsOptions = [0, 15, 30, 45];
    const minutesOptions = []
        for (let i=0; i < 60; i++){
            minutesOptions.push(i);
        }

    const roundsOptions = []
    for (let j=0; j < 20; j++){
        roundsOptions.push(j);
}

    const handleMinutesInput = v => {
        setStartMinutes(v);
        setCounter(() => {
            return CalculateTotalSeconds(v, startSeconds);
        }); 
    };

    const handleSecondsInput = v => {
        setStartSeconds(v);
        setCounter(() => {
            return CalculateTotalSeconds(startMinutes, v);
        });
    };
    
    const handleRoundsInput = v => {
        setRounds(v);
    };

    const handleRestMinutesInput = v => {
        setStartRestMinutes(v);
        setRestCounter(() => {
            return CalculateTotalSeconds(v, startRestSeconds);
        }); 
    };

    const handleRestSecondsInput = v => {
        setStartRestSeconds(v);
        setRestCounter(() => {
            return CalculateTotalSeconds(startRestMinutes, v);
        });
    };
    
    
    const handleStartButton = (value) => {

        isRunning.current = true;
        
        let workSeconds = CalculateTotalSeconds(startMinutes, startSeconds);
        
        totalSeconds.current = workSeconds;

        let restSeconds = CalculateTotalSeconds(startRestMinutes, startRestSeconds);
        totalRestSeconds.current = restSeconds;


        if (totalSeconds.current > 0 && rounds > 0){
      
        // Start timer
            secondsCountInterval.current = setInterval(() => {
                let nextTotalSecondsCounter = 0;
                let nextRestSecondsCounter = 0;
                // Work timer
                if (work.current){
  
                        // If seconds counter is not at 0, subtract 1
                    setCounter((prevTotalSecondsCount) => {
                        if (prevTotalSecondsCount > 0) {
                            nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                        }
        

                        // Stop work timer so rest timer can start
                        if (prevTotalSecondsCount === 0){
                            work.current = false;
        
                        }
                        
                        return nextTotalSecondsCounter;

                    });
                }

                else {
                    setRestCounter((prevTotalRestSecondsCount) => {

                        if (prevTotalRestSecondsCount > 0) {
                            nextRestSecondsCounter = prevTotalRestSecondsCount - 1;
                        }

                        if(prevTotalRestSecondsCount === 0 && displayRounds < rounds){
                            setDisplayRounds((prevRound) =>{
                                const nextRound = prevRound + 1;
                                

                                // Stop timer if end time is reached on last round
                                if (nextRound > rounds){
                                    nextTotalSecondsCounter = 0;
                                    nextRestSecondsCounter = 0;
                                
                                    isRunning.current = false;
                                    clearInterval(secondsCountInterval.current);
                                    
                                    return prevRound;
                                }
                                else {
                                   setCounter(() => {
                                        return CalculateTotalSeconds(startMinutes, startSeconds);
                                    });
                                    setRestCounter(() => {
                                        return CalculateTotalSeconds(startRestMinutes, startRestSeconds);
                                    });
                                   nextTotalSecondsCounter = totalSeconds.current;
                                    nextRestSecondsCounter = totalRestSeconds.current;
            
                                    work.current = true;

                                    return nextRound;
                                }
                        
                            });   
                        }
                    
                    return nextRestSecondsCounter;

                });
            }
            }, 1000);
            
        }
      };
    
    
      const handleResetButton = (value) => {
        setTimes('00',setStartMinutes, setStartSeconds);
        setTimes('00',setStartRestMinutes, setStartRestSeconds);
        isRunning.current = false;

        setCounter(0);
  
        setRestCounter(0)
        work.current = true;

        setRounds(0);
        setDisplayRounds(1);
        totalSeconds.current = 0;
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };
    
      const handleEndButton = (value) => { 
        setDisplayRounds(rounds);
        isRunning.current = false;

        setCounter(0);
        setRestCounter(0);

        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };
    
    return (
        <div>
            <Panel type="Tabata">
                <h6 style={{
                    marginBottom:0,
                }}>Minutes : Seconds
                </h6>
            <TimerInput options={minutesOptions} value={startMinutes} timeType="Minutes" onChange={handleMinutesInput}/>:
            <TimerInput options={secondsOptions} value={startSeconds} timeType="Seconds" onChange={handleSecondsInput}/>


            <div>
                <span style={{
                    fontSize: "1rem",
                    marginRight: 5
                }}>
                    Rest
                </span>
                <TimerInput options={minutesOptions} value={startRestMinutes} timeType="Minutes" onChange={handleRestMinutesInput}/>:
                <TimerInput options={secondsOptions} value={startRestSeconds} timeType="Seconds" onChange={handleRestSecondsInput}/>
            </div>    

            <div>
                <DisplayTitle title="Rounds" />
                <TimerInput options={roundsOptions} value={rounds} onChange={handleRoundsInput}/>
            </div>

            <DisplayTitle title="Work" />
            <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>

            <DisplayTitle title="Rest" />
            <DisplayTime minutes={CalculateMinutesSeconds(restCounter)[0]} seconds={CalculateMinutesSeconds(restCounter)[1]}/>


            <DisplayRounds round={displayRounds} totalRounds={rounds} />  

            {!isRunning.current && (startMinutes !== '00' || startSeconds !== '00') && (rounds > 0) && (counter === CalculateTotalSeconds(startMinutes, startSeconds)) && 
                <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
            }
        
            {isRunning.current && ((displayRounds < rounds) || (displayRounds === rounds && (counter > 0 || restCounter > 0 ))) &&  
                
                <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} /> 
            }  
            {
                (startMinutes !== '00' || startSeconds !== '00') &&
                <Button value={"Reset"} color='#aaa0ff' onClick={handleResetButton} /> 
            }
            {/* {isRunning.current && (displayRounds < rounds || (displayRounds === rounds && (counter > 0 || restCounter > 0))) && */}
            {isRunning.current &&
                <Button value={"End"} color='#aaa0ff' onClick={handleEndButton} />
            }    
        </Panel>  
        </div>
    
        );
    };


export default Tabata;
