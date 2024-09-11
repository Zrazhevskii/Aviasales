// import React from 'react';
// import { firstBy } from 'thenby';
import { useEffect } from 'react';
import './TicketList.css';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Spin } from 'antd';
import Ticket from '../Ticket.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addCopyTickets, addTickets, moreTickets, noResultTickets } from '../../store/TicketsSlice';
import { TicketItem, TicketsSegments } from '../../interfase/tucketsInterface';

export default function TicketList(): JSX.Element {
    const dispatch = useAppDispatch();
    const cheapTicket = useAppSelector((state) => state.header.choiceHeader[0]);
    const fastTicket = useAppSelector((state) => state.header.choiceHeader[1]);
    const { tickets, copyTickets, showMoreTickets, noResult, error, loading } = useAppSelector(
        (state) => state.aviTickets,
    );
    const { choiceList } = useAppSelector((state) => state.aside);

    useEffect(() => {
        dispatch(addTickets(tickets));
    }, [dispatch, tickets]);

    function sumFastTicket(item: TicketsSegments[]) {
        let sum = 0;
        item.forEach((elem) => {
            sum += elem.duration;
        });
        return sum;
    }

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
            const sortPrice = filterArr.sort((a, b) => (a.price > b.price ? 1 : -1));
            dispatch(addCopyTickets(sortPrice));
        } else if (fastTicket.status) {
            const sortFast = filterArr.sort((a, b) => (sumFastTicket(a.segments) > sumFastTicket(b.segments) ? 1 : -1));
            dispatch(addCopyTickets(sortFast));
        }
    }, [choiceList, dispatch, tickets, cheapTicket.status, fastTicket.status]);

    if (noResult) {
        return (
            <Alert
                message="Informational Notes"
                description="Результатов нет, фильтры не выбраны"
                type="info"
                showIcon
            />
        );
    }

    if (error) {
        return <Alert message="Error" description="Что-то пошло не так, перегрузите страницу" type="error" showIcon />;
    }

    if (loading) {
        return <Spin size="large" className="spin__image" />;
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
