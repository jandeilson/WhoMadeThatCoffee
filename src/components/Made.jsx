import React from 'react';


const Made = ({ data }) => {

  const persons = data;

  const daysOfWeek = () => {

    let
    date = new Date(),
    day = new Array(7);

    day[0] = "Sunday";
    day[1] = "Monday";
    day[2] = "Tuesday";
    day[3] = "Wednesday";
    day[4] = "Thursday";
    day[5] = "Friday";
    day[6] = "Saturday";

    let daysOfWeek = day[date.getDay()];

    return [daysOfWeek];
  }

  let todayIs = daysOfWeek();
      
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
      <h3>{todayIs[0]}</h3>
      {data.map((whoMade, index) => {
        if (whoMade === whoMadeThatCoffee) {
          return (
          <div key={index} className="whomade">
            <h2>{whoMade.person} <br></br>Made That Coffe</h2>
          </div>
          )
        }
      
      })}
    </div>
  
  );
}


export default Made