import React from 'react';

const CoffeeGifsUI = ({data, change, onLoad}) => {

    return (
        <div className="coffeeGifs has-text-centered">
            <div className="gifLoading" style={data.loading ? {display: 'none'} : {display: 'block'}}/>
            <img className="giphyImage" style={data.loading ? {} : {visibility: 'hidden'}} src={data.giphyImage} title={data.giphyTitle} alt={data.giphyTitle} onLoad={onLoad}/>
            <button className="byGiphy" onClick={change}></button>
        </div>
    );
};

export default CoffeeGifsUI