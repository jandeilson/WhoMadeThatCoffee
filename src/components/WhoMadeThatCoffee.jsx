import React, {Component} from 'react';
import MadeUI from "./MadeUI";
import WillMadeUI from "./WillMadeUI";

class WhoMadeThatCoffee extends Component {

    dataMade = () => {
        const persons = this.props.data;

        const daysOfWeek = () => {
            let date = new Date(),
                day = new Array(7);

            day[0] = "Sunday";
            day[1] = "Monday";
            day[2] = "Tuesday";
            day[3] = "Wednesday";
            day[4] = "Thursday";
            day[5] = "Friday";
            day[6] = "Saturday";

            return day[date.getDay()];
        };

        let todayIs = daysOfWeek();

        function sortDates(a, b) {

            let dA = new Date(a.date).getTime(),
                dB = new Date(b.date).getTime();

            return dA - dB;
        }

        let sorted = persons.sort(sortDates);

        let whoMade = new Array(sorted[sorted.length - 1]);
        let willMade = new Array(sorted[1]);

        let data = {todayIs, whoMade, willMade};

        return {data}
    };

    render() {
        const {data} = this.dataMade();

        return (
            <div className="whomadethatcoffee">
                <MadeUI  data = {data} />
                <WillMadeUI  data = {data} />
            </div>
        );

    }

}

export default WhoMadeThatCoffee