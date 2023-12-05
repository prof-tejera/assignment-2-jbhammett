import React from "react";
import { useContext, useState } from 'react';

import Button from "../components/generic/Button";
import TimerInput from "../components/generic/TimerInput";



import { TimersContext } from "../utils/TimersProvider";

// import { CalculateTotalSeconds, setTimerCounterStart } from "../utils/helpers";



const Editor = () => {
    const { timers, saveTimer, closeEditor, deleteTimer, secondsOptions, minutesOptions, roundsOptions } = useContext(TimersContext);
    const [selectedTimer, setSelectedTimer ] = useState(null);
    const [startMinutes, setStartMinutes] = useState(selectedTimer?.startMinutes ?? '');
    const [startSeconds, setStartSeconds] = useState(selectedTimer?.startSeconds ?? '');
    const [rounds, setRounds] = useState(selectedTimer?.rounds ?? '');
    const [startRestMinutes, setStartRestMinutes] = useState(selectedTimer?.restMinutes ?? '');
    const [startRestSeconds, setStartRestSeconds] = useState(selectedTimer?.restSeconds ?? '');

    // const selectedTimerMinutes = useRef();
    // const selectedTimerSeconds = useRef();
    // const selectedTimerRestMinutes = useRef();
    // const selectedTimerRestSeconds = useRef();
    // const selectedTimerRounds = useRef();

    
    const handleAddTimerInput = (value) => {
        setSelectedTimer(value);
    };

    const handleSelectedTimerMinutes = (value) => {
        // selectedTimerMinutes.current = value;
        // console.log('test)');
        // console.log(`value ${value}`);
        // if (value){
            setStartMinutes(value);
        // }
        // else {
        //     setStartMinutes(0);
        // }
    }
    
    const handleSelectedTimerSeconds = (value) => {
        // selectedTimerSeconds.current = value;
        setStartSeconds(value);
    }

    const handleSelectedTimerRestMinutes = (value) => {
        // selectedTimerRestMinutes.current = value;
        setStartRestMinutes(value);
    }

    const handleSelectedTimerRestSeconds = (value) => {
        // selectedTimerRestSeconds.current = value;
        setStartRestSeconds(value);
    }

    const handleSelectedTimerRounds = (value) => {
        // selectedTimerRounds.current = value;
        setRounds(value);
    }

    let listOptions = '';
    let options = ['Choose One', 'Stopwatch', 'Countdown', 'XY', 'Tabata'];
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
         
            {selectedTimer === 'Stopwatch' && 
                (<div>
                    <h6 style={{
                        marginBottom:0,
                        }}>Minutes : Seconds
                    </h6>
                    <TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerMinutes}/> 
                    <span>:</span>
                    <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerSeconds}/>
                </div>) 
            }

            {selectedTimer === 'Countdown' && 
                (<div>
                    <h6 style={{
                        marginBottom:0,
                        }}>Minutes : Seconds
                    </h6>
                    <TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerMinutes}/> 
                    <span>:</span>
                    <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerSeconds}/>
                </div>) 
            }

            {selectedTimer === 'XY' && 
                (<div>
                    <h6 style={{
                        marginBottom:0,
                        }}>Minutes : Seconds
                    </h6>
                    <TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerMinutes}/> 
                    <span>:</span>
                    <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerSeconds}/>
                    <h6 style={{
                        marginBottom:0,
                        }}>Rounds
                    </h6>
                    <TimerInput options={roundsOptions} timeType="Rounds" onChange={handleSelectedTimerRounds}/>
                </div>) 
            }

            {selectedTimer === 'Tabata' && 
                (<div>
                    <h5 style={{
                        marginBottom: 2,
                    }}>
                        Work
                        </h5>
                    <h6 style={{
                        marginTop: 0,
                        marginBottom:2,
                        }}>Minutes : Seconds
                    </h6>
                    <TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerMinutes}/> 
                    <span>:</span>
                    <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerSeconds}/>
                    <div>
                    <h5 style={{
                        marginBottom:2,
                        }}>
                        Rest
                    </h5>
                        <h6 style={{
                            marginTop:0,
                            marginBottom:0,
                            }}>Minutes : Seconds
                        </h6>
                        <TimerInput options={minutesOptions} timeType="Minutes" onChange={handleSelectedTimerRestMinutes}/> 
                        <span>:</span>
                        <TimerInput options={secondsOptions} timeType="Seconds" onChange={handleSelectedTimerRestSeconds}/>
                    </div>

                    <h5 style={{
                        marginBottom:2,
                        }}>
                        Rounds
                    </h5>
                    <TimerInput options={roundsOptions} timeType="Rounds" onChange={handleSelectedTimerRounds}/>
                </div>) 
            }

            {selectedTimer && 
                <div>
                    <Button value="Save"
                        color="#aaa0ff"
                        onClick={() => {
                            saveTimer({
                                id: selectedTimer?.id,
                                index: (timers.length === 0) ? 0 : timers.length,
                                selectedTimer,
                                startMinutes,
                                startSeconds,
                                isRunning: 'not running',
                                rounds,
                                startRestMinutes,
                                startRestSeconds,
                                
                            });
                        }}
                    />
                    
                    <Button value="Cancel"
                        color="#aaa0ff" 
                        onClick={() => {
                            closeEditor();
                    }} />
            </div>}



        </div>



    );
};


const AddTimersView = () => {
    const { timers, openTimer, selectedTimer, setSelectedTimer, openEditor, deleteTimer, editorOpen } = useContext(TimersContext);
  
	return (

        <span>

            {/* <button onClick={() => openEditor()}>+</button> */}
            <Button value="Add New Timer" color="#aaa0ff" onClick={() => openEditor()} />

            {editorOpen && <Editor />}
        </span>
		);

};

export default AddTimersView;
