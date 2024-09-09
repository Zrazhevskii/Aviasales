// import React from 'react';
import './TicketList.css';
import { v4 as uuidv4 } from 'uuid';
import Ticket from '../Ticket.tsx';
import { useAppSelector } from '../../hooks/hooks';

export default function TicketList(): JSX.Element {
    const ticketsArr = useAppSelector((state) => state.aviTickets.tickets);
    // console.log(ticketsArr);
    // const { price, carrier, segments } = ticketsArr;
    return (
        <div className="wrapper__tickets">
            {ticketsArr.map((item) => (
                <Ticket key={uuidv4()} {...item} />
            ))}
        </div>
    );
}
