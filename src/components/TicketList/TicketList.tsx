import { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import classes from './TicketList.module.scss';
import Ticket from '../Ticket.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import ticketsFilterSelector from '../../selecrors/ticketsFilterSelector';
import { noResultTickets } from '../../store/TicketsSlice';
import TicketListButton from '../TicketListButton/index';
import formateDate from '../../utils/formateDate';

export default function TicketList(): JSX.Element {
    const dispatch = useAppDispatch();
    const filterTickets = useAppSelector(ticketsFilterSelector);
    const { noResult, loading, error } = useAppSelector((state) => state.aviTickets);
    const { choiceList } = useAppSelector((state) => state.aside);

    const [showMore, setShowMore] = useState(5);
    const changeShowMore = () => {
        setShowMore((prev) => prev + 5);
    };

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

    return (
        <section className={classes.wrapper__tickets}>
            {filterTickets.slice(0, showMore).map((item) => {
                return (
                    <Ticket
                        key={formateDate(item.segments[1].date, item.segments[1].duration).split(' ').join('')}
                        {...item}
                    />
                );
            })}
            {loading && <Spin size="large" className={classes.spin__image} />}
            {(filterTickets.length > showMore || !error) && <TicketListButton changeShowMore={changeShowMore} />}
        </section>
    );
}
