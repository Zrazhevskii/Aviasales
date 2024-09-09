// import React from 'react'
import './TicketSegment.css';
import { TicketsSegments } from '../../interfase/tucketsInterface';

export default function TicketSegment({ origin, destination, date, stops, duration }: TicketsSegments) {
    return (
        <div className="segment__item">
            <div className="segment__item__info">
                <span className="segment__item__info__title">
                    {origin} - {destination}
                </span>
                <span className="segment__item__date">{date}</span>
            </div>
            <div className="segment__item__info">
                <span className="segment__item__info__title">В пути</span>
                <span className="segment__item__date">{duration}</span>
            </div>
            <div className="segment__item__info">
                <span className="segment__item__info__title">Кол-во пересадок</span>
                <span className="segment__item__date">
                    {stops}
                    {/* {stops.map((item) => {
                        return item;
                    })} */}
                </span>
            </div>
        </div>
    );
}
