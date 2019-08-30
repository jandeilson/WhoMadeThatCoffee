import React from 'react';

const CoffeeGifsUI = ({data, change}) => {
    return (
        <div className="coffeeGifs has-text-centered">
            <img className="giphyImage" src={data.giphyImage} title={data.giphyTitle} alt={data.giphyTitle}/>
            <button onClick={change}> + fun?</button>
            <div className="byGiphy"></div>
        </div>
    );
};

export default CoffeeGifsUI