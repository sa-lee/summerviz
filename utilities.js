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

function dateToYMD(date) {
    var format = d3.time.format("%Y-%m-%d");
    return format(date);
}

// taken from https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function get_month(date) {
    return dateFromYMD(date).getMonth() + 1;
}

function get_year(date) {
    return dateFromYMD(date).getYear() + 1900;
}

function groupBySum(data, key) {
    var grouped = _.groupBy(data, d => d[key])
    var keys = Object.keys(grouped)

    
    var output = keys.map(k => {
        var obj = new Object;
        obj[key] = k;
        obj["Count"] = Math.round(d3.sum(grouped[k].map(d => d.Count)))
        if (key == "Day") {
            var DayOfWeek = grouped[k][0].DayOfWeek
            obj.DayOfWeek = DayOfWeek
        }
        return obj;
    })
    return output;
}
