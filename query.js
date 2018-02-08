function query_sensor(data, sensor) {
    return _.filter(data, d => { return d.Sensor == sensor })
}

function query_year(data, year) {
    return _.filter(data, d => { return d.Year == year })
}

function query_month(data, month) {
    return _.filter(data, d => { return d.Month == month })
}

function query_day(data, day) {
    return _.filter(data, d => { return d.Day == day })
}

function query_time(data, time) {
    return _.filter(data, d => { return d.Time == time })
}

function query_date(data, date) {
    return _.filter(data, d => { return d.Date == date })
}
