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
        sheet2: [],
        sheet1: []
    };


    //Google Sheets JSON
    componentDidMount() {
        let fetchData = () => {
            const spreadsheets ='https://spreadsheets.google.com/feeds/cells/1csusGyqdCyoEKRN5IqpnoiGm9ziZW5sg3DaDwEFz_tU';
                Promise.all([
                fetch(spreadsheets + '/1/public/full?alt=json'),
                fetch(spreadsheets + '/2/public/full?alt=json')
            ])
                .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
                .then(([data1, data2]) => this.setState({
                    loading: false,
                    sheet1: data1.feed.entry,
                    sheet2: data2.feed.entry
                }));
        };

        fetchData();

        //this.update = setInterval(fetchData, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.update)
    }


    dataModel = () => {

        /*** who made that coffee - data ***/

        // get google sheets data in react state
        const data1 = this.state.sheet1;

        // construct arrays of objects based gsheets cols and rows
        const whoMade = [], whoWrote = [], whenMade = [];

        // loop to costumize gsheets data
        data1.forEach((data, i) => {
            const
                person = data.gs$cell.$t,
                word = data.gs$cell.$t,
                date = data.gs$cell.$t,
                col = data.gs$cell.col,
                row = data.gs$cell.row;

            whoMade[i] = {person, col, row};
            whoWrote[i] = {word, col, row};
            whenMade[i] = {date, col, row};
        });

        // filters by cols
        let fCol1 = whoMade.filter(fCol => {
            return ["1"].indexOf(fCol.col) > -1;
        });

        let fCol2 = whoWrote.filter(fCol => {
            return ["2"].indexOf(fCol.col) > -1;
        });

        let fCol4 = whenMade.filter(fCol => {
            return ["4"].indexOf(fCol.col) > -1;
        });

        // and... result
        const persons = fCol1, words = fCol2, dates = fCol4;

        persons.splice(0, 1);
        words.splice(0, 1);
        dates.splice(0, 1);


        /*** coffee quality rating - data ***/

        // get google sheets data in react state
        const data2 = this.state.sheet2;

        const arrayQualityRated = data2.map(function (data) {
            const rating = data.gs$cell.$t, col = data.gs$cell.col;
            return {rating, col};
        });

        // assign objects filtered before
        const coffeePersons = [];

        persons.forEach((persons, i) => {
            const person = new Array(persons.person);
            const ratingFilters = person.map(person => {
                const col = arrayQualityRated.find(e => e.rating === person);
                return arrayQualityRated.filter(e => e.col === col.col);
            });
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const rating = ratingFilters.reduce(reducer);

            const merge = Object.assign({}, persons, dates[i], words[i], {rating});

            coffeePersons.push(merge);
        });

        // and... only necessary data
        return {data: coffeePersons};
    };


    render() {
        const {loading} = this.state;
        const {data} = this.dataModel();

        if (loading) {
            return (
                <div className="loading"/>
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
    <App />,
    document.getElementById('app')
);
