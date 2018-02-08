// taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

// taken from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// taken from https://stackoverflow.com/questions/4048688/how-can-i-convert-day-of-year-to-date-in-javascript
// get a date object from a year and a day-in-year
function dateFromDay(year, day){
    var date = new Date(year, 0); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)); // add the number of days
}

// taken from Shian's brain
function dateFromYMD(date) {
    var format = d3.time.format("%Y-%m-%d");
    return format.parse(date);
}
