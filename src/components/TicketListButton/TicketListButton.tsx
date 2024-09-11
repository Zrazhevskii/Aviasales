// import React from 'react'
import './TicketListButton.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { moreTickets } from '../../store/TicketsSlice';

export default function TicketListButton() {
    const dispatch = useAppDispatch();
    const { copyTickets, showMoreTickets } = useAppSelector((state) => state.aviTickets);

    const nameClass = showMoreTickets >= copyTickets.length;
    // console.log(showMoreTickets);
    // console.log(copyTickets.length);
    // console.log(nameClass);

    return (
        <button
            type="button"
            hidden={nameClass}
            className="wrapper__tickets__btn__more__tickets"
            onClick={() => dispatch(moreTickets())}
        >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
    );
}
