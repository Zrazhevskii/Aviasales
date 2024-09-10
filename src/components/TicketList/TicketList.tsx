// import React from 'react';
// import { firstBy } from 'thenby';
import { useEffect } from 'react';
import './TicketList.css';
import { v4 as uuidv4 } from 'uuid';
import Ticket from '../Ticket.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addTickets, moreTickets, noResultTickets, sortPriceCopyTicket } from '../../store/TicketsSlice';
import NoResult from '../NoResult/index';
import { TicketItem } from '../../interfase/tucketsInterface';

export default function TicketList(): JSX.Element {
    const dispatch = useAppDispatch();
    const cheapTicket = useAppSelector((state) => state.aside.choiceList[0]);
    // const fastTicket = useAppSelector((state) => state.aside.choiceList[1]);
    const { tickets, copyTickets, showMoreTickets, noResult } = useAppSelector((state) => state.aviTickets);
    const { choiceList } = useAppSelector((state) => state.aside);

    useEffect(() => {
        dispatch(addTickets(tickets));
    }, [dispatch, tickets]);

    useEffect(() => {
        const filterArr: TicketItem[] = [];

        if (choiceList.find((item) => item.status === true) === undefined) {
            dispatch(noResultTickets(true));
        } else {
            dispatch(noResultTickets(false));
        }
        const filters = choiceList.filter((elem) => elem.status).map((i) => i.id);

        filters.forEach((filId) => {
            switch (filId) {
                case 11:
                    break;
                case 10:
                    filterArr.push(
                        ...tickets.filter(
                            (elem) => elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 0,
                        ),
                    );
                    break;
                case 1:
                    filterArr.push(...tickets.filter((elem) => elem.segments[0].stops.length === 1));
                    break;
                case 2:
                    filterArr.push(...tickets.filter((elem) => elem.segments[0].stops.length === 2));
                    break;
                case 3:
                    filterArr.push(...tickets.filter((elem) => elem.segments[0].stops.length === 3));
                    break;
                default:
                    break;
            }
        });
        if (cheapTicket.status) {
            sortPriceCopyTicket(filterArr);
        }
    }, [choiceList, dispatch, tickets, cheapTicket.status]);

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
