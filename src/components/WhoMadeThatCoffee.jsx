import React, {Component} from 'react';

import MadeUI from "./MadeUI";
import WillMadeUI from "./WillMadeUI";

import { withTranslation } from 'react-i18next';

class WhoMadeThatCoffee extends Component {

    dataMade = () => {
        const persons = this.props.data;
        const t = this.props.t;

        const daysOfWeek = () => {
            const
                date = new Date(),
                day = new Array(7);

            day[0] = t('todayIs.sunday');
            day[1] = t('todayIs.monday');
            day[2] = t('todayIs.tuesday');
            day[3] = t('todayIs.wednesday');
            day[4] = t('todayIs.thursday');
            day[5] = t('todayIs.friday');
            day[6] = t('todayIs.saturday');

            return day[date.getDay()];
        };

        const todayIs = daysOfWeek();

        const sortDates = (a, b) => {
            let dA = new Date(a.date).getTime(),
                dB = new Date(b.date).getTime();

            return dA - dB;
        };

        const sorted = persons.sort(sortDates);

        const
            whoMade = new Array(sorted[sorted.length - 1]),
            willMade = new Array(sorted[0]);

        // rating filters
        const ratingFiltered = whoMade.map(whoMade => {
            const great = whoMade.rating.filter(rating => {
                if (rating.rating === "Ótimo") // gsheet rating name >
                    return rating.rating
            });
            const everage = whoMade.rating.filter(rating => {
                if (rating.rating === "Mediano") // ... >
                    return rating.rating
            });
            const bad = whoMade.rating.filter(rating => {
                if (rating.rating === "Ruim") // .
                    return rating.rating
            });

            return {great, everage, bad};
        });

        const rating = ratingFiltered[0];

        const data = {todayIs, whoMade, willMade, rating};

        return {data}
    };

    render() {
        const {data} = this.dataMade();
        const {t} = this.props;

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            arrows: false
        };

        return (
            <div className="whomadethatcoffee">
                <MadeUI data={data} settings={settings} t={t}/>
                <WillMadeUI data={data} t={t}/>
            </div>
        );

    }

}

export default withTranslation('translation')(WhoMadeThatCoffee)
