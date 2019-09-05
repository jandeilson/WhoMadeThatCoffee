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

        /*** who made that coffee - data ***/

        // get google sheets data in react state
        const data1 = this.state.sheet1;

        // construct arrays of objects based gsheets cols and rows
        const arrayWhoMade = [], arrayWhoWrote = [], arrayWhenMade = [];

        // loop to costumize gsheets data
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

        // filters
        const objsSheet1 = {arrayWhoMade, arrayWhoWrote, arrayWhenMade};

        let fCol1 = objsSheet1.arrayWhoMade.filter(fCol => {
            return ["1"].indexOf(fCol.col) > -1;
        });

        let fCol2 = objsSheet1.arrayWhoWrote.filter(fCol => {
            return ["2"].indexOf(fCol.col) > -1;
        });

        let fCol4 = objsSheet1.arrayWhenMade.filter(fCol => {
            return ["4"].indexOf(fCol.col) > -1;
        });

        const persons = fCol1, dates = fCol2, words = fCol4;

        // assign objects by cols filtered before
        const WhoMadeWillMade = [];

        persons.forEach((persons, i) => {
            const merge = Object.assign({}, persons, dates[i], words[i])
            WhoMadeWillMade.push(merge);
        });


        /*** coffee quality rating - data ***/

        // get google sheets data in react state
        const data2 = this.state.sheet2;

        const arrayQualityRated = data2.map(function (data) {
            const name = data.gs$cell.$t,
                col = parseInt(data.gs$cell.col),
                row = data.gs$cell.row,
                objs = {name, col, row};
            return objs;
        });

        // rating filter by persons
        const arrayPersonsName = persons.map(function (name) {
            return name.person;
        });

        arrayPersonsName.shift();

        const classifyArrayItems = (arrayPersonsName, arrayQualityRated) => {
            // mapping the array, so it has all the persons
            return arrayPersonsName.map(person => {
                // first find the col number corresponding to the
                // person in the array
                const col = arrayQualityRated.find(e => e.name === person);

                // return all the objects that have the same
                // col value
                return arrayQualityRated.filter(e => e.col === col.col)

            })

        };

        console.log(classifyArrayItems(arrayPersonsName, arrayQualityRated));


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