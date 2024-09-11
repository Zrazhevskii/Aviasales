import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Spin } from 'antd';
import classes from './TicketList.module.scss';
import Ticket from '../Ticket.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addCopyTickets, noResultTickets } from '../../store/TicketsSlice';
import { TicketItem } from '../../interfase/tucketsInterface';
import TicketListButton from '../TicketListButton/index';

export default function TicketList(): JSX.Element {
    const dispatch = useAppDispatch();
    const cheapTicket = useAppSelector((state) => state.header.choiceHeader[0]);
    const fastTicket = useAppSelector((state) => state.header.choiceHeader[1]);
    const optimalTicket = useAppSelector((state) => state.header.choiceHeader[2]);
    const { tickets, copyTickets, showMoreTickets, noResult, loading, stop } = useAppSelector(
        (state) => state.aviTickets,
    );
    const { choiceList } = useAppSelector((state) => state.aside);

    useEffect(() => {
        dispatch(addCopyTickets(tickets));
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
            const sortPrice = filterArr.sort((a, b) => (a.price > b.price ? 1 : -1));
            dispatch(addCopyTickets(sortPrice));
        } else if (fastTicket.status) {
            const sortFast = filterArr.sort((a, b) => {
                const sortedA = a.segments.reduce((acc, i) => acc + i.duration, 0);
                const sortedB = b.segments.reduce((acc, i) => acc + i.duration, 0);
                return sortedA > sortedB ? 1 : -1;
            });

            dispatch(addCopyTickets(sortFast));
        } else if (optimalTicket.status) {
            const sortOptimal = filterArr.sort((a, b) => {
                const optimalA = a.segments.reduce((acc, i) => acc + i.duration, 0) + a.price;
                const optimalB = b.segments.reduce((acc, i) => acc + i.duration, 0) + b.price;
                return optimalA > optimalB ? 1 : -1;
            });
            dispatch(addCopyTickets(sortOptimal));
        }
    }, [choiceList, dispatch, tickets, cheapTicket.status, fastTicket.status, optimalTicket.status]);

    if (noResult) {
        return (
            <Alert
                message="Informational Notes"
                description="Рейсов, подходящих под заданные фильтры, не найдено"
                type="info"
                showIcon
            />
        );
    }

    const isStop = <div>К сожалению, это все результаты. Можете поменять фильтры.</div>;

    return (
        <section className={classes.wrapper__tickets}>
            {copyTickets.slice(0, showMoreTickets).map((item) => (
                <Ticket key={uuidv4()} {...item} />
            ))}
            {loading && <Spin size="large" className={classes.spin__image} />}
            {stop && isStop}
            <TicketListButton />
        </section>
    );
}
