// import React from 'react';
import './TicketList.css';
import { v4 as uuidv4 } from 'uuid';
import Ticket from '../Ticket.tsx';
import { useAppSelector } from '../../hooks/hooks';

export default function TicketList(): JSX.Element {
    const { tickets, showMoreTickets } = useAppSelector((state) => state.aviTickets);
    return (
        <section className="wrapper__tickets">
            {tickets.slice(0, showMoreTickets).map((item) => (
                <Ticket key={uuidv4()} {...item} />
            ))}
            <button type="button" className="wrapper__tickets__btn__more__tickets">
                ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
            </button>
        </section>
    );
}
