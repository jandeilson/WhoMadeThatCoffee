import React from 'react';


const Made = ({ data }) => {

  const persons = data;
      
  function sortDates(a, b) {
    
      let 
      dA = new Date(a.date).getTime(),
      dB = new Date(b.date).getTime();
      
      return dA - dB;
  }

  let sorted = persons.sort(sortDates);

  let whoMadeThatCoffee = sorted[sorted.length-1];

  return (
    
    <div>
      {data.map((whomade) => {
        
        if (whomade === whoMadeThatCoffee) {
          return <h1 style={{color: 'green'}} key={whomade.person}>Quem fez: {whomade.person}</h1>
        }
      
      })}
    </div>
  
  );
}


export default Made