import React from "react";
import { useContext, useRef, useState } from 'react';

import Button from "../components/generic/Button";
import TimerInput from "../components/generic/TimerInput";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

import { TimersContext } from "../utils/TimersProvider";



const Editor = () => {
    const { saveTimer, closeEditor, secondsOptions, minutesOptions } = useContext(TimersContext);
    const [selectedTimer, setSelectedTimer ] = useState(null);
    const [startMinutes, setStartMinutes] = useState(selectedTimer?.startMinutes ?? '');
    const [startSeconds, setStartSeconds] = useState(selectedTimer?.startSeconds ?? '');

    // const selectedTimerMinutes = useRef();
    // const selectedTimerSeconds = useRef();
    const selectedTimerRestMinutes = useRef();
    const selectedTimerRestSeconds = useRef();
    const selectedTimerRounds = useRef();

    
    const handleAddTimerInput = (value) => {
        setSelectedTimer(value);
    };

    const handleSelectedTimerMinutes = (value) => {
        // selectedTimerMinutes.current = value;
        setStartMinutes(value);
    }
    
    const handleSelectedTimerSeconds = (value) => {
        // selectedTimerSeconds.current = value;
        setStartSeconds(value);
    }

    const handleSelectedTimerRestMinutes = (value) => {
        selectedTimerRestMinutes.current = value;
    }

    const handleSelectedTimerRestSeconds = (value) => {
        selectedTimerRestSeconds.current = value;
    }

    const handleSelectedTimerRounds = (value) => {
        selectedTimerRounds.current = value;
    }

    let listOptions = '';
    let options = ['Stopwatch', 'Countdown', 'XY', 'Tabata'];
    if (options){
        listOptions = options.map((option,index) => <option key={index} value={option}>{option}</option>);
    }
    else {
        listOptions=<option>none</option>
    }


    return (
        <div>
            <select onChange={e => handleAddTimerInput(e.target.value)}>
                {listOptions}
            </select>
         
            {selectedTimer === 'Stopwatch' && (<div><TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerMinutes}/> 
                <span>:</span>
                <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerSeconds}/></div>) 
            }

            {selectedTimer === 'Countdown' && (<div><TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerMinutes}/> 
                <span>:</span>
                <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerSeconds}/></div>) 
            }
            <button
                onClick={() => {
                    saveTimer({
                        id: selectedTimer?.id,
                        selectedTimer,
                        startMinutes,
                        startSeconds,
                    });
                }}
            >
                Save
            </button>
            <button 
                onClick={() => {
                    closeEditor();
            }}>
                Cancel
            </button>
        </div>
    );
};


const AddTimersView = () => {
    const { timers, openTimer, selectedTimer, setSelectedTimer, openEditor, deleteTimer, editorOpen } = useContext(TimersContext);
  
	return (

        <span>

            <button onClick={() => openEditor()}>+</button>

            {editorOpen && <Editor />}
        </span>
		);

};

export default AddTimersView;
