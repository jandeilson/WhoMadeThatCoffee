import React from 'react';

const WillMadeUI = ({data, t}) => {
    return (
        <div className="willmade has-text-centered">
            {data.willMade.map((willMade, index) => {
                if (willMade) {
                    return (
                        <div key={index}>
                            <h3>{t('who')} <strong>{t('willMade')}</strong>?</h3>
                            <h2>{willMade.person}</h2>
                        </div>
                    )
                }
            })}
            <div className="separator-line-bottom"></div>
            {data.whoMade.map((made, index) => {
                if (made) {
                    return <p key={index}>"{made.word}" <br /><span style={{fontSize: "0.7em"}}>– {t('fromWhoMade')}</span></p>
                }
            })}
        </div>
    );
};

export default WillMadeUI