// React dependencies
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/App.scss';

// Components
import WhoMadeThatCoffee from './components/WhoMadeThatCoffee';
import CoffeeGifs from './components/CoffeeGifs';

class App extends Component {
    state = {
        loading: true,
        googlesheets: []
    };

    componentDidMount() {
        fetch('https://spreadsheets.google.com/feeds/cells/1csusGyqdCyoEKRN5IqpnoiGm9ziZW5sg3DaDwEFz_tU/1/public/full?alt=json')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    loading: false,
                    googlesheets: data.feed.entry
                })
            })
            .catch(console.log)
    };

    dataModel = () => {

        const {googlesheets} = this.state;

        const data = googlesheets;

        const arrayWhoMade = [],
            arrayWhoWrote = [],
            arrayWhenMade = [];

        for (let i = 0; i < data.length; i++) {

            const wmtc = data[i].gs$cell,
                person = wmtc.$t,
                word = wmtc.$t,
                date = wmtc.$t,
                col = wmtc.col,
                row = wmtc.row;

            const objsWhoMade = {person, col, row},
                objsWhoWrote = {word, col, row},
                objsWhenMade = {date, col, row};

            arrayWhoMade.push(objsWhoMade);
            arrayWhoWrote.push(objsWhoWrote);
            arrayWhenMade.push(objsWhenMade);
        }

        const obj = {arrayWhoMade, arrayWhoWrote, arrayWhenMade},
            col1 = ["1"],
            col2 = ["2"],
            col4 = ["4"];

        let fCol1 = obj.arrayWhoMade.filter(function (fCol) {
            return col1.indexOf(fCol.col) > -1;
        });

        let fCol2 = obj.arrayWhoWrote.filter(function (fCol) {
            return col2.indexOf(fCol.col) > -1;
        });

        let fCol4 = obj.arrayWhenMade.filter(function (fCol) {
            return col4.indexOf(fCol.col) > -1;
        });

        fCol1 = {fCol1: fCol1};
        fCol2 = {fCol2: fCol2};
        fCol4 = {fCol4: fCol4};

        const persons = fCol4.fCol4,
            dates = fCol1.fCol1,
            words = fCol2.fCol2;

        const WhoMadeWillMade = [];

        persons.forEach((persons, i) => {
            const merge = Object.assign({}, persons, dates[i], words[i])
            WhoMadeWillMade.push(merge);
        });

        return {data: WhoMadeWillMade};
    };

    render() {
        const {loading} = this.state;
        const {data} = this.dataModel();

        if (loading) {
            return (
                <div className="loading"></div>
            );
        }

        return (
            <section id="components">
                <section>
                    <WhoMadeThatCoffee data={data}/>
                </section>
                <section>
                    <CoffeeGifs />
                </section>
            </section>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);