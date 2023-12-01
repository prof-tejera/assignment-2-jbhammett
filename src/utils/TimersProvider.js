import React, { useState, useRef } from 'react';
import { makeId, CalculateTotalSeconds } from "../utils/helpers";

export const TimersContext = React.createContext({});

const TimersProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [currentTimer, setCurrentTimer] = useState(null);
    const [counter, setCounter] = useState(0);
    const [restCounter, setRestCounter] = useState(0);
    const [currentTimerRounds, setCurrentTimerRounds] = useState(1);
  
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);

    const closeEditor = () => {
        setSelectedTimer(null);
    };

    const secondsOptions = [0, 5, 15, 30, 45];
    
    const minutesOptions = []
    for (let i=0; i < 60; i++){
        minutesOptions.push(i);
    }

    const roundsOptions = []
    for (let j=0; j < 20; j++){
        roundsOptions.push(j);
    }

    return (
        <TimersContext.Provider
            value={{
                timers,
                editorOpen: !!selectedTimer,
                // currentTimer,
                selectedTimer,
                secondsOptions,
                minutesOptions,
                roundsOptions,
                totalSeconds,
                counter,
                restCounter,
                // countdownCounter,
                closeEditor,
                deleteTimer: ({ id }) => setTimers(timers.filter(x => id !== id)),
                openEditor: () => setSelectedTimer({}),


                openTimer: ({ id }) => {
                    const t = timers.find(t => t.id === id);
                    setSelectedTimer(t);
                  },



                handleTimerStart: (timer) => {
                    
                    console.log(timer);
                    timer.isRunning = true;
                    let seconds = CalculateTotalSeconds(timer.startMinutes, timer.startSeconds);
                    totalSeconds.current = seconds;

                    if (timer.selectedTimer === 'Stopwatch') {
                        
                        if (totalSeconds.current > 0){
                            // Start timer
                                secondsCountInterval.current = setInterval(() => {
                                    setCounter((prevTotalSecondsCount) => {
                                
                                        const nextTotalSecondsCounter = prevTotalSecondsCount+ 1;
                                    
                                        // Stop timer when end time is reached
                                        if (nextTotalSecondsCounter === totalSeconds.current) {
                                            clearInterval(secondsCountInterval.current);
                                
                                            timer.isRunning = false;
                                        }                   
                                        return nextTotalSecondsCounter;
                                        
                                    });

                                }, 1000);
                                
                            }
                    }

                    else if (timer.selectedTimer === 'Countdown') {
                        setCounter(seconds);
                        if (totalSeconds.current > 0){

                            // Start timer
                            secondsCountInterval.current = setInterval(() => {
                                setCounter((prevTotalSecondsCount) => {
                                const nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                        
                                // Stop timer when end time is reached
                                if (nextTotalSecondsCounter === 0) {
                                    clearInterval(secondsCountInterval.current);
                                    timer.isRunning = false;
                                }
                                
                                return nextTotalSecondsCounter;
                            });
                            }, 1000);
                            
                        }
                    }

                    else if (timer.selectedTimer === 'XY') {
                        setCounter(seconds);
                        // console.log(`seconds ${seconds}`);

                        if (totalSeconds.current > 0 && timer.rounds > 0){

                            // Start timer
                                // let nextTotalSecondsCounter = 0;
                                secondsCountInterval.current = setInterval(() => {
                                    let nextTotalSecondsCounter = 0;
                                    
                    
                                    setCounter((prevTotalSecondsCount) => {
                                        // console.log("setCounter");
                                        console.log(`prevTotalSecondsCount ${prevTotalSecondsCount}`);
                                        if (prevTotalSecondsCount > 0) {
                                            nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                                        } 
                                        // if (prevTotalSecondsCount === 0 && displayRounds < rounds){
                                        if (prevTotalSecondsCount === 0 && currentTimerRounds < timer.rounds){
                                            console.log(`currentTimerRounds ${currentTimerRounds}`);
                                            console.log(`timer.rounds ${timer.rounds}`);
                                            setCurrentTimerRounds((prevRound) =>{
                                                console.log("setCurrentTimeRounds");
                                                console.log(`prevRound ${prevRound}`);
                                                const nextRound = prevRound + 1;
                                        
                                                // Stop timer when end time is reached on last round
                                                if (nextRound > timer.rounds){
                                                    console.log(`nextRound ${nextRound}`);
                                                    console.log(`timer.rounds ${timer.rounds}`);
                                                    nextTotalSecondsCounter = 0;
                                                    
                                                    clearInterval(secondsCountInterval.current);
                                                    console.log("setting isRunning to false");
                                                    timer.isRunning = false;
                                                    return prevRound;
                                                }
                                                // Otherwise, start next round
                                                else {
                                                    nextTotalSecondsCounter = totalSeconds.current;
                                                    console.log(`nextTotalSecondsCounter ${nextTotalSecondsCounter}`);
                                                    setCounter(() => {
                    
                                                        return CalculateTotalSeconds(timer.startMinutes, timer.startSeconds);
                                                    });
                                                    return nextRound;
                                                }
                                            });
                                        }
                            
                    
                                        return nextTotalSecondsCounter;
                                    });
                                
                                }, 1000);
                                
                            }
                        
                    }
                    


                },

                saveTimer: ({ id, selectedTimer, startMinutes, startSeconds, rounds, startRestMinutes, startRestSeconds, isRunning }) => {
                    const updatedTimer = {
                        id,
                        selectedTimer,
                        startMinutes,
                        startSeconds, 
                        rounds,
                        startRestMinutes,
                        startRestSeconds,
                        isRunning,
                    };

                    if (id) {
                        const updatedTimers = timers.map(t => (t.id === id ? updatedTimer : t ));
                        setTimers(updatedTimers);
                    } else {
                        
                        setTimers([
                            ...timers,
                            {
                                ...updatedTimer,
                                id: makeId(),
                                isRunning: false,
                              
                            },
                        ])
                        
                    }
                    closeEditor();
            
                },
 
            }}
        >
            {children}
        </TimersContext.Provider>


    );
};

export default TimersProvider;