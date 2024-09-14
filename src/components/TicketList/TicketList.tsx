import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Spin } from 'antd';
import classes from './TicketList.module.scss';
import Ticket from '../Ticket.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import ticketsFilterSelector from '../../selecrors/ticketsFilterSelector';
import { noResultTickets } from '../../store/TicketsSlice';
import TicketListButton from '../TicketListButton/index';

export default function TicketList(): JSX.Element {
    const dispatch = useAppDispatch();
    const filterTickets = useAppSelector(ticketsFilterSelector);
    const { showMoreTickets, noResult, loading } = useAppSelector((state) => state.aviTickets);
    const { choiceList } = useAppSelector((state) => state.aside);

    useEffect(() => {
        if (choiceList.find((item) => item.status === true) === undefined) {
            dispatch(noResultTickets(true));
        } else {
            dispatch(noResultTickets(false));
        }
    }, [dispatch, choiceList]);

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

    // const isStop = <div className={classes.no__result}>К сожалению, это все результаты. Можете поменять фильтры.</div>;

    return (
        <section className={classes.wrapper__tickets}>
            {filterTickets.slice(0, showMoreTickets).map((item) => (
                <Ticket key={uuidv4()} {...item} />
            ))}
            {loading && <Spin size="large" className={classes.spin__image} />}
            {/* {stop && copyTickets.length !== 0 ? isStop : null} */}
            <TicketListButton />
        </section>
    );
}
