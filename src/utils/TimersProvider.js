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
    const totalRestSeconds = useRef(0);
    const secondsCountInterval = useRef(null);
    const counterCheck = useRef(null);
    const roundsCheck = useRef(1);
    const currentTimerCheck = useRef(null);

    const work = useRef(true);

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
                currentTimerRounds,
             
                closeEditor,
                deleteTimer: ({ id }) => setTimers(timers.filter(x => x.id !== id)),
                openEditor: () => setSelectedTimer({}),


                openTimer: ({ id }) => {
                    const t = timers.find(t => t.id === id);
                    setSelectedTimer(t);
                  },



                handleTimerStart: (timer) => {
                    // for (let i=0; i<timers.length; i++){
                        
                        setCurrentTimer(timer);
                        currentTimerCheck.current = timer;
                        let nextTimer = timers[timers.indexOf(timer) + 1];
                        console.log(`inital nextTimer ${nextTimer.selectedTimer}`);
                        
                        console.log(`currentTimerCheck.current ${currentTimerCheck.current}`);
                        if (currentTimerCheck.current === timer) {
                            timer.isRunning = 'running';
                        }
                        else {
                            timer.isRunning = 'not running';
                        }

                        let runningTimer = null;
                        if (currentTimerCheck.current === timers[0]){
                            runningTimer = timers[0];
                        }
                        else {
                            runningTimer = nextTimer;
                        }
                        let seconds = CalculateTotalSeconds(timer.startMinutes, timer.startSeconds);
                        totalSeconds.current = seconds;
                        // clearInterval(secondsCountInterval.current);
                        // if (currentTimerCheck.current === timer){
                        // if (currentTimerCheck.current === timers[0] || currentTimerCheck.current === nextTimer){
                            if (currentTimerCheck.current = runningTimer){
                            if (timer.selectedTimer === 'Stopwatch') {
                                
                                if (totalSeconds.current > 0){
                                    // Start timer
                                        secondsCountInterval.current = setInterval(() => {
                                            console.log(`timer ${timer.selectedTimer}`);
                                            console.log(`currentTimerCheck.current ${currentTimerCheck.current.selectedTimer}`)
                                            setCounter((prevTotalSecondsCount) => {
                                        
                                                const nextTotalSecondsCounter = prevTotalSecondsCount + 1;
                                            
                                                // Stop timer when end time is reached
                                                if (nextTotalSecondsCounter === totalSeconds.current) {
                                                    clearInterval(secondsCountInterval.current);
                                        
                                                    timer.isRunning = 'completed';
                                                    if (timer.isRunning === 'completed' && timers.indexOf(timer) < timers.length){    
                                                        console.log('completed');     
                                                        console.log(timers[timers.indexOf(timer) + 1]);
                                                     
                                                     setCurrentTimer(nextTimer);
                                                     console.log(`nextTimer ${nextTimer.selectedTimer}`);
                                                     console.log(`index current timer ${timers.indexOf(timer)}`);
                                                     console.log(`index next timer ${timers.indexOf(timer) + 1}`);
                                                     

                                                     

                                                     currentTimerCheck.current = timers[timers.indexOf(timer) + 1];   
                                                    }
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
                                            timer.isRunning = 'completed';
                                        }
                                        
                                        return nextTotalSecondsCounter;
                                    });
                                    }, 1000);
                                    
                                }
                            }

                            else if (timer.selectedTimer === 'XY') {
                                console.log(`timer.startMinutes ${timer.startMinutes}`)
                                console.log(`timer.startSeconds ${timer.startSeconds}`)
                                
                                // setCounter(CalculateTotalSeconds(timer.startMinutes, timer.startSeconds));
                                // setCounter(() => {
                                //     const newCounter = CalculateTotalSeconds(timer.startMinutes, timer.startSeconds);
                                //     console.log(`first counter ${counter}`);
                                //     return newCounter;
                                // });
                            
                                
                                let nextTotalSecondsCounter = CalculateTotalSeconds(timer.StartMinutes, timer.startSeconds);
                                setCounter(nextTotalSecondsCounter);
                                counterCheck.current = nextTotalSecondsCounter;

                                setCurrentTimerRounds(1);
                                roundsCheck.current = 1;
                                // console.log(`seconds ${seconds}`);

                                if (totalSeconds.current > 0 && timer.rounds > 0){
                                    
                                    // Start timer
                                        secondsCountInterval.current = setInterval(() => {

                                            if (counterCheck.current === 0 && roundsCheck.current === timer.rounds){
                                                clearInterval(secondsCountInterval.current);
                                                            console.log("setting isRunning to completed above");
                                                            timer.isRunning = 'completed';
                                            }
                                            
                                            // let nextTotalSecondsCounter = null;
                                            // let nextTotalSecondsCounter = 0;

                                            // if (nextTotalSecondsCounter === 0 && currentTimerRounds < timer.rounds){
                                            //     // nextTotalSecondsCounter = totalSeconds.current;
                                            //         setCounter(totalSeconds.current);
                                            // }
                                            
                                            // setCounter((prevTotalSecondsCount) => {
                                            setCounter((prevTotalSecondsCount) => {

                                            
                                                if (prevTotalSecondsCount === null){
                                                    prevTotalSecondsCount = 0;
                                                }
                                                if (prevTotalSecondsCount === 0 && roundsCheck.current < timer.rounds){
                                                    // nextTotalSecondsCounter = 0;
                                                    // console.log("nextTotalSecondsCounter is 0");
                                                    counterCheck.current = totalSeconds.current;
                                                    return (totalSeconds.current);
                                                }
                                                // else if (prevTotalSecondsCount === 0 && currentTimerRounds === timer.rounds){
                                                // else if (prevTotalSecondsCount === 0 && roundsCheck.current === timer.rounds){
                                                else if (counterCheck.current === 0 && roundsCheck.current === timer.rounds){
                                                    console.log("returning 0 for counter");
                                                    counterCheck.current = 0;

                                                    // clearInterval(secondsCountInterval.current);
                                                    // timer.isRunning = 'completed';

                                                    return(0);
                                                }   
                                                
                                                
                                                
                                                console.log(`prevTotalSecondsCount ${prevTotalSecondsCount}`);
                                                console.log("setCounter");
                                                // console.log(`prevTotalSecondsCount ${prevTotalSecondsCount}`);
                                                if (prevTotalSecondsCount > 0 ) {
                                                
                                                    console.log("yes");
                                                    nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                                                    counterCheck.current = nextTotalSecondsCounter;
                                                } 
                                                // else {
                                                //     console.log("no");
                                                
                                                //         nextTotalSecondsCounter = 0;
                                                    
                                                // }
                                            
                                    
                                                // if (nextTotalSecondsCounter === 0 ) {
                                                //     clearInterval(secondsCountInterval.current);
                                                // }

                                                counterCheck.current = nextTotalSecondsCounter;
                                                return nextTotalSecondsCounter;
                                            
                                            // This ends setCounter
                                            });
                                            
                                    
                                            // if (counterCheck.current !== 0) {
                                                nextTotalSecondsCounter = counterCheck.current;
                                            // }
                                            console.log(`moving on counterCheck.current ${counterCheck.current} roundsCheck.current ${roundsCheck.current}`);
                                            
                                            

                                            // if (counter === 0 && currentTimerRounds < timer.rounds){
                                            if (counterCheck.current === 0 && roundsCheck.current <= timer.rounds){
                                                console.log(`counter is 0 and currentTimerRounds < timer.rounds`);
                                                // if (nextTotalSecondsCounter === 0 && currentTimerRounds < timer.rounds){
                                                    console.log(`currentTimerRounds ${currentTimerRounds}`);
                                                    console.log(`timer.rounds ${timer.rounds}`);
                                                    setCurrentTimerRounds((prevRound) =>{
            
                                                        console.log("setCurrentTimeRounds");
                                                        console.log(`prevRound ${prevRound}`);
                                                        
                                                        
                                                        const nextRound = prevRound + 1;
                                                        console.log(`nextRound ${nextRound}`);
                                                
                                                        // Stop timer when end time is reached on last round
                                                        if (nextRound > timer.rounds){
                                                            
                                                            // nextTotalSecondsCounter = 0;
                                                            
                                                            clearInterval(secondsCountInterval.current);
                                                            console.log("setting isRunning to c");
                                                            timer.isRunning = 'completed';
                                                            roundsCheck.current = prevRound;
                                                            return prevRound;
                                                        }
                                                        // Otherwise, start next round
                                                        else {
                                                            console.log("Start next round");
                                                            // nextTotalSecondsCounter = totalSeconds.current;
                                                            // nextTotalSecondsCounter = CalculateTotalSeconds(timer.startMinutes, timer.startSeconds);
                                                            console.log(`nextTotalSecondsCounter ${nextTotalSecondsCounter}`);
                                                            // setCounter(() => {
                            
                                                            //     return CalculateTotalSeconds(timer.startMinutes, timer.startSeconds);
                                                            // });

                                                            // setCounter(totalSeconds.current);
                                                            
                                                            // prevTotalSecondsCount = totalSeconds.current;
                                                            console.log(`nextRound ${nextRound}`);
                                                            roundsCheck.current = nextRound;
                                                            return nextRound;
                                                        }
                                                    //The line below ends setCurrentTimerRounds    
                                                    });

                                                    // if (nextTotalSecondsCounter === totalSeconds.current){
                                                    //     setCounter(totalSeconds.current);
                                                    // }
                                                }


                                        
                                        }, 1000);
                                        
                                    }
                                
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
                                isRunning: 'not running',
                              
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