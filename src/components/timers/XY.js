import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";
import { CalculateTotalSeconds, HandleStopButton, setTimes, CalculateMinutesSeconds } from "../../utils/helpers";


const XY = () => {

const [displayRounds, setDisplayRounds] = useState(1);



const [startMinutes, setStartMinutes] = useState('00');
const [startSeconds, setStartSeconds] = useState('00');
const [rounds, setRounds] = useState(0);
const [counter, setCounter] = useState(0);

const totalSeconds = useRef(0);
const secondsCountInterval = useRef(null);

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


const handleStartButton = (value) => {

    isRunning.current = true;

    let seconds = CalculateTotalSeconds(startMinutes, startSeconds);

    totalSeconds.current = seconds;


    if (totalSeconds.current > 0 && rounds > 0){

    // Start timer
        secondsCountInterval.current = setInterval(() => {
            let nextTotalSecondsCounter = 0;

            setCounter((prevTotalSecondsCount) => {
                if (prevTotalSecondsCount > 0) {
                    nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                } 
                if (prevTotalSecondsCount === 0 && displayRounds < rounds){
        
                    setDisplayRounds((prevRound) =>{
                 
                        const nextRound = prevRound + 1;
                

                        // Stop timer when end time is reached on last round
                        if (nextRound > rounds){
                            nextTotalSecondsCounter = 0;
                            
                            clearInterval(secondsCountInterval.current);
                            isRunning.current = false;
                            return prevRound;
                        }
                        // Otherwise, start next round
                        else {
                            nextTotalSecondsCounter = totalSeconds.current;
                            setCounter(() => {

                                return CalculateTotalSeconds(startMinutes, startSeconds);
                            });
                            return nextRound;
                        }
                    });
                }
    

                return nextTotalSecondsCounter;
            });
        
        }, 1000);
        
    }
  };



  const handleResetButton = (value) => {
    setTimes('00',setStartMinutes, setStartSeconds);
    isRunning.current = false;
    setCounter(0);
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
    setCounter(0);
    isRunning.current = false;
    if (secondsCountInterval.current) {
        clearInterval(secondsCountInterval.current);
        secondsCountInterval.current = null;
    }
  };

return (
    <div>
        <Panel type="XY">
            <h6 style={{
                marginBottom:0,
            }}>Minutes : Seconds
            </h6>
            <TimerInput options={minutesOptions} value={startMinutes} timeType="Minutes" onChange={handleMinutesInput}/>:
            <TimerInput options={secondsOptions} value={startSeconds} timeType="Seconds" onChange={handleSecondsInput}/>

            <div>
                <DisplayTitle title="Rounds" />
                <TimerInput options={roundsOptions} value={rounds} onChange={handleRoundsInput}/>
            </div>

            <DisplayRounds round={displayRounds} totalRounds={rounds} />
            <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>
  

            {!isRunning.current && (startMinutes !== '00' || startSeconds !== '00') && (rounds > 0) && (counter === CalculateTotalSeconds(startMinutes, startSeconds)) && 
                <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
            }
            {/* {isRunning.current && ((displayRounds < rounds) || (( displayRounds === rounds && (CalculateMinutesSeconds(counter)[0] > 0 || CalculateMinutesSeconds(counter)[1] > 0)))) &&   */}
            {isRunning.current &&    
                <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} /> 
            }  
            {
                (startMinutes !== '00' || startSeconds !== '00') &&
                <Button value={"Reset"} color='#aaa0ff' onClick={handleResetButton} /> 
            }
            {/* {isRunning.current && (startMinutes !== CalculateMinutesSeconds(counter)[0] || startSeconds !== CalculateMinutesSeconds(counter)[1]) && */}
            {isRunning.current &&
                <Button value={"End"} color='#aaa0ff' onClick={handleEndButton} />
            }    
        </Panel>        
    </div>

    );
};





export default XY;
