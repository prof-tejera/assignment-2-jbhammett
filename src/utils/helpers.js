// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.


// Convert minutes and seconds to seconds
export const CalculateTotalSeconds = (minutes, seconds) => {
    if (!minutes){
        minutes = 0;
    }
    if (!seconds){
        seconds = 0;
    }
    const total = (parseInt(minutes * 60)) + parseInt(seconds);
    return total;
};


// Convert seconds to minutes and seconds
export const CalculateMinutesSeconds = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return [minutes, seconds];
};



export const HandleStopButton = ((interval, start) => {
    if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
    }
    else {
        start();
    }

});


export const setTimes = (value, setStartMinutes, setStartSeconds) => {
        // setDisplayMinutesCount(value);
        // setDisplaySecondsCount(value);
        setStartMinutes(value);
        setStartSeconds(value);
};    

//From blog lecture example
export const makeId = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

export const ResetTimer = ((prop, interval, setCounter, value) => {
    if (prop === 'not running'){
        clearInterval(interval.current);
        setCounter(value);
      
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }
});

