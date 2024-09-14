import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
// import { headerItem } from '../interfase/headerinterface';
import { TicketItem } from '../interfase/tucketsInterface';

const selectTickets = (state: RootState) => state.aviTickets.tickets;
const selectHeader = (state: RootState) => state.header.choiceHeader;
const selectAside = (state: RootState) => state.aside.choiceList;

const ticketsFilterSelector = createSelector(
    [selectTickets, selectHeader, selectAside],
    (allTickets, allHeader, allChoiceList) => {
        const asideFilterArr: TicketItem[] = [];
        const filters: number[] = allChoiceList.filter((elem) => elem.status).map((i) => i.id);

        filters.forEach((filId) => {
            switch (filId) {
                case 11:
                    break;
                case 10:
                    asideFilterArr.push(
                        ...allTickets.filter((elem) => elem.segments.find((el) => el.stops.length === 0)),
                    );
                    break;
                case 1:
                    asideFilterArr.push(
                        ...allTickets.filter((elem) => elem.segments.find((el) => el.stops.length === 1)),
                    );
                    break;
                case 2:
                    asideFilterArr.push(
                        ...allTickets.filter((elem) => elem.segments.find((el) => el.stops.length === 2)),
                    );
                    break;
                case 3:
                    asideFilterArr.push(
                        ...allTickets.filter((elem) => elem.segments.find((el) => el.stops.length === 3)),
                    );
                    break;
                default:
                    break;
            }
        });

        const activeHeaderStatus = allHeader.find((el) => el.status)?.id;
        let newFiltersArr: TicketItem[] = [];

        switch (activeHeaderStatus) {
            case 1:
                newFiltersArr = asideFilterArr.sort((a, b) => (a.price > b.price ? 1 : -1));
                break;
            case 2:
                newFiltersArr = asideFilterArr.sort((a, b) => {
                    const sortedA = a.segments.reduce((acc, i) => acc + i.duration, 0);
                    const sortedB = b.segments.reduce((acc, i) => acc + i.duration, 0);
                    return sortedA > sortedB ? 1 : -1;
                });
                break;
            case 3:
                newFiltersArr = asideFilterArr.sort((a, b) => {
                    const optimalA = a.segments.reduce((acc, i) => acc + i.duration, 0) + a.price;
                    const optimalB = b.segments.reduce((acc, i) => acc + i.duration, 0) + b.price;
                    return optimalA > optimalB ? 1 : -1;
                });
                break;
            default:
                break;
        }
        return newFiltersArr;
    },
);

export default ticketsFilterSelector;
