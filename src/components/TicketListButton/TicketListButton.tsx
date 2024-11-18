import classes from './TicketListButton.module.scss';
import { useAppSelector } from '../../hooks/hooks';

interface FuncProps {
    changeShowMore: () => void;
}

export default function TicketListButton({ changeShowMore }: FuncProps) {
    const { loading } = useAppSelector((state) => state.aviTickets);

    return (
        <button
            type="button"
            hidden={loading}
            className={classes.wrapper__tickets__btn__more__tickets}
            onClick={changeShowMore}
        >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!!!
        </button>
    );
}
