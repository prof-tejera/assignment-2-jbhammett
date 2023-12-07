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


    return (
        <div>
            <Panel type="XY">
            
                <div>
                    <h5 style = {{
                        textTransform: 'capitalize',
                    }}
                    
                    >{isRunning}</h5>
                </div>
                {isRunning === 'running' && <DisplayRounds round={roundsCounter} totalRounds={rounds} />}
                {(isRunning ==='not running' || isRunning ==='completed') && <DisplayRounds round="1" totalRounds={rounds} />}
                                
                {isRunning === 'running' && <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>}
                {isRunning ==='not running' && <DisplayTime minutes={startMinutes} seconds={startSeconds}/>}
                {isRunning ==='completed' && <DisplayTime minutes="0" seconds="0" />}
    
            </Panel>        
        </div>

        );
};





export default XY;
