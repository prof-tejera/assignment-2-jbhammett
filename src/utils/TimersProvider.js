import React, { useState, useRef } from 'react';
import { makeId, CalculateTotalSeconds } from "../utils/helpers";

export const TimersContext = React.createContext({});

const TimersProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [currentTimer, setCurrentTimer] = useState(timers[0]);
    const [currentIndex, setCurrentIndex] = useState(null);
    
    // const [counter, setCounter] = useState(0);
    // const [restCounter, setRestCounter] = useState(0);
    const [currentTimerRounds, setCurrentTimerRounds] = useState(1);
    // const [start, setStart] = useState(false);
  
    const totalSeconds = useRef(0);
    // const totalRestSeconds = useRef(0);
    // const secondsCountInterval = useRef(0);
    // const counterCheck = useRef(null);
    // const roundsCheck = useRef(1);
    const currentTimerCheck = useRef(timers[0]);
    
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
                currentTimerCheck,
                currentTimer,
                setCurrentTimer,
                currentIndex,
                setCurrentIndex,
                selectedTimer,
                secondsOptions,
                minutesOptions,
                roundsOptions,
                totalSeconds,
                // counter,
                // restCounter,
                currentTimerRounds,
                
                // start,
             
                closeEditor,
                deleteTimer: ({ id }) => setTimers(timers.filter(x => x.id !== id)),
                openEditor: () => setSelectedTimer({}),


                openTimer: ({ id }) => {
                    const t = timers.find(t => t.id === id);
                    setSelectedTimer(t);
                  },

                handleWorkoutReset: () =>{

                    // timers[currentIndex].isRunning = 'not running';
                    timers[currentIndex].isRunning = 'not running';
                    console.log(`timers[currentIndex].isRunning ${timers[currentIndex].isRunning}`);
                    console.log(`timers[curentIndex] ${timers[currentIndex]}`);
                    // setCurrentTimer(timers[0]);
                    setCurrentIndex(null);
                    // for (let i=0; i<timers.length; i++){
                    //     timers[i].isRunning = 'not running';
                    // }
                    
                },    


                handleTimerStart: (timerIndex) => {
                    setCurrentIndex(timerIndex);       
                },

                // saveTimer: ({ id, index, selectedTimer, startMinutes, startSeconds, rounds, startRestMinutes, startRestSeconds, isRunning }) => {
                saveTimer: ({ id, index, selectedTimer, startMinutes, startSeconds, rounds, startRestMinutes, startRestSeconds, isRunning, reset }) => {
                    const updatedTimer = {
                        id,
                        index,
                        selectedTimer,
                        startMinutes,
                        startSeconds, 
                        rounds,
                        startRestMinutes,
                        startRestSeconds,
                        isRunning,
                        reset,
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
                                index: (timers.length === 0) ? 0 : timers.length,
                                isRunning: 'not running',
                                
                              
                            },
                        ])
                        
                    }
                    console.log(`save index ${index}`);
                    closeEditor();
            
                },
 
            }}
        >
            {children}
        </TimersContext.Provider>


    );
};

export default TimersProvider;