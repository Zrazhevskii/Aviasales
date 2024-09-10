// import React from 'react';
// import { firstBy } from 'thenby';
import { useEffect } from 'react';
import './TicketList.css';
import { v4 as uuidv4 } from 'uuid';
import Ticket from '../Ticket.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addTickets, moreTickets, noResultTickets } from '../../store/TicketsSlice';
import NoResult from '../NoResult/index';

export default function TicketList(): JSX.Element {
    const dispatch = useAppDispatch();
    const { tickets, copyTickets, showMoreTickets, noResult } = useAppSelector((state) => state.aviTickets);
    const { choiceList } = useAppSelector((state) => state.aside);
    // const [filterTickets, setFilterTickets] = useState(tickets);

    useEffect(() => {
        dispatch(addTickets(tickets));
    }, [dispatch, tickets]);

    useEffect(() => {
        if (choiceList.find((item) => item.status === true) === undefined) {
            dispatch(noResultTickets(true));
        } else {
            dispatch(noResultTickets(false));
        }
    }, [choiceList, dispatch]);

    if (noResult) {
        return <NoResult />;
    }

    return (
        <section className="wrapper__tickets">
            {copyTickets.slice(0, showMoreTickets).map((item) => (
                <Ticket key={uuidv4()} {...item} />
            ))}
            <button
                type="button"
                className="wrapper__tickets__btn__more__tickets"
                onClick={() => dispatch(moreTickets())}
            >
                ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
            </button>
        </section>
    );
}
