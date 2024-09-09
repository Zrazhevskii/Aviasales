// import React from 'react'
import './TicketSegment.css';
import { TicketsSegments } from '../../interfase/tucketsInterface';
import formateDate from '../../utils/formateDate';

export default function TicketSegment({ origin, destination, date, stops, duration }: TicketsSegments) {
    const min = duration % 60;
    const hourDuration = Math.floor(duration / 60);
    const transplants = stops.length > 1 ? ' пересадки' : ' пересадка';

    return (
        <div className="segment__item">
            <div className="segment__item__info">
                <span className="segment__item__info__title">
                    {origin} - {destination}
                </span>
                <span className="segment__item__date">{formateDate(date, duration)}</span>
            </div>
            <div className="segment__item__info">
                <span className="segment__item__info__title">В пути</span>
                <span className="segment__item__date">
                    {hourDuration} ч {min} мин
                </span>
            </div>
            <div className="segment__item__info">
                <span className="segment__item__info__title">
                    {stops.length}
                    {transplants}
                </span>
                <span className="segment__item__date">{stops.join(', ')}</span>
            </div>
        </div>
    );
}