import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Components
import Made from './components/Made'; 
import WillMade from './components/WillMade'; 
import Tip from './components/Tip'; 

class App extends Component {
    state = {
        whomadethatcoffee: []
    }

    componentDidMount() {
        fetch('https://spreadsheets.google.com/feeds/cells/1csusGyqdCyoEKRN5IqpnoiGm9ziZW5sg3DaDwEFz_tU/1/public/full?alt=json')
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
              whomadethatcoffee: data.feed.entry
          })
        })
        .catch(console.log)
    }
      
    render() {
      const {whomadethatcoffee} = this.state
      //console.log(this.state)

      return (
        <section id="components">
            <section id="made"><Made whomade={whomadethatcoffee} /></section>
            <section id="willmade"><WillMade /></section>
            <section id="tip"><Tip /></section>
        </section>
      );
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('app')
);