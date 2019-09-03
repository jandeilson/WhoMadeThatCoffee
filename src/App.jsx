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
        sheet1: [],
        sheet2: []
    };

    //Google Sheets JSON
    componentDidMount() {
        Promise.all([
            fetch('https://spreadsheets.google.com/feeds/cells/1csusGyqdCyoEKRN5IqpnoiGm9ziZW5sg3DaDwEFz_tU/1/public/full?alt=json'),
            fetch('https://spreadsheets.google.com/feeds/cells/1csusGyqdCyoEKRN5IqpnoiGm9ziZW5sg3DaDwEFz_tU/2/public/full?alt=json')
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => this.setState({
                loading: false,
                sheet1: data1.feed.entry,
                sheet2: data2.feed.entry
            }));
    };

    dataModel = () => {

        // get google sheets data in react state
        const {sheet1} = this.state, {sheet2} = this.state;
        const data1 = sheet1, data2 = sheet2;

        // construct arrays of objects based gsheets col and row
        const arrayWhoMade = [],
            arrayWhoWrote = [],
            arrayWhenMade = [],
            arrayRatedPersons = [];

        // loops to costumize gsheets data
        for (let i = 0; i < data1.length; i++) {

            const wmtc = data1[i].gs$cell,
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

        for (let i = 0; i < data2.length; i++) {

            const rating = data2[i].gs$cell,
                person = rating.$t,
                col = rating.col,
                row = rating.row;

            const objsRatedName = {person, col, row};

            arrayRatedPersons.push(objsRatedName);

        }

        // just for organize data by rows
        const objsSheet1 = {arrayWhoMade, arrayWhoWrote, arrayWhenMade},
            col1 = ["1"],
            col2 = ["2"],
            col4 = ["4"];

        let sheet1_fCol1 = objsSheet1.arrayWhoMade.filter(function (fCol) {
            return col1.indexOf(fCol.col) > -1;
        });

        let sheet1_fCol2 = objsSheet1.arrayWhoWrote.filter(function (fCol) {
            return col2.indexOf(fCol.col) > -1;
        });

        let sheet1_fCol4 = objsSheet1.arrayWhenMade.filter(function (fCol) {
            return col4.indexOf(fCol.col) > -1;
        });

        sheet1_fCol1 = {sheet1_fCol1: sheet1_fCol1};
        sheet1_fCol2 = {sheet1_fCol2: sheet1_fCol2};
        sheet1_fCol4 = {sheet1_fCol4: sheet1_fCol4};

        // gsheets cols filtered
        const persons = sheet1_fCol1.sheet1_fCol1,
            dates = sheet1_fCol2.sheet1_fCol2,
            words = sheet1_fCol4.sheet1_fCol4;

        // persons filter to rating
        const arrayPersons = [];

        for (let i = 0; i < persons.length; i++) {
            const person = persons[i];

            delete person.col;
            delete person.row;

            arrayPersons.push(person.person);
        }

        let ratedPersonsByName = arrayRatedPersons.filter(name => arrayPersons.includes(name.person));


        console.log(ratedPersonsByName);

        // assign objects by cols filtered before
        const WhoMadeWillMade = [];

        persons.forEach((persons, i) => {
            const merge = Object.assign({}, persons, dates[i], words[i])
            WhoMadeWillMade.push(merge);
        });

        // and... only necessary data
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
                    <CoffeeGifs/>
                </section>
            </section>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);