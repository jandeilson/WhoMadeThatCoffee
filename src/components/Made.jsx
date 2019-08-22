import React from 'react';

const Made = ({ whomade }) => {
    console.log(whomade)


  return (
    <div>

      {whomade.map((whomade) => {

        
        
        //if(whomade.gs$cell.col === "1" || whomade.gs$cell.col === "4" ){
        //  
         // let whenmade = whomade.gs$cell.$t;

        //  let test = whenmade.sort((a, b) => new Date(a.whenmade.split('-').reverse()) - new Date(b.whenmade.split('-').reverse()));

        //  console.log(test)
        let whowhenmade = whomade.gs$cell;
        //console.log(whowhenmade)

        let obj = whomade.gs$cell;
        let col = whomade.gs$cell.col;
        let row = whomade.gs$cell.row;

        
        if(col === "1" || col === "4"){

          if (row === "2" || row === "3" || row === "4") {

            

            
            
            console.log(obj.col["1"])
           }


        }
       

       
            

        

       

        
       
      

        

        //let test = arr1.concat(arr2);
        
        

        

        

          if (whomade.gs$cell.$t) {
            return <h1 key={whomade.gs$cell.$t}>{whomade.gs$cell.$t}</h1>
          }
          
        //}
      })}
    </div>
  );
  
}

export default Made