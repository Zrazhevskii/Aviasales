// import React from 'react'
import './TicketListButton.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { moreTickets } from '../../store/TicketsSlice';
import { getTickets } from '../../servises/TicketsApi';

export default function TicketListButton() {
    const dispatch = useAppDispatch();
    const { copyTickets, showMoreTickets, stop, loading } = useAppSelector((state) => state.aviTickets);

    useEffect(() => {
        if (showMoreTickets === copyTickets.length) {
            dispatch(getTickets());
        }
    }, [dispatch, showMoreTickets, copyTickets]);

    const className: boolean = stop || loading || !copyTickets.length || copyTickets.length === showMoreTickets;
    // console.log(showMoreTickets);
    // console.log(copyTickets.length);
    return (
        <button
            type="button"
            hidden={className}
            className="wrapper__tickets__btn__more__tickets"
            onClick={() => dispatch(moreTickets())}
        >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
    );
}
