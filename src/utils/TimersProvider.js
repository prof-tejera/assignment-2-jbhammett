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

    const secondsOptions = [0, 15, 30, 45];
    
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

                // selectTimer: ({ value }) => {
                //     setSelectedTimer(value);
                //     console.log(value);
                // },

                openTimer: ({ id }) => {
                    const t = timers.find(t => t.id === id);
                    setSelectedTimer(t);
                  },



                handleTimerStart: (timer) => {
                    console.log(`isRunning ${timer.isRunning}`);
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
                        
                       
                        // if (totalSeconds.current > 0 && rounds > 0){
                        if (totalSeconds.current > 0 && timer.rounds > 0){
                            console.log(timer.isRunning);
                            // Start timer
                                secondsCountInterval.current = setInterval(() => {
                                    let nextTotalSecondsCounter = 0;
                    
                                    setCounter((prevTotalSecondsCount) => {
                                        console.log(prevTotalSecondsCount);
                                        if (prevTotalSecondsCount > 0) {
                                            nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                                        } 
                                        if (prevTotalSecondsCount === 0 && currentTimerRounds < timer.rounds){
                                
                                            setCurrentTimerRounds((prevRound) =>{
                                        
                                                const nextRound = prevRound + 1;
                                        
                                                // Stop timer when end time is reached on last round
                                                // if (nextRound > rounds){
                                                if (nextRound > timer.rounds){
                                                    nextTotalSecondsCounter = 0;
                                                    
                                                    clearInterval(secondsCountInterval.current);
                                                    timer.isRunning = false;
                                                    return prevRound;
                                                }
                                                // Otherwise, start next round
                                                else {
                                                    nextTotalSecondsCounter = totalSeconds.current;
                                                    setCounter(() => {
                    
                                                        return seconds;
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


                
                // saveTimer: ({ id, minutes, seconds, rounds }) => {
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