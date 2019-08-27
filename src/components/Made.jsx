import React, { Component } from 'react';
import MadeUI from './MadeUI';

class Made extends Component {

    whoMadeThatCoffee = () => {
    const persons = data;
    console.log(data)


    const daysOfWeek = () => {

        let
            date = new Date(),
            day = new Array(7);

        day[0] = "Sunday";
        day[1] = "Monday";
        day[2] = "Tuesday";
        day[3] = "Wednesday";
        day[4] = "Thursday";
        day[5] = "Friday";
        day[6] = "Saturday";

        let daysOfWeek = day[date.getDay()];

        return [daysOfWeek];
    }

    let todayIs = daysOfWeek();

    function sortDates(a, b) {

        let
            dA = new Date(a.date).getTime(),
            dB = new Date(b.date).getTime();

        return dA - dB;
    }

    let sorted = persons.sort(sortDates);

    let whoMadeThatCoffee = sorted[sorted.length-1];
    }


    render() {
        const { data } = this.whoMadeThatCoffee();

        return (
           <MadeUI whoMadeThatCoffee={data} />
        );
    }

}

export default Made