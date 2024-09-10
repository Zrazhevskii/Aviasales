import { v4 as uuidv4 } from 'uuid';
import TicketSegment from '../TicketSegment/index';
import { TicketItem } from '../../interfase/tucketsInterface';
import './Ticket.css';

export default function Ticket({ price, carrier, segments }: TicketItem) {
    return (
        <section className="ticket__box">
            <div className="ticket__box__header">
                <div className="ticket__box__price">{price.toLocaleString()} ₽</div>
                <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="" className="ticket__box__img" />
            </div>
            {segments.map((elem) => (
                <TicketSegment key={uuidv4()} {...elem} />
            ))}
        </section>
    );
}
