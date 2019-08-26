import React from 'react';


const WillMade = ({ data }) => {
  
  const persons = data;

  function sortDates(a, b) {
    
    let 
    dA = new Date(a.date).getTime(),
    dB = new Date(b.date).getTime();
    
    return dA - dB;
  }

  let sorted = persons.sort(sortDates);

  let willMadeNextCoffee = sorted[1];

  return (

    <div>
    {data.map((whoMade, index) => {
      if (whoMade === willMadeNextCoffee) {
        return (
        <div key={index} className="whomade">
          <h3>Who <strong>Will Made</strong>?</h3>
          <h2>{whoMade.person}</h2>
        </div>
        )
      }
    
    })}
  </div>

  );

}

export default WillMade