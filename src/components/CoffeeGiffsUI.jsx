import React from 'react';

const CoffeeGifsUI = ({data, change, onLoad}) => {

    return (
        <div className="coffeeGifs has-text-centered">
            <div className="sk-cube-grid"  style={data.loading ? {display: 'none'} : {display: 'block'}}>
                <div className="sk-cube sk-cube1"/>
                <div className="sk-cube sk-cube2"/>
                <div className="sk-cube sk-cube3"/>
                <div className="sk-cube sk-cube4"/>
                <div className="sk-cube sk-cube5"/>
                <div className="sk-cube sk-cube6"/>
                <div className="sk-cube sk-cube7"/>
                <div className="sk-cube sk-cube8"/>
                <div className="sk-cube sk-cube9"/>
            </div>
            <img className="giphyImage" style={data.loading ? {} : {visibility: 'hidden'}} src={data.giphyImage} title={data.giphyTitle} alt={data.giphyTitle} onLoad={onLoad}/>
            <button className="byGiphy" onClick={change}></button>
        </div>
    );
};

export default CoffeeGifsUI