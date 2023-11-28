import React, { useState } from 'react';
import { makeId } from "../utils/helpers";

export const TimersContext = React.createContext({});

const TimersProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [currentTimer, setCurrentTimer] = useState(null);

    const closeEditor = () => {
        setSelectedTimer(null);
    };

    const secondsOptions = [0, 15, 30, 45];
    const minutesOptions = []
    for (let i=0; i < 60; i++){
        minutesOptions.push(i);
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
                
                // saveTimer: ({ id, minutes, seconds, rounds }) => {
                saveTimer: ({ id, selectedTimer, startMinutes, startSeconds, isRunning }) => {
                    const updatedTimer = {
                        id,
                        selectedTimer,
                        startMinutes,
                        startSeconds, 
                        // rounds,
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