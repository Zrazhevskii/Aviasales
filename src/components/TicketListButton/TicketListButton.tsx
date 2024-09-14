import classes from './TicketListButton.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { moreTickets } from '../../store/TicketsSlice';

export default function TicketListButton() {
    const dispatch = useAppDispatch();
    const { stop, loading } = useAppSelector((state) => state.aviTickets);
    // const { copyTickets, stop, loading } = useAppSelector((state) => state.aviTickets);

    const className: boolean = stop || loading;
    // const className: boolean = stop || loading || !copyTickets.length;
    return (
        <button
            type="button"
            hidden={className}
            className={classes.wrapper__tickets__btn__more__tickets}
            onClick={() => dispatch(moreTickets())}
        >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
    );
}
