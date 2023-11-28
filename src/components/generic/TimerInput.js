import React from "react";

    
const TimerInput = ({options, value, timeType, onChange}) => {
    let listOptions = ''
    if (options){
        listOptions = options.map((option,index) => <option key={index} value={option}>{option}</option>);
    }
    else {
        listOptions=<option>none</option>
    }
  
	return (

        
        <span>
            <select value={value} onChange={e => onChange(e.target.value)} >
                {listOptions}
            </select>
        </span>
		);
    
};

export default TimerInput;