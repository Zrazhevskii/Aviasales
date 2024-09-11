import { v4 as uuidv4 } from 'uuid';
import TicketSegment from '../TicketSegment/index';
import { TicketItem } from '../../interfase/tucketsInterface';
import classes from './Ticket.module.scss';

export default function Ticket({ price, carrier, segments }: TicketItem): JSX.Element {
    return (
        <section className={classes.ticket__box}>
            <div className={classes.ticket__box__header}>
                <div className={classes.ticket__box__price}>{price.toLocaleString()} ₽</div>
                <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="" className={classes.ticket__box__img} />
            </div>
            {segments.map((elem) => (
                <TicketSegment key={uuidv4()} {...elem} />
            ))}
        </section>
    );
}
