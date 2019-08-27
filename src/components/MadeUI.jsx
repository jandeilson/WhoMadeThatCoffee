import React from 'react';

const MadeUI = ({ whoMadeThatCoffee }) => {
  return (
    <div className="made">
      <h5>{todayIs[0]}</h5>
      {whoMadeThatCoffe.map((whoMade, index) => {
        if (whoMade === whoMadeThatCoffee) {
          return (
            <h2 key={index}>{whoMade.person} <br></br>Made That Coffee</h2>
          )
        }
      
      })}
    </div>
  
  );
}


export default MadeUI