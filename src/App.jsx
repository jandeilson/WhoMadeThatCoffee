// React dependencies
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/App.scss';

// Components
import Made from './components/Made';
import WillMade from './components/WillMade';
import Tip from './components/Tip';

class App extends Component {
    state = {
        googlesheets: []
    }

    componentDidMount() {
        fetch('https://spreadsheets.google.com/feeds/cells/1csusGyqdCyoEKRN5IqpnoiGm9ziZW5sg3DaDwEFz_tU/1/public/full?alt=json')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    googlesheets: data.feed.entry
                })
            })
            .catch(console.log)
    }

    dataModel = () => {

        const {googlesheets} = this.state;

        let data = googlesheets;

        let
            arrayWhoMade = [],
            arrayWhoWrote = [],
            arrayWhenMade = [];

        for (let i = 0; i < data.length; i++) {

            let
                wmtc = data[i].gs$cell,
                person = wmtc.$t,
                word = wmtc.$t,
                date = wmtc.$t,
                col = wmtc.col,
                row = wmtc.row;

            let
                objsWhoMade = {person, col, row},
                objsWhoWrote = {word, col, row},
                objsWhenMade = {date, col, row};

            arrayWhoMade.push(objsWhoMade)
            arrayWhoWrote.push(objsWhoWrote)
            arrayWhenMade.push(objsWhenMade)
        }

        let
            obj = {arrayWhoMade, arrayWhoWrote, arrayWhenMade},
            col1 = ["1"],
            col2 = ["2"],
            col4 = ["4"];

        let fCol1 = obj.arrayWhoMade.filter(function (fcol) {
            return col1.indexOf(fcol.col) > -1;
        });

        let fCol2 = obj.arrayWhoWrote.filter(function (fcol) {
            return col2.indexOf(fcol.col) > -1;
        });

        let fCol4 = obj.arrayWhenMade.filter(function (fcol) {
            return col4.indexOf(fcol.col) > -1;
        });

        fCol1 = {fCol1: fCol1};
        fCol2 = {fCol2: fCol2};
        fCol4 = {fCol4: fCol4};

        let
            dates = fCol1.fCol1,
            persons = fCol4.fCol4;

        persons.forEach(function (person) {
            let result = dates.filter(function (date) {
                let objs = date.row === person.row;
                delete date.col;
                return objs;
            });

            person.person = (result[0] !== undefined) ? result[0].person : null;
        });

        return {data: persons};
    }

    render() {
        const {data} = this.dataModel();

        return (
            <section id="components">
                <section>
                    <Made
                        data={data}
                    />
                </section>
                <section>
                    <WillMade
                        data={data}
                    />
                </section>
                <section>
                    <Tip />
                </section>
            </section>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);