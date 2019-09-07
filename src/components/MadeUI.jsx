import React from 'react';
import Slider from "react-slick";

const MadeUI = ({data, settings}) => {
    // name who made that coffee
    const whoMadeName = data.whoMade.map(whoMade => {
        return whoMade.person
    });

    // all ratings
    const arrayRating = [];

    data.whoMade.map(whoMade => {
        whoMade.rating.forEach((rating, i) => {
            arrayRating[i] = rating.rating;
        });
    });

    // points based in rating
    const
        great = data.rating.great.length,
        everage = data.rating.everage.length,
        bad = data.rating.bad.length;

    let points = 0;

    points += great * 2;
    points += everage;
    points -= bad;

    let stars;

    if (points >= 29) { // great
        stars =
            <div><span className="point">★</span><span className="point bigStar">★</span><span className="point">★</span></div>
    } else if (points >= 19) { // average
        stars = <div><span className="point">★</span><span className="nopoint bigStar">★</span><span className="point">★</span>
        </div>
    } else if (points >= 9) { // bad
        stars =
            <div><span className="nopoint">★</span><span className="nopoint bigStar">★</span><span className="point">★</span>
            </div>
    } else if (points <= 9) { // starless
        stars =
            <div><span className="nopoint">★</span><span className="nopoint">★</span><span className="nopoint">★</span>
            </div>
    }

    // method to ge most recurring value
    const mostRecurring = (array) =>
        array.reduce(
            (a, b, i, arr) =>
                (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null);

    // check what most recurring rated
    if (mostRecurring(arrayRating) === "Ótimo") {
        console.log("deu Ótimo")
    } else if (mostRecurring(arrayRating) === "Mediano") {

    } else if (mostRecurring(arrayRating) === "Ruim") {

    }

    return (
        <div className="made">
            <div className="startText">
                <h5 className="st1">
                    {data.todayIs}
                </h5>
                <h5 className="st2">
                    slide to the left and right of the box
                </h5>
            </div>
            <div className="rating-box">
                <div className="rating has-text-centered">{stars}</div>
            </div>

            <div className="theBox">
                <Slider {...settings}>
                    <div>
                    </div>
                    <div>
                        <h2>{whoMadeName} <br/><strong>Made <br/>That <br/>Coffee.</strong></h2>
                    </div>
                    <div>
                        <h4 className="has-text-centered">Coffee Quality</h4>
                        <ul className="has-text-centered">
                            <li>Great: {great} </li>
                            <li>Everage: {everage} </li>
                            <li>Bad: {bad}</li>
                        </ul>
                        <p className="has-text-centered is-italic" style={{fontSize: "0.7em"}}>by who drank</p>
                    </div>
                </Slider>

                <div className="top"/>
                <div className="bottom"/>
                <div className="left"/>
                <div className="right"/>
            </div>
        </div>
    );
};

export default MadeUI;