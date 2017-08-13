export function between(date1, date2) {
    var diff = date2 - date1;
    if(diff < 0) {
        return {isValid: false};
    }
    return {
        isValid: true,
        milliseconds: diff,
        seconds: Math.floor(diff/1000),
        minutes: Math.floor(diff/1000/60),
        hours: Math.floor(diff/1000/60/60),
        days: Math.floor(diff/1000/60/60/24)
    }
}