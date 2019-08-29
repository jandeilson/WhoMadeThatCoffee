import React from 'react';

const WillMadeUI = ({data}) => {
    return (
        <div className="willmade has-text-centered">
            {data.map((willMade, index) => {
                if (willMade) {
                    return (
                        <div key={index}>
                            <h3>Who <strong>Will Made</strong>?</h3>
                            <h2>{willMade.person}</h2>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default WillMadeUI