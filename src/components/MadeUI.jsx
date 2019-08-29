import React from 'react';

const MadeUI = ({data}) => {
    return (
        <div className="made">
            <h5 className="has-text-centered">{data.todayIs}</h5>

            <div className="theBox">
                {data.whoMade.map((whoMade, index) => {
                    if (whoMade) {
                        return <h2 key={index}>{whoMade.person} <br/><strong>Made <br/>That <br/>Coffee.</strong></h2>
                    } else {
                        return <h2 key={index}>Nobody</h2>
                    }
                })}

                <div className="top"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="right"></div>
            </div>

        </div>
    );
};

export default MadeUI