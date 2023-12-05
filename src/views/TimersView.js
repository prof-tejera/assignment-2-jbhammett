import React from "react";
import { useContext } from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

import Button from "../components/generic/Button";
import DisplayTime from "../components/generic/DisplayTime";

import { TimersContext } from "../utils/TimersProvider";
import { CalculateTotalSeconds, CalculateMinutesSeconds } from "../utils/helpers";


const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const TimersView = () => {
  const { timers, deleteTimer, handleTimerStart, counter, setCounter, currentTimer, setCurrentTimer, currentTimerCheck } = useContext(TimersContext);
  let totalTime = 0;
  const timersDisplay = []
  for (let i=0; i<timers.length; i++){
    console.log(`i ${i}`);
    if (timers[i].selectedTimer === 'Stopwatch'){
      console.log(timers[i].startMinutes);
      timersDisplay.push({title: "Stopwatch", id: timers[i].id, C: <Stopwatch id={timers[i].id} index={i} startMinutes={timers[i].startMinutes} startSeconds={timers[i].startSeconds} isRunning={timers[i].isRunning} />})
    }
    else if (timers[i].selectedTimer === 'Countdown'){
      timersDisplay.push({title: "Countdown", id: timers[i].id, index: i, C: <Countdown id={timers[i].id} index={i} startMinutes={timers[i].startMinutes} startSeconds={timers[i].startSeconds} isRunning={timers[i].isRunning} />})
    }
    else if (timers[i].selectedTimer === 'XY'){
      timersDisplay.push({title: "XY", id: timers[i].id, index: i,  C: <XY id={timers[i].id} index={i} startMinutes={timers[i].startMinutes} startSeconds={timers[i].startSeconds} rounds={timers[i].rounds} isRunning={timers[i].isRunning} />})
    }
    else if (timers[i].selectedTimer === 'Tabata'){
      timersDisplay.push({title: "Tabata", id: timers[i].id, index: i, C: <Tabata id={timers[i].id} index={i} startMinutes={timers[i].startMinutes} startSeconds={timers[i].startSeconds} rounds={timers[i].rounds} startRestMinutes={timers[i].startRestMinutes} startRestSeconds={timers[i].startRestSeconds} isRunning={timers[i].isRunning} />})
    }

    const currentTimerTime = CalculateTotalSeconds(timers[i].startMinutes, timers[i].startSeconds);
    totalTime = totalTime + currentTimerTime;

  }

 

  const handleStartWorkoutButton = (value) => {
    
    // for (let i=0; i<timers.length; i++) {
      // timers[i].isRunning = true;
      // setCurrentTimer(timers[i]);
      // if (timers[i].isRunning === 'completed'){
        
      
      // handleTimerStart(timers[0]); //This is what i usually use.
        handleTimerStart(0);
      // if (!value){
      //   setCurrentTimer(timers[0]);
      // }
      // else {
      //   setCurrentTimer(value);
      // }
      // if (currentTimerCheck.current.isRunning === 'completed')
      // }  
      
      
     

    // }

    // let seconds = CalculateTotalSeconds(startMinutes, startSeconds);

    // totalSeconds.current = seconds;
    
    // if (totalSeconds.current > 0){
    // // Start timer
    //     secondsCountInterval.current = setInterval(() => {
    //             setCounter((prevTotalSecondsCount) => {
    //             const nextTotalSecondsCounter = prevTotalSecondsCount + 1;
            
    //             // Stop timer when end time is reached
    //             if (nextTotalSecondsCounter === totalSeconds.current) {
    //                 clearInterval(secondsCountInterval.current);
           
    //                 isRunning.current = false;
    //             }                   
    //             return nextTotalSecondsCounter;
    //         });
            
    //     }, 1000);
        
  //   }
  };


  return (

    <div>
      <Button value="Start Workout" color='#aaa0ff' onClick={handleStartWorkoutButton} />
      <h2>Total Workout Time </h2>
      <DisplayTime minutes={CalculateMinutesSeconds(totalTime)[0]} seconds={CalculateMinutesSeconds(totalTime)[1]} />
      {/* <DisplayTime minutes={CalculateMinutesSeconds(counter)[0]} seconds={CalculateMinutesSeconds(counter)[1]}/> */}

      <Timers>
        {timersDisplay.map((timer) => (
          // <div key={timer.id}>
          <div key={timer.index}>
            <Timer >
              <TimerTitle>{timer.title}</TimerTitle>
              {timer.C}
            </Timer>
            <Button value="Delete Timer" onClick={() => {
                    deleteTimer({ id: timer.id });
                  }} />
                  {timers.id}
                  {/* <button
                  onClick={() => {
                    deleteTimer({ id: timer.id });
                  }}
                  // className="danger"
                >
                  Delete
                </button> */}
          </div>
        ))}
      </Timers>
    </div>
  );
};

export default TimersView;
