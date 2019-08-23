import React from 'react';

const Made = ({ whomade }) => {

  let 
     arrayWhoMade = [],
     arrayWhenMade = [];

  for (let i = 0; i < whomade.length; i++) {

    let 
       whomadethatcoffee = whomade[i].gs$cell,
       person = whomadethatcoffee.$t,
       date = whomadethatcoffee.$t,
       col = whomadethatcoffee.col,
       row = whomadethatcoffee.row;

    let 
       objsWhoMade = {person, col, row},
       objsWhenMade = {date, col, row};

    arrayWhoMade.push(objsWhoMade)
    arrayWhenMade.push(objsWhenMade)

  }
  
  let 
     obj = {arrayWhoMade, arrayWhenMade},
     col1 = ["1"],
     col4 = ["4"];

  let fCol1 = obj.arrayWhoMade.filter(function(fcol){
    return col1.indexOf(fcol.col) > -1;
  });

  let fCol4 = obj.arrayWhenMade.filter(function(fcol){
    return col4.indexOf(fcol.col) > -1;
  });
  
  fCol1 = { fCol1 : fCol1 }, fCol4 = { fCol4 : fCol4 };

  let 
     dates = fCol1.fCol1,
     persons = fCol4.fCol4;

  persons.forEach(function(person) {
    var result = dates.filter(function(date) {
      let objs = date.row == person.row;
      delete date.col;
      return objs
    });
    
    person.person = (result[0] !== undefined) ? result[0].person : null;
  });



  function sortDates(a, b) {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();

    return dateA - dateB;
  }

  let sorted = persons.sort(sortDates);

  let willMadeNextCoffee = sorted[1];
  let whoMadeThatCoffee = sorted[sorted.length-1];

  return (
    
    <div>
      {persons.map((whomade) => {
        
        if (whomade === whoMadeThatCoffee) {
          return <h1 style={{color: 'green'}} key={whomade.person}>Quem fez: {whomade.person}</h1>
        }

        if (whomade === willMadeNextCoffee) {
          return <h1 style={{color: 'red'}} key={whomade.person}>Quem vai fazer: {whomade.person}</h1>
        }
      
      })}
    </div>
  );
  
}

export default Made