$(document).ready(function(){
    let d = new Date();
    let day = d.getDay();
    let month = d.getMonth();
    let year = d.getFullYear();

    $('#controls .back').on('click', function(){
        if(month == 0 ){
            year--;
            month = 11;
        }else {
            month = month-1;
        }
        fillCalendar(month, year);
    });

    $('#controls .next').on('click', function(){
        if(month == 11 ){
            year++;
            month = 0;
        }else {
            month = month+1;
        }
        fillCalendar(month, year);
    });

    fillCalendar(month, year);
});
function fillCalendar(month, year){
    // weeks = $('#calendar_days ul');
    days = $('#calendar_days li');
    firsDayOfMonth = getFirstDayOfMonth(month, year);
    daysOfMonth = getDaysOfMonth(month, year);
    daysOfMonthPreviousMonth = (month == 0) ? getDaysOfMonth( 11, year ) : getDaysOfMonth( month-1, year );
    let d = new Date();
    let currentDay = d.getDate();
    let currentMonth = d.getMonth();
    let currenYear = d.getFullYear();

    $('#controls .month-year .month').html(getMonthName(month));
    $('#controls .month-year .year').html(year);

    for (var i = 0; i < days.length; i++) {
        if( i < firsDayOfMonth ){
            days[i].innerHTML = daysOfMonthPreviousMonth - firsDayOfMonth + 1 + i;
            $(days[i]).addClass('other');
        }
        else if( i - firsDayOfMonth + 1 <= daysOfMonth ){
            days[i].innerHTML = i - firsDayOfMonth + 1;
            $(days[i]).removeClass('other');
        }
        else{
            days[i].innerHTML = i - daysOfMonth - firsDayOfMonth + 1;
            $(days[i]).addClass('other');
        }

        $(days[i]).removeClass('today');
        $(days[i]).removeClass('holiday');


        if( year == currenYear && (month == currentMonth)
            && days[i].innerHTML == currentDay && !$(days[i]).hasClass('other') ){
            $(days[i]).addClass('today');
        }
    }
    fillHolidayDays(month, year);
}

function fillHolidayDays(month, year){
    let ajax = $.ajax({
        type: 'GET',
        url: 'http://nolaborables.com.ar/api/v2/feriados/' + year
    });

    var callbackSucces = function(data){
        let holidays = getHolidaysOfMonth(month, data);

        days = $('#calendar_days li');

        $(days).each( function(i, item){
            if( !$(item).hasClass('other') ){
                for (var i = 0; i < holidays.length; i++) {

                    if( $(item).html() == holidays[i].dia ){
                        // console.log(item);
                        $(item).addClass('holiday');
                        $(item).attr( "title", holidays[i].motivo )
                    }
                }
            }
        });

    };

    function callbackError(error){
        console.log("ajax: " + error);
    }

    ajax.then(callbackSucces, callbackError);
}


function getHolidaysOfMonth(month, holidaysOfYear){
    let holidays = [];
    for (var i = 0; i < holidaysOfYear.length; i++) {
        if( holidaysOfYear[i].mes > month +1 ){
            break;
        }

        if( holidaysOfYear[i].mes == month +1 ){
            json = {
                "dia" : holidaysOfYear[i].dia,
                "motivo" : holidaysOfYear[i].motivo
                }
            holidays.push( json );
        }
    }
    return holidays;
};



// console.log(getFirstDayOfMonth(11, 2016));
function getFirstDayOfMonth(month, year){
    let result = null;
    if( month >= 0 && month <= 11 && year > 0)
    {
        let d = new Date(year, month, 1);
        result = d.getDay();
    }
    return result;
}

// console.log(getDaysOfMonth(0,2024));
function getDaysOfMonth(month, year){
    let days;

    if(month < 0 || month > 11 || year < 0)
        return null;

    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            days = 31;
            break;
        case 1:
            if( (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 )
                days = 29;
            else
                days = 28;
            break;
        default:
            days = 30;
    }
    return days;
}

function getMonthName(monthNumber){
    let result = null;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(monthNumber >= 0 && monthNumber <= 11)
        result = months[monthNumber];
    return result;
}
