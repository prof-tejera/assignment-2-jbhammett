import React, { useState, useRef } from 'react';
import { makeId } from "../utils/helpers";

export const TimersContext = React.createContext({});

const TimersProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [currentTimer, setCurrentTimer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
  
    const totalSeconds = useRef(0);


    const closeEditor = () => {
        setSelectedTimer(null);
    };

    const secondsOptions = [0, 5, 15, 30, 45];
    
    const minutesOptions = []
    for (let i=0; i < 60; i++){
        minutesOptions.push(i);
    }

    const roundsOptions = []
    for (let j=1; j < 20; j++){
        roundsOptions.push(j);
    }

    return (
        <TimersContext.Provider
            value={{
                timers,
                editorOpen: !!selectedTimer,
                currentTimer,
                setCurrentTimer,
                currentIndex,
                setCurrentIndex,
                selectedTimer,
                secondsOptions,
                minutesOptions,
                roundsOptions,
                totalSeconds,
                
                closeEditor,
                deleteTimer: ({ id }) => setTimers(timers.filter(x => x.id !== id)),
                openEditor: () => setSelectedTimer({}),


                openTimer: ({ id }) => {
                    const t = timers.find(t => t.id === id);
                    setSelectedTimer(t);
                  },

                handleWorkoutReset: () =>{
                    timers[currentIndex].isRunning = 'not running';
                    setCurrentIndex(null);
                },
                
                handlePauseResume: () => {
                    timers[currentIndex].isRunning = 'paused';
                },

                handleFastForward: () => {
                    setCurrentIndex(prev => {
                        return prev + 1;
                    });
                },


                handleTimerStart: () => {
                    if (currentIndex) {
                        setCurrentIndex(currentIndex);
                    }
                    else {
                        setCurrentIndex(0);
                    }       
                },

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
                    closeEditor();
            
                },
 
            }}
        >
            {children}
        </TimersContext.Provider>


    );
};

export default TimersProvider;