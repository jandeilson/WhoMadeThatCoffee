import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Made from './components/Made'; 
import WillMade from './components/WillMade'; 
import Tip from './components/Tip'; 


ReactDOM.render( <Made />, document.getElementById('made'))
ReactDOM.render( <WillMade />, document.getElementById('willmade'))
ReactDOM.render( <Tip />, document.getElementById('tip'))