import React from 'react';

const MadeUI = ({data}) => {
    return (
        <div className="made">
            <h5>{data.todayIs}</h5>
            {data.whoMade.map((whoMade, index) => {
                if (whoMade) {
                    return <h2 key={index}>{whoMade.person} <br/><strong>Made That Coffee</strong></h2>
                } else {
                    return <h2 key={index}>Nobody</h2>
                }
            })}
        </div>
    );
};

export default MadeUI