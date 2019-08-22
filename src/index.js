import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Made from './components/Made'; 
import WillMade from './components/WillMade'; 
import Tip from './components/Tip'; 

class App extends React.Component {
    render() {
      return (
              
        <div>
         <Made />
         <WillMade />
         <Tip />
        </div>
        
      );
    }
}


ReactDOM.render(

    <App />,
    document.getElementById('root')
)