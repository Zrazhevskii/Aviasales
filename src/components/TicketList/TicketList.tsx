// import React from 'react';
import './TicketList.css';
import Ticket from '../Ticket.tsx';
// import { useAppSelector } from '../../hooks/hooks';

export default function TicketList() {
    // const ticketsArr = useAppSelector((state) => state.aviTickets.tickets);
    // console.log(ticketsArr);
    // const { price, carrier, segments } = ticketsArr;
    return (
        <div className="wrapper__tickets">
            <Ticket />
        </div>
    );
}
