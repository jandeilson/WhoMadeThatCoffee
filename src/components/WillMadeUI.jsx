import React from 'react';

const WillMadeUI = ({data}) => {
    return (
        <div className="willmade has-text-centered">
            {data.willMade.map((willMade, index) => {
                if (willMade) {
                    return (
                        <div key={index}>
                            <h3>Who <strong>Will Made</strong>?</h3>
                            <h2>{willMade.person}</h2>
                        </div>
                    )
                }
            })}
            <div className="separator-line-bottom"></div>
            {data.whoMade.map((made, index) => {
                if (made) {
                    return <p key={index}>"{made.word}" <br /><span style={{fontSize: "0.7em"}}>– Message from who made</span></p>
                }
            })}
        </div>
    );
};

export default WillMadeUI