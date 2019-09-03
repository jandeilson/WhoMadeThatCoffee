import React from 'react';
import Slider from "react-slick";

const MadeUI = ({data, settings}) => {
    return (
        <div className="made">
            <h5 className="has-text-centered">{data.todayIs}</h5>

            <div className="theBox">
                <Slider {...settings}>
                    <div>
                        {data.whoMade.map((whoMade, index) => {
                            return <h2 key={index}>{whoMade.person} <br/><strong>Made <br/>That <br/>Coffee.</strong></h2>
                        })}
                    </div>
                    <div>
                        do good coffee
                    </div>
                </Slider>

                <div className="top"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="right"></div>
            </div>

        </div>
    );
};

export default MadeUI