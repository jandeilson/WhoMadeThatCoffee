import React, {Component} from 'react';
import WillMadeUI from "./WillMadeUI";

class WillMade extends Component {

    dataWillMade = () => {
        const persons = this.props.data;

        function sortDates(a, b) {

            let
                dA = new Date(a.date).getTime(),
                dB = new Date(b.date).getTime();

            return dA - dB;
        }

        let sorted = persons.sort(sortDates);

        let willMade = new Array(sorted[1]);

        return {data: willMade}
    };

    render() {
        const {data} = this.dataWillMade();

        return <WillMadeUI data = {data} />
    }


}

export default WillMade