import React from "react";
import { useContext, useRef, useState, useEffect } from 'react';

import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";
import { CalculateMinutesSeconds, CalculateTotalSeconds, ResetTimer } from "../../utils/helpers";
import { TimersContext } from "../../utils/TimersProvider";

const Tabata = ({ id, index, startMinutes, startSeconds, rounds, startRestMinutes, startRestSeconds, isRunning }) => {
    
    const {  timers, currentIndex, setCurrentIndex, } = useContext(TimersContext);

    const workDuration = CalculateTotalSeconds(startMinutes, startSeconds);
    const restDuration = CalculateTotalSeconds(startRestMinutes, startRestSeconds);
    const [counter, setCounter] = useState(workDuration);
    const [restCounter, setRestCounter] = useState(restDuration);
    const secondsCountInterval = useRef(0);
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
        ResetTimer(isRunning, secondsCountInterval, setCounter, workDuration);
        setRestCounter(restDuration);
        setRoundsCounter(1);
    }, [isRunning]);

    useEffect(() => {
        if (index === currentIndex) {
            secondsCountInterval.current = setInterval(() => {
                console.log(`Tabata counter ${counter}`);
                console.log(`Tabata rest counter ${restCounter}`);
                if(counter > 0){
                    setCounter(prev => {
                        return prev - 1;
                    });
                }
                else if (counter <= 0 && restCounter > 0){
                    setRestCounter(prevRest => {
                        return prevRest - 1;
                    });
                }
            
          }, 1000);
        }
    
        return () => {
          clearInterval(secondsCountInterval.current);
        };
      }, [currentIndex, counter, restCounter]);

      useEffect(() => {
        if (restCounter === 0 && roundsCounter < rounds){
            setRoundsCounter( prev=> {
                return prev + 1;
            });
            setCounter(workDuration);
            setRestCounter(restDuration)
        }; 

        if (restCounter === 0 && roundsCounter == rounds) {
          // I'm done!
          console.log("done");
          clearInterval(secondsCountInterval.current);
          setCurrentIndex(c => c + 1);
          isRunning = 'completed';
        }
      }, [restCounter, roundsCounter]);

    
    return (
        <div>
            <Panel type="Tabata">
         
            <div>
                <h5 style = {{
                    textTransform: 'capitalize',
                }}
                
                >{isRunning}</h5>
            </div>
  

            <DisplayTitle title="Work" />
            {isRunning === 'not running' && <DisplayTime minutes={startMinutes} seconds={startSeconds}/>}
            {isRunning === 'running' && <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/>}
            {isRunning === 'completed' && <DisplayTime minutes="0" seconds="0" />}

            <DisplayTitle title="Rest" />
            {isRunning === 'not running' && <DisplayTime minutes={startMinutes} seconds={startSeconds}/>}
            {isRunning === 'running' && <DisplayTime minutes={CalculateMinutesSeconds(restCounter)[0]} seconds={CalculateMinutesSeconds(restCounter)[1]} />}
            {isRunning === 'completed' && <DisplayTime minutes="0" seconds="0" />}


            {isRunning === 'not running' && <DisplayRounds round="1" totalRounds={rounds} />}
            {isRunning === 'running' && <DisplayRounds round={roundsCounter} totalRounds={rounds} />}
            {isRunning === 'completed' && <DisplayRounds round={rounds} totalRounds={rounds} />}
            
        </Panel>  
        </div>
    
        );
    };


export default Tabata;
